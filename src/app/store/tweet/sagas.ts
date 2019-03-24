import qs from 'query-string';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import config from '@/config';
import { firebaseAuthError } from '../firebase/actions';
import { customFetch } from '../utils';
import { requestError, requestSuccess } from './actions';
import { ISearchQuery, TweetActionTypes } from './types';

function* handleFetch(q: any) {
  if (!q.payload || '' === q.payload.term.trim()) {
    yield put(requestError('wrong parameters'));
  }

  const { term, start, end, count } = q.payload;
  const startDate = start.format('YYYY-MM-DD');
  const endDate = end.format('YYYY-MM-DD');

  try {
    const query: ISearchQuery = {
      count,
      term: `linkedin ${term} since:${startDate} until:${endDate}`,
    };

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
  yield takeEvery(TweetActionTypes.REQUEST_SEND, handleFetch);
}

function* tweetSaga() {
  yield all([fork(watchFetchRequest)]);
}

export default tweetSaga;
