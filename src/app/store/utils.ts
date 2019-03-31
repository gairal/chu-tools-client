import { select } from 'redux-saga/effects';

export function* customFetch(query: string, requestInit: RequestInit = {}) {
  const idToken = yield select(({ firebase }) => firebase.idToken);

  const res: Response = yield fetch(query, {
    ...requestInit,
    headers: {
      'Content-Type': 'application/json',
      ...requestInit.headers,
      Authorization: `Bearer ${idToken}`,
    },
  });
  const json = yield res.json();

  return json;
}
