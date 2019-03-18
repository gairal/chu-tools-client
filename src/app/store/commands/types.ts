import Commands from '@/data/Commands';

export type ApiResponse = Record<string, any>;

export interface IQuery {
  q: string;
}

export const enum CommandsActionTypes {
  COMMAND_LOAD = '@@commands/COMMAND_LOAD',
  COMMAND_FLUSH = '@@commands/COMMAND_FLUSH',
  COMMAND_ADD = '@@commands/COMMAND_ADD',
}

export interface ICommandState {
  readonly loading: boolean;
  readonly commands: IQuery[];
  readonly errors?: string;
  readonly data: Commands;
}
