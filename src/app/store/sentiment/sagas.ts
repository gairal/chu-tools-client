import * as firebase from 'firebase';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import { requestSentimentsError, requestSentimentsSuccess } from './actions';
import { ISentiment, SentimentActionTypes } from './types';

function* handleGetSentiments() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield db.collection('sentiments').get();

    const sentiments: ISentiment[] = [];
    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const sentiment: ISentiment = doc.data() as ISentiment;
      sentiments.push({ id: doc.id, ...sentiment });
    });

    yield put(requestSentimentsSuccess(sentiments));
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestSentimentsError(err.stack!));
    } else {
      yield put(requestSentimentsError('An unknown error occured.'));
    }
  }
}

function* watchGetRequest() {
  yield takeEvery(SentimentActionTypes.SENTIMENTS_GET, handleGetSentiments);
}

function* sentimentSaga() {
  yield all([fork(watchGetRequest)]);
}

export default sentimentSaga;
