import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { IApplicationState } from '@/store';
import { requestSend } from '@/store/chat/actions';
import { loadCommands } from '@/store/commands/actions';
import CommandsView from './CommandsView';

const mapStateToProps = ({ commands }: IApplicationState) => ({
  commands: commands.commands,
  errors: commands.errors,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadCommands: () => dispatch(loadCommands()),
  sendCommand: (q: string) => dispatch(requestSend(q)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommandsView);
