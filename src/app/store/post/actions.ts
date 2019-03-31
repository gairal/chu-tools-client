import moment from 'moment';
import { action } from 'typesafe-actions';

import { IPost, PostType } from '../types';
import { ISearchParams, ITranslation, PostActionTypes } from './types';

export const postsLoad = () => action(PostActionTypes.POSTS_LOAD);
export const postsFlush = () => action(PostActionTypes.POSTS_FLUSH);

export const loadPosts = (
  q: string = '',
  start: string = moment()
    .subtract(1, 'months')
    .format('YYYY-MM-DD'),
  end: string = moment().format('YYYY-MM-DD'),
  type: PostType,
) => action(PostActionTypes.REQUEST_SEND, { q, start, end, type });
export const loadMorePosts = () => action(PostActionTypes.REQUEST_MORE);
export const loadPostsSuccess = (params: ISearchParams, posts: IPost[]) =>
  action(PostActionTypes.REQUEST_SUCCESS, { params, posts });
export const loadPostsError = (message: string) =>
  action(PostActionTypes.REQUEST_ERROR, message);

export const setSentiment = (id: string, sentiment: string) =>
  action(PostActionTypes.POST_SET_SENTIMENT, { id, sentiment });
export const setVisibility = (id: string, hidden: boolean) =>
  action(PostActionTypes.POST_SET_VISIBILITY, { id, hidden });
export const setCategory = (id: string, category: string) =>
  action(PostActionTypes.POST_SET_CATEGORY, { id, category });

export const requestSaved = () => action(PostActionTypes.SAVED_GET);
export const requestSavedSuccess = (data: string[]) =>
  action(PostActionTypes.SAVED_GET_SUCCESS, data);
export const requestSavedError = (message: string) =>
  action(PostActionTypes.SAVED_GET_ERROR, message);

export const requestTranslate = (id: string, source: string, q: string) =>
  action(PostActionTypes.TRANSLATE_GET, { id, source, q });
export const requestTranslateSuccess = (
  id: string,
  translation: ITranslation,
) => action(PostActionTypes.TRANSLATE_GET_SUCCESS, { id, translation });
export const requestTranslateError = (message: string) =>
  action(PostActionTypes.TRANSLATE_GET_ERROR, message);
