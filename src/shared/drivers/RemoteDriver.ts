import { defer } from 'src/shared/defer';
import {
  CloseItemAction,
  CloseItemResponse,
  Detail,
  Driver,
  GoToHistoryPageAction,
  GoToHistoryPageResponse,
  Item,
  LoadItemsAction,
  LoadItemsResponse,
  OpenItemAction,
  OpenItemResponse,
  ReadItemAction,
  ReadItemResponse,
  ScrollToEndAction,
  ScrollToEndResponse,
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
  async function scrollToEnd(): Promise<void> {
    const d = defer<void>();
    chrome.tabs.sendMessage<ScrollToEndAction, ScrollToEndResponse>(
      tabId,
      {
        type: 'scroll-to-end',
        payload: {},
      },
      () => d.resolve(),
    );
    return d.promise;
  }
  async function openItem(id: string): Promise<void> {
    const d = defer<void>();
    chrome.tabs.sendMessage<OpenItemAction, OpenItemResponse>(
      tabId,
      {
        type: 'open-item',
        payload: { id },
      },
      () => d.resolve(),
    );
    return d.promise;
  }
  async function readItem(): Promise<{ detail: Detail }> {
    const d = defer<{ detail: Detail }>();
    chrome.tabs.sendMessage<ReadItemAction, ReadItemResponse>(
      tabId,
      {
        type: 'read-item',
        payload: {},
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
    scrollToEnd,
    openItem,
    readItem,
    closeItem,
  };
}
