export interface Item {
  id: string;
  /**
   * iso date string
   */
  date?: string;
  time?: string;
}

export interface Detail {
  id: string;
  /**
   * iso date string
   */
  date?: string;
  time?: string;
}

export interface Driver {
  goToHistoryPage(): Promise<void>;
  loadItems(): Promise<{ items: Item[] }>;
  scrollToEnd(): Promise<void>;
  openItem(id: string): Promise<void>;
  readItem(): Promise<{ detail: Detail }>;
  closeItem(): Promise<void>;
}

export type ActionType =
  | 'go-to-history-page'
  | 'load-items'
  | 'scroll-to-end'
  | 'open-item'
  | 'read-item'
  | 'close-item';

export type DriverAction =
  | GoToHistoryPageAction
  | LoadItemsAction
  | ScrollToEndAction
  | OpenItemAction
  | ReadItemAction
  | CloseItemAction;

export type GoToHistoryPageAction = { type: 'go-to-history-page'; payload: {} };
export type LoadItemsAction = { type: 'load-items'; payload: {} };
export type ScrollToEndAction = { type: 'scroll-to-end'; payload: {} };
export type OpenItemAction = { type: 'open-item'; payload: { id: string } };
export type ReadItemAction = { type: 'read-item'; payload: {} };
export type CloseItemAction = { type: 'close-item'; payload: {} };

export type DriverResponse =
  | GoToHistoryPageResponse
  | LoadItemsResponse
  | ScrollToEndResponse
  | OpenItemResponse
  | ReadItemResponse
  | CloseItemResponse;

export type GoToHistoryPageResponse = void;
export type LoadItemsResponse = { items: Item[] };
export type ScrollToEndResponse = void;
export type OpenItemResponse = void;
export type ReadItemResponse = { detail: Detail };
export type CloseItemResponse = void;
