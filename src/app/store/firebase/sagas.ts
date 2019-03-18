import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import Persistable from '@/data/Persistable';
import {
  firebaseAuthError,
  firebaseAuthorize,
  firebaseAuthSuccess,
} from './actions';
import { FirebaseActionTypes, IAuthData, IAuthResult } from './types';

const authKey = 'VC_AUTH';

function* authorize({ payload }: any) {
  if (!payload) return;
  try {
    const res = yield call(fetch, `${config.API_AUTH_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${payload.idToken}`,
      },
    });
    const authorization = yield call([res, 'json']);

    if (res.error) {
      yield put(firebaseAuthError(authorization.error));
    } else if (!authorization.authorized) {
      yield put(firebaseAuthError(new Error(authorization.message)));
    } else {
      yield put(firebaseAuthSuccess(payload));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(firebaseAuthError(err));
    } else {
      yield put(firebaseAuthError(new Error('An unknown error occured.')));
    }
  }
}

function* getIdToken({ payload }: any) {
  if (!payload) return;
  try {
    const idToken = yield payload.user.getIdToken();

    if (!idToken || !idToken.length) {
      yield put(firebaseAuthError(new Error("Can't Get current user IdToken")));
    } else {
      const {
        additionalUserInfo: {
          profile: { given_name },
        },
      }: IAuthResult = payload;

      const data: IAuthData = {
        idToken,
        name: given_name,
      };
      yield put(firebaseAuthorize(data));

      const persister = new Persistable(authKey);
      persister.value = data;
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(firebaseAuthError(err));
    } else {
      yield put(firebaseAuthError(new Error('An unknown error occured.')));
    }
  }
}

function* authCheck() {
  try {
    const persister = new Persistable(authKey);
    const { idToken, name } = persister.value;

    if (!idToken || !name) {
      yield put(firebaseAuthError(new Error('An unknown error occured.')));
      return;
    }
    yield put(firebaseAuthorize({ idToken, name }));
  } catch (err) {
    if (err instanceof Error) {
      yield put(firebaseAuthError(err));
    } else {
      yield put(firebaseAuthError(new Error('An unknown error occured.')));
    }
  }
}

function* watchAuthCheck() {
  yield takeEvery(FirebaseActionTypes.AUTH_CHECK, authCheck);
}

function* watchGetIdToken() {
  yield takeEvery(FirebaseActionTypes.AUTH_GET_IDTOKEN, getIdToken);
}

function* watchAuthorize() {
  yield takeEvery(FirebaseActionTypes.AUTH_AUTHORIZE, authorize);
}

function* firebaseSaga() {
  yield all([
    fork(watchAuthCheck),
    fork(watchGetIdToken),
    fork(watchAuthorize),
  ]);
}

export default firebaseSaga;
