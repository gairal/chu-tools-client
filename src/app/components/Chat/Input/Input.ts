import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { requestSend } from '@/store/chat/actions';
import InputView from './InputView';

const mapStateToProps = ({ chat }: IApplicationState) => ({
  dialog: chat.dialog,
  loading: chat.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestSend: (message: string) => dispatch(requestSend(message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InputView);
