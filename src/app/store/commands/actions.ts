import { action } from 'typesafe-actions';

import { CommandsActionTypes, IQuery } from './types';

export const loadCommands = () => action(CommandsActionTypes.COMMAND_LOAD);
export const flushCommands = () => action(CommandsActionTypes.COMMAND_FLUSH);
export const addCommand = (q: IQuery) =>
  action(CommandsActionTypes.COMMAND_ADD, q);
