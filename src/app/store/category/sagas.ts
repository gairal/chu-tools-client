import * as firebase from 'firebase';
import { all, fork, put, takeEvery } from 'redux-saga/effects';

import { requestCategoriesError, requestCategoriesSuccess } from './actions';
import { CategoryActionTypes, ICategory } from './types';

function* handleGetCategories() {
  try {
    const db = firebase.firestore();
    const querySnapshot = yield db.collection('categories').get();

    const categories: ICategory[] = [];
    querySnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot) => {
      const category: ICategory = doc.data() as ICategory;
      categories.push({ id: doc.id, ...category });
    });

    yield put(requestCategoriesSuccess(categories));
  } catch (err) {
    if (err instanceof Error) {
      yield put(requestCategoriesError(err.stack!));
    } else {
      yield put(requestCategoriesError('An unknown error occured.'));
    }
  }
}

function* watchGetRequest() {
  yield takeEvery(CategoryActionTypes.CATEGORIES_GET, handleGetCategories);
}

function* categorySaga() {
  yield all([fork(watchGetRequest)]);
}

export default categorySaga;
