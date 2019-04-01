import firebase from 'firebase/app';
import qs from 'query-string';
import { all, fork, put, select, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { fetchReddits } from '@/store/reddit/fetch';
import { fetchTweets } from '@/store/tweet/fetch';
import { firebaseAuthError } from '../firebase/actions';
import { PostType } from '../types';
import { customFetch } from '../utils';
import {
  loadPostsError,
  loadPostsSuccess,
  requestSavedError,
  requestSavedSuccess,
  requestTranslateError,
  requestTranslateSuccess,
} from './actions';
import {
  IPostResult,
  ISearchParams,
  ITranslateQuery,
  PostActionTypes,
} from './types';

function* fetchPosts(params: ISearchParams) {
  const { type }: ISearchParams = params;
  let json: IPostResult;
  switch (type) {
    case PostType.Twitter:
      json = yield fetchTweets(params);
      break;
    case PostType.Reddit:
      json = yield fetchReddits(params);
      break;
    default:
      break;
  }

  if (json.error) {
    if (json.isAuthError) {
      yield put(firebaseAuthError(json.error));
    } else {
      yield put(loadPostsError(json.error.stack));
    }
  } else {
    return json.posts;
  }
}

function* handleFetch(q: any) {
  const json = yield fetchPosts(q.payload);
  yield put(loadPostsSuccess(q.payload, json));
}

function* watchFetchRequest() {
  yield takeEvery(PostActionTypes.REQUEST_SEND, handleFetch);
}

function* handleMore() {
  const currentSearch = yield select(state => state.post.currentSearch);

  const json = yield fetchPosts(currentSearch);
  yield put(loadPostsSuccess(currentSearch, json));
}

function* watchMoreRequest() {
  yield takeEvery(PostActionTypes.REQUEST_MORE, handleMore);
}

function* trash(q: any) {
  const { id, hidden } = q.payload;

  try {
    const json = yield customFetch(
      `${config.API_TRASH_ENDPOINT}?${qs.stringify({ id, untrash: !hidden })}`,
      {
        method: 'POST',
      },
    );

    if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    }

    return json;
  } catch (e) {
    // nothing to do here
  }
}

function* watchTrash() {
  yield takeEvery(PostActionTypes.POST_SET_VISIBILITY, trash);
}

function* handleGetSaved() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield db.collection('savedTweets').get();

    const saveds: string[] = [];
    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      saveds.push(doc.id);
    });

    yield put(requestSavedSuccess(saveds));
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestSavedError(err.stack!));
    } else {
      yield put(requestSavedError('An unknown error occured.'));
    }
  }
}

function* watchGetSaved() {
  yield takeEvery(PostActionTypes.SAVED_GET, handleGetSaved);
}

function* handleTranslate(data: any) {
  if (!data.payload) {
    yield put(loadPostsError('wrong parameters'));
  }

  const { q, source, id } = data.payload;

  if (
    !id ||
    !q ||
    '' === q.trim() ||
    !source ||
    ['en', 'und'].includes(source)
  ) {
    yield put(loadPostsError('wrong parameters'));
  }

  try {
    const query: ITranslateQuery = {
      q,
      source,
    };

    const json = yield customFetch(
      `${config.API_TRANSLATE_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (json.error) {
      yield put(requestTranslateError(json.error));
    } else if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    } else {
      yield put(requestTranslateSuccess(id, json));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestTranslateError(err.stack!));
    } else {
      yield put(requestTranslateError('An unknown error occured.'));
    }
  }
}

function* watchTranslate() {
  yield takeEvery(PostActionTypes.TRANSLATE_GET, handleTranslate);
}

function* postSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchMoreRequest),
    fork(watchGetSaved),
    fork(watchTranslate),
    fork(watchTrash),
  ]);
}

export default postSaga;
