export const enum FirebaseActionTypes {
  AUTH_CHECK = '@@firebase/AUTH_CHECK',

  AUTH_GET_IDTOKEN = '@@firebase/AUTH_AUTHENTICATION_GET_IDTOKEN',
  AUTH_AUTHORIZE = '@@firebase/AUTH_AUTHORIZE',
  AUTH_SUCCESS = '@@firebase/AUTH_SUCCESS',
  AUTH_ERROR = '@@firebase/AUTH_ERROR',

  AUTH_SIGNOUT = '@@firebase/AUTH_SIGNOUT',
}

export interface IFirebaseState {
  readonly idToken: string;
  readonly isAuthenticated: boolean;
  readonly errors?: string;
  readonly name: string;
}

export interface IAuthData {
  idToken: string;
  name: string;
}

export interface IAuthResult {
  readonly credential: {
    idToken: string;
  };
  readonly additionalUserInfo: {
    profile: {
      given_name: string;
    };
  };
  readonly user: {
    getIdToken: () => any;
  };
}

export interface IAuthorization {
  authorized: boolean;
  name: string;
  status: number;
}
