export interface ICategory {
  label: string;
}

export const enum CategoryActionTypes {
  CATEGORIES_GET = '@@category/CATEGORIES_GET',
  CATEGORIES_GET_SUCCESS = '@@category/CATEGORIES_GET_SUCCESS',
  CATEGORIES_GET_ERROR = '@@category/CATEGORIES_GET_ERROR',
}

export interface ICategoryState {
  readonly loading: boolean;
  readonly categories: ICategory[];
  readonly errors?: string;
}
