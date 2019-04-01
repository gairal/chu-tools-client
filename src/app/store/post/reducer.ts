import { AnyAction, Reducer } from 'redux';

import Search from '@/data/Search';
import SearchParams from '@/data/SearchParams';
import { IPostState, PostActionTypes } from './types';

const data = new Search();
const searchParams = new SearchParams();

const initialState: IPostState = {
  currentSearch: null,
  errors: undefined,
  loading: false,
  posts: [],
  saved: [],
};

const copyPostsAndGetIDX = (state: IPostState, action: AnyAction) => {
  const newPosts = [...state.posts];
  const idx = newPosts.findIndex(t => t.id === action.payload.id);

  return { newPosts, idx };
};

const reducer: Reducer<IPostState> = (state = initialState, action) => {
  switch (action.type) {
    case PostActionTypes.POSTS_LOAD: {
      return {
        ...state,
        currentSearch: searchParams.load(),
        posts: data.load(),
      };
    }
    case PostActionTypes.POSTS_FLUSH: {
      data.flush();
      searchParams.flush();

      return {
        ...state,
        currentSearch: null,
        posts: [],
      };
    }
    case PostActionTypes.REQUEST_SEND: {
      data.flush();
      searchParams.flush();

      return {
        ...state,
        currentSearch: null,
        loading: true,
        posts: [],
      };
    }
    case PostActionTypes.REQUEST_MORE: {
      return {
        ...state,
        loading: true,
      };
    }
    case PostActionTypes.REQUEST_SUCCESS: {
      const baseState = {
        ...state,
        loading: false,
      };

      const newPosts = action.payload.posts;
      if (!newPosts || !newPosts.length) {
        data.flush();
        searchParams.flush();
        return baseState;
      }

      const currPosts = state.posts;
      if (
        state.posts.length &&
        currPosts[currPosts.length - 1].id === newPosts[0].id
      ) {
        newPosts.shift();
      }

      const posts = [...currPosts, ...newPosts];
      const currentSearch = {
        ...action.payload.params,
        max_id: posts[posts.length - 1].id,
      };
      data.value = posts;
      searchParams.value = currentSearch;

      return {
        ...baseState,
        currentSearch,
        posts,
      };
    }
    case PostActionTypes.REQUEST_ERROR: {
      return {
        ...state,
        currentSearch: null,
        errors: action.payload,
        loading: false,
        posts: [],
      };
    }
    case PostActionTypes.POST_SET_SENTIMENT: {
      const { newPosts, idx } = copyPostsAndGetIDX(state, action);

      newPosts[idx] = {
        ...newPosts[idx],
        sentiment: action.payload.sentiment,
      };
      data.value = newPosts;

      return { ...state, posts: newPosts };
    }
    case PostActionTypes.POST_SET_VISIBILITY: {
      const { newPosts, idx } = copyPostsAndGetIDX(state, action);

      newPosts[idx] = {
        ...newPosts[idx],
        hidden: action.payload.hidden,
        sentiment: null,
      };
      data.value = newPosts;

      return { ...state, posts: newPosts };
    }
    case PostActionTypes.POST_SET_CATEGORY: {
      const { newPosts, idx } = copyPostsAndGetIDX(state, action);

      newPosts[idx] = {
        ...newPosts[idx],
        category: action.payload.category,
      };
      data.value = newPosts;

      return { ...state, posts: newPosts };
    }
    case PostActionTypes.SAVED_GET: {
      return {
        ...state,
        loading: true,
        saved: [],
      };
    }
    case PostActionTypes.SAVED_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        saved: action.payload,
      };
    }
    case PostActionTypes.SAVED_GET_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    case PostActionTypes.TRANSLATE_GET: {
      return {
        ...state,
        loading: true,
      };
    }
    case PostActionTypes.TRANSLATE_GET_SUCCESS: {
      const { newPosts, idx } = copyPostsAndGetIDX(state, action);

      newPosts[idx] = {
        ...newPosts[idx],
        translation: action.payload.translation.translatedText,
      };
      data.value = newPosts;

      return { ...state, loading: false, posts: newPosts };
    }
    case PostActionTypes.TRANSLATE_GET_ERROR: {
      return { ...state, errors: action.payload, loading: false };
    }
    default: {
      return state;
    }
  }
};

export { reducer as postReducer };
