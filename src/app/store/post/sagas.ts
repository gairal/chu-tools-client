import firebase from 'firebase/app';
import qs from 'query-string';
import { all, fork, put, select, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { firebaseAuthError } from '../firebase/actions';
import { customFetch } from '../utils';
import {
  loadTweetsError,
  loadTweetsSuccess,
  requestSavedError,
  requestSavedSuccess,
  requestTranslateError,
  requestTranslateSuccess,
} from './actions';
import {
  ISearchParams,
  ISearchQuery,
  ITranslateQuery,
  TweetActionTypes,
} from './types';

function* fetchTweets(params: ISearchParams) {
  try {
    const { term, start, end, max_id } = params;

    const query: ISearchQuery = {
      max_id,
      count: 100,
      term: `linkedin ${term} since:${start} until:${end}`,
    };
    const { res, json } = yield customFetch(
      `${config.API_SEARCH_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (res.error) {
      yield put(loadTweetsError(json.error));
    } else if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    }

    return json;
  } catch (e) {
    if (e instanceof Error) {
      yield put(loadTweetsError(e.stack!));
    } else {
      yield put(loadTweetsError('An unknown error occured.'));
    }
  }
}

function* handleFetch(q: any) {
  const json = yield fetchTweets(q.payload);
  yield put(loadTweetsSuccess(q.payload, json));
}

function* watchFetchRequest() {
  yield takeEvery(TweetActionTypes.REQUEST_SEND, handleFetch);
}

function* handleMore() {
  const currentSearch = yield select(state => state.tweet.currentSearch);

  const json = yield fetchTweets(currentSearch);
  yield put(loadTweetsSuccess(currentSearch, json));
}

function* watchMoreRequest() {
  yield takeEvery(TweetActionTypes.REQUEST_MORE, handleMore);
}

function* trash(q: any) {
  const { id, hidden } = q.payload;

  try {
    const { json } = yield customFetch(
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
  yield takeEvery(TweetActionTypes.TWEET_SET_VISIBILITY, trash);
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
  yield takeEvery(TweetActionTypes.SAVED_GET, handleGetSaved);
}

function* handleTranslate(data: any) {
  if (!data.payload) {
    yield put(loadTweetsError('wrong parameters'));
  }

  const { q, source, id } = data.payload;

  if (
    !id ||
    !q ||
    '' === q.trim() ||
    !source ||
    ['en', 'und'].includes(source)
  ) {
    yield put(loadTweetsError('wrong parameters'));
  }

  try {
    const query: ITranslateQuery = {
      q,
      source,
    };

    const { res, json } = yield customFetch(
      `${config.API_TRANSLATE_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (res.error) {
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
  yield takeEvery(TweetActionTypes.TRANSLATE_GET, handleTranslate);
}

function* tweetSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchMoreRequest),
    fork(watchGetSaved),
    fork(watchTranslate),
    fork(watchTrash),
  ]);
}

export default tweetSaga;
