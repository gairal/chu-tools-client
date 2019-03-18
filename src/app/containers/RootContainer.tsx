import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Header from '@/components/layout/Header';
import Root from '@/components/layout/Root';
import RoutesContainer from '@/containers/RoutesContainer';
import { IApplicationState } from '@/store';
import { firebaseAuthCheck } from '@/store/firebase/actions';

interface IPropsFromState {
  commandCounts: number;
  isAuthenticated: boolean;
  idToken: string;
  name: string;
}

interface IPropsFromDispatch {
  firebaseAuthCheck: typeof firebaseAuthCheck;
}

type AllProps = IPropsFromState & IPropsFromDispatch;

class RootContainer extends React.Component<AllProps> {
  public componentWillMount() {
    this.props.firebaseAuthCheck();
  }

  public render() {
    const { isAuthenticated, name, commandCounts } = this.props;

    return (
      <Root>
        {isAuthenticated ? (
          <Header title={name} commandCounts={commandCounts} />
        ) : null}
        <RoutesContainer />
      </Root>
    );
  }
}

const mapStateToProps = ({ firebase, commands }: IApplicationState) => ({
  commandCounts: commands.commands.length,
  idToken: firebase.idToken,
  isAuthenticated: firebase.isAuthenticated,
  name: firebase.name,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  firebaseAuthCheck: () => dispatch(firebaseAuthCheck()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootContainer);
