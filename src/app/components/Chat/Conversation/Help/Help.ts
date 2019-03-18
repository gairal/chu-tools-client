import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { flushChat, requestSend } from '@/store/chat/actions';
import HelpView from './HelpView';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  flushChat: () => dispatch(flushChat()),
  requestSend: (message: string) => dispatch(requestSend(message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(HelpView);
