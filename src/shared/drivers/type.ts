export interface Item {
  id: string;
  /**
   * iso date string
   */
  date?: string;
  time?: string;
  title?: string;
}

export interface Size {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Detail {
  id: string;
  /**
   * iso date string
   */
  datetime: string;
  size: Size;
}

export interface Driver {
  goToHistoryPage(): Promise<void>;
  loadItems(): Promise<{ items: Item[] }>;
  loadMore(n: number): Promise<{ items: Item[] }>;
  handleItem(id: string): Promise<{ detail: Detail }>;
  closeItem(): Promise<void>;
}

export type ActionType =
  | 'go-to-history-page'
  | 'load-items'
  | 'loadMore'
  | 'handle-item'
  | 'close-item';

export type DriverAction =
  | GoToHistoryPageAction
  | LoadItemsAction
  | LoadMoreAction
  | HandleItemAction
  | CloseItemAction;

export type GoToHistoryPageAction = { type: 'go-to-history-page'; payload: {} };
export type LoadItemsAction = { type: 'load-items'; payload: {} };
export type LoadMoreAction = { type: 'load-more'; payload: { n: number } };
export type HandleItemAction = { type: 'handle-item'; payload: { id: string } };
export type CloseItemAction = { type: 'close-item'; payload: {} };

export type DriverResponse =
  | GoToHistoryPageResponse
  | LoadItemsResponse
  | LoadMoreResponse
  | HandleItemResponse
  | CloseItemResponse;

export type GoToHistoryPageResponse = void;
export type LoadItemsResponse = { items: Item[] };
export type LoadMoreResponse = { items: Item[] };
export type HandleItemResponse = { detail: Detail };
export type CloseItemResponse = void;
