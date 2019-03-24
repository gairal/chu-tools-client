export interface ISheetQuery {
  negative: string;
  positive: string;
  neutral: string;
}

export interface IOrderedTweetIds {
  negative: string[];
  positive: string[];
  neutral: string[];
}

export interface ISheet {
  id: string;
  title: string;
}

export const enum SheetActionTypes {
  SAVE_SEND = '@@sheet/SAVE_SEND',
  SAVE_SUCCESS = '@@sheet/SAVE_SUCCESS',
  SAVE_ERROR = '@@sheet/SAVE_ERROR',
}

export interface ISheetState {
  readonly loading: boolean;
  readonly sheets: ISheet[];
  readonly errors?: string;
}
