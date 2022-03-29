import { defer } from 'src/shared/defer';
import {
  CloseItemAction,
  CloseItemResponse,
  Detail,
  Driver,
  GoToHistoryPageAction,
  GoToHistoryPageResponse,
  HandleItemAction,
  HandleItemResponse,
  Item,
  LoadItemsAction,
  LoadItemsResponse,
  LoadMoreAction,
  LoadMoreResponse,
} from './type';

export function createRemoteDriver(tabId: number): Driver {
  async function goToHistoryPage(): Promise<void> {
    const d = defer<void>();
    chrome.tabs.sendMessage<GoToHistoryPageAction, GoToHistoryPageResponse>(
      tabId,
      {
        type: 'go-to-history-page',
        payload: {},
      },
      () => d.resolve(),
    );
    return d.promise;
  }
  async function loadItems(): Promise<{ items: Item[] }> {
    const d = defer<{ items: Item[] }>();
    chrome.tabs.sendMessage<LoadItemsAction, LoadItemsResponse>(
      tabId,
      {
        type: 'load-items',
        payload: {},
      },
      (res) => d.resolve(res),
    );
    return d.promise;
  }
  async function loadMore(n: number): Promise<{ items: Item[] }> {
    const d = defer<{ items: Item[] }>();
    chrome.tabs.sendMessage<LoadMoreAction, LoadMoreResponse>(
      tabId,
      {
        type: 'load-more',
        payload: { n },
      },
      (res) => d.resolve(res),
    );
    return d.promise;
  }
  async function handleItem(id: string): Promise<{ detail: Detail }> {
    const d = defer<{ detail: Detail }>();
    chrome.tabs.sendMessage<HandleItemAction, HandleItemResponse>(
      tabId,
      {
        type: 'handle-item',
        payload: { id },
      },
      (res) => d.resolve(res),
    );
    return d.promise;
  }
  async function closeItem(): Promise<void> {
    const d = defer<void>();
    chrome.tabs.sendMessage<CloseItemAction, CloseItemResponse>(
      tabId,
      {
        type: 'close-item',
        payload: {},
      },
      () => d.resolve(),
    );
    return d.promise;
  }
  return {
    goToHistoryPage,
    loadItems,
    loadMore,
    handleItem,
    closeItem,
  };
}
