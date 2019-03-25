import { action } from 'typesafe-actions';

import { CategoryActionTypes, ICategory } from './types';

export const requestCategories = () =>
  action(CategoryActionTypes.CATEGORIES_GET);
export const requestCategoriesError = (message: string) =>
  action(CategoryActionTypes.CATEGORIES_GET_ERROR, message);
export const requestCategoriesSuccess = (categories: ICategory[]) =>
  action(CategoryActionTypes.CATEGORIES_GET_SUCCESS, categories);
