import { select } from 'redux-saga/effects';

export function* customFetch(query: string) {
  const idToken = yield select(({ firebase }) => firebase.idToken);

  const res = yield fetch(query, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  const json = yield res.json();

  return { json, res };
}
