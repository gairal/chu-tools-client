import qs from 'query-string';
import { all, call, fork, put, select, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { IQuery } from '@/store/commands/types';
import { firebaseAuthError } from '../firebase/actions';
import { requestError, requestSuccess } from './actions';
import { ChatActionTypes } from './types';

function* handleFetch(q: any) {
  try {
    if (!q.payload || '' === q.payload.trim()) return;

    const query: IQuery = { q: q.payload };

    const idToken = yield select(({ firebase }) => firebase.idToken);

    const res = yield call(
      fetch,
      `${config.API_BOT_ENDPOINT}?${qs.stringify(query)}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    const json = yield call([res, 'json']);

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
  yield takeEvery(ChatActionTypes.REQUEST_SEND, handleFetch);
}

function* chatSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default chatSaga;
