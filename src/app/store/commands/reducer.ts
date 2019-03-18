import { Reducer } from 'redux';

import Commands from '@/data/Commands';
import { CommandsActionTypes, ICommandState } from './types';

const initialState: ICommandState = {
  commands: [],
  data: null,
  errors: undefined,
  loading: false,
};

const reducer: Reducer<ICommandState> = (state = initialState, action) => {
  switch (action.type) {
    case CommandsActionTypes.COMMAND_LOAD: {
      const data = state.data ? state.data : new Commands('');
      return {
        ...state,
        data,
        commands: data.load(),
      };
    }
    case CommandsActionTypes.COMMAND_FLUSH: {
      state.data.flush();

      return {
        ...state,
        commands: [],
      };
    }
    case CommandsActionTypes.COMMAND_ADD: {
      for (let i = 0, l = state.commands.length; i < l; i += 1) {
        if (state.commands[i].q === action.payload.q) return state;
      }
      state.data.add(action.payload);

      return {
        ...state,
        commands: [...state.commands, action.payload],
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as commandsReducer };
