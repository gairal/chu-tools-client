import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addCommand } from '@/store/commands/actions';
import { IQuery } from '@/store/commands/types';
import MessageView from './MessageView';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  saveCommand: (q: IQuery) => dispatch(addCommand(q)),
});

export default connect(
  null,
  mapDispatchToProps,
)(MessageView);
