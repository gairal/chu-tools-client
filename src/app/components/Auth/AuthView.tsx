import { firebase } from '@firebase/app';
import { RouterState } from 'connected-react-router';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router';

import {
  firebaseAuthError,
  firebaseGetIDToken,
} from '@/store/firebase/actions';

interface IPropsFromState {
  isAuthenticated: boolean;
  location: RouterState['location'];
}

interface IPropsFromDispatch {
  fbAuthError: typeof firebaseAuthError;
  fbGetIDToken: typeof firebaseGetIDToken;
}

type AllProps = IPropsFromState & IPropsFromDispatch;
const AuthView: React.SFC<AllProps> = ({
  isAuthenticated,
  location,
  fbAuthError,
  fbGetIDToken,
}) => {
  const signInFailure = (error: firebaseui.auth.AuthUIError): Promise<void> => {
    fbAuthError(error);
    return Promise.resolve();
  };

  const signInSuccessWithAuthResult = (authResult: any): boolean => {
    fbGetIDToken(authResult);
    return false;
  };
  const { from } = location.state || { from: { pathname: '/' } };

  const uiConfig: firebaseui.auth.Config = {
    callbacks: {
      signInFailure,
      signInSuccessWithAuthResult,
    },
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };

  return isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};

export default AuthView;
