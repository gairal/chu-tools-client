import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { loadChat } from '@/store/chat/actions';
import { loadCommands } from '@/store/commands/actions';
import ConversationView from './ConversationView';

const mapStateToProps = ({ chat }: IApplicationState) => ({
  dialog: chat.dialog,
  errors: chat.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadChat: () => dispatch(loadChat()),
  loadCommands: () => dispatch(loadCommands()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationView);
