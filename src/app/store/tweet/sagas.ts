import * as firebase from 'firebase/app';
import qs from 'query-string';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

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

function* fethTweets(params: ISearchParams) {
  try {
    const { term, start, end } = params;

    const query: ISearchQuery = {
      count: 100,
      term: `linkedin ${term} since:${start.format(
        'YYYY-MM-DD',
      )} until:${end.format('YYYY-MM-DD')}`,
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
  const { term = '', start, end } = q.payload;

  const json = yield fethTweets({ term, start, end });
  yield put(loadTweetsSuccess({ term, start, end }, json));
}

function* watchFetchRequest() {
  yield takeEvery(TweetActionTypes.REQUEST_SEND, handleFetch);
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
    fork(watchGetSaved),
    fork(watchTranslate),
  ]);
}

export default tweetSaga;
