import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { requestSend, saveSend } from '@/store/search/actions';
import { IOrderedTweetIds } from '@/store/search/types';
import FormView from './FormView';

const mapStateToProps = ({ search }: IApplicationState) => ({
  loading: search.loading,
  tweets: search.tweets,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  request: (message: string) => dispatch(requestSend(message)),
  save: (ids: IOrderedTweetIds) => dispatch(saveSend(ids)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormView);
