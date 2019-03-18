import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { requestSend } from '@/store/search/actions';
import FormView from './FormView';

const mapStateToProps = ({ search }: IApplicationState) => ({
  loading: search.loading,
  tweets: search.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  request: (message: string) => dispatch(requestSend(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormView);
