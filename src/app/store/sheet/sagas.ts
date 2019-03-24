import qs from 'query-string';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { firebaseAuthError } from '../firebase/actions';
import { customFetch } from '../utils';
import { saveError, saveSuccess } from './actions';
import { ISheetQuery, SheetActionTypes } from './types';

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
  yield takeEvery(SheetActionTypes.SAVE_SEND, handleSave);
}

function* searchSaga() {
  yield all([fork(watchSaveRequest)]);
}

export default searchSaga;
