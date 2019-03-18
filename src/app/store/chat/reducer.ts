import { Reducer } from 'redux';

import Chat from '@/data/Chat';
import { ChatActionTypes, IChatState } from './types';

const initialState: IChatState = {
  data: null,
  dialog: [],
  errors: undefined,
  loading: false,
};

const reducer: Reducer<IChatState> = (state = initialState, action) => {
  switch (action.type) {
    case ChatActionTypes.CHAT_LOAD: {
      // TODO: what are we doing with the idToken in Persistable ?
      const data = state.data ? state.data : new Chat('');
      return {
        ...state,
        data,
        dialog: data.load(),
      };
    }
    case ChatActionTypes.CHAT_FLUSH: {
      state.data.flush();
      return {
        ...state,
        dialog: [],
      };
    }
    case ChatActionTypes.REQUEST_SEND: {
      const newMessage = {
        content: {
          text: action.payload,
        },
        id: state.dialog.length,
        isBot: false,
        user: 'you',
      };

      state.data.add(newMessage);

      return {
        ...state,
        dialog: [...state.dialog, newMessage],
        loading: true,
      };
    }
    case ChatActionTypes.REQUEST_SUCCESS: {
      const newMessage = {
        content: action.payload,
        id: state.dialog.length,
        isBot: true,
        user: 'vc',
      };

      state.data.add(newMessage);
      return {
        ...state,
        dialog: [...state.dialog, newMessage],
        loading: false,
      };
    }
    case ChatActionTypes.REQUEST_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as chatReducer };
