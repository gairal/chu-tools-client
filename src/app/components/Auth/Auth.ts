import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import {
  firebaseAuthError,
  firebaseGetIDToken,
} from '@/store/firebase/actions';
import AuthView from './AuthView';

const mapStateToProps = ({ firebase, router }: IApplicationState) => ({
  idToken: firebase.idToken,
  isAuthenticated: firebase.isAuthenticated,
  location: router.location,
  name: firebase.name,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fbAuthError: (error: firebaseui.auth.AuthUIError) =>
    dispatch(firebaseAuthError(error)),
  fbGetIDToken: (authResult: any) => dispatch(firebaseGetIDToken(authResult)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthView);
