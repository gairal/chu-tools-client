import qs from 'query-string';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { firebaseAuthError } from '../firebase/actions';
import {
  requestError,
  requestSuccess,
  saveError,
  saveSuccess,
} from './actions';
import { ISearchQuery, ISheetQuery, SearchActionTypes } from './types';

function* customFetch(query: string) {
  const idToken = yield select(({ firebase }) => firebase.idToken);

  const res = yield call(fetch, query, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const json = yield call([res, 'json']);

  return { json, res };
}

function* handleFetch(q: any) {
  if (!q.payload || '' === q.payload.trim()) return;

  try {
    const query: ISearchQuery = { term: `linkedin ${q.payload}`, count: 10 };

    const { res, json } = yield customFetch(
      `${config.API_SEARCH_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (res.error) {
      yield put(requestError(json.error));
    } else if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    } else {
      yield put(requestSuccess(json));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestError(err.stack!));
    } else {
      yield put(requestError('An unknown error occured.'));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(SearchActionTypes.REQUEST_SEND, handleFetch);
}

function* handleSave(q: any) {
  if (!q.payload) return;

  try {
    const { negative, neutral, positive } = q.payload;
    const query: ISheetQuery = {
      negative: negative.join(','),
      neutral: neutral.join(','),
      positive: positive.join(','),
    };

    const { res, json } = yield customFetch(
      `${config.API_SAVE_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (res.error) {
      yield put(saveError(json.error));
    } else if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    } else {
      yield put(saveSuccess(json));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(saveError(err.stack!));
    } else {
      yield put(saveError('An unknown error occured.'));
    }
  }
}

function* watchSaveRequest() {
  yield takeEvery(SearchActionTypes.SAVE_SEND, handleSave);
}

function* searchSaga() {
  yield all([fork(watchFetchRequest), fork(watchSaveRequest)]);
}

export default searchSaga;
