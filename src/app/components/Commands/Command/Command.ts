import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { requestSend } from '@/store/chat/actions';
import CommandView from './CommandView';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  sendCommand: (q: string) => dispatch(requestSend(q)),
});

export default connect(
  null,
  mapDispatchToProps,
)(CommandView);
