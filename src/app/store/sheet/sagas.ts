import * as firebase from 'firebase';
import qs from 'query-string';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { firebaseAuthError } from '../firebase/actions';
import { customFetch } from '../utils';
import {
  requestSheetsError,
  requestSheetsSuccess,
  saveError,
  saveSuccess,
} from './actions';
import { ISheet, ISheetQuery, SheetActionTypes } from './types';

function* handleSave(q: any) {
  if (!q.payload) return;

  try {
    const { ids, sheetId } = q.payload;
    const { negative, neutral, positive } = ids;

    const query: ISheetQuery = {
      negative: negative.join(','),
      neutral: neutral.join(','),
      positive: positive.join(','),
      spreadsheetId: sheetId,
    };

    const { res, json } = yield customFetch(
      `${config.API_SAVE_ENDPOINT}?${qs.stringify(query)}`,
    );

    if (res.error) {
      yield put(saveError(json.error));
    } else if (json.status && json.status === 403) {
      yield put(firebaseAuthError(json.message));
    } else {
      yield put(saveSuccess());
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

function* handleGetSheets() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield db.collection('sheets').get();

    const sheets: ISheet[] = [];
    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const sheet: ISheet = doc.data() as ISheet;
      sheets.push(sheet);
    });

    yield put(requestSheetsSuccess(sheets));
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestSheetsError(err.stack!));
    } else {
      yield put(requestSheetsError('An unknown error occured.'));
    }
  }
}

function* watchGetRequest() {
  yield takeEvery(SheetActionTypes.SHEETS_GET, handleGetSheets);
}

function* sheetSaga() {
  yield all([fork(watchSaveRequest), fork(watchGetRequest)]);
}

export default sheetSaga;