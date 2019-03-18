import { action } from 'typesafe-actions';

import { FirebaseActionTypes, IAuthData, IAuthResult } from './types';

export const firebaseAuthCheck = () => action(FirebaseActionTypes.AUTH_CHECK);

export const firebaseGetIDToken = (authResult: IAuthResult) =>
  action(FirebaseActionTypes.AUTH_GET_IDTOKEN, authResult);
export const firebaseAuthSuccess = (authData: IAuthData) =>
  action(FirebaseActionTypes.AUTH_SUCCESS, authData);
export const firebaseAuthError = (error: firebaseui.auth.AuthUIError | Error) =>
  action(FirebaseActionTypes.AUTH_ERROR, error);
export const firebaseAuthSignout = () =>
  action(FirebaseActionTypes.AUTH_SIGNOUT);

export const firebaseAuthorize = (authData: IAuthData) =>
  action(FirebaseActionTypes.AUTH_AUTHORIZE, authData);
