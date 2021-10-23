import { delay } from '../delay';
import { parseSnappDate } from './snapp/snappDate';
import { Detail, Driver, Item } from './type';

async function goToHistoryPage(): Promise<void> {
  window.location.replace('/ride-history');
}
async function loadItems(): Promise<{ items: Item[] }> {
  console.log('snapp loadItems');

  const elements = Array.from(document.getElementsByClassName('_3e91kz'));
  const items = elements.map((el, index): Item => {
    const a = el as HTMLAnchorElement;
    const title = a.innerText.split('\n')[0];
    return {
      id: String(index),
      date: parseSnappDate(title),
      title,
    };
  });
  console.log(items);
  return { items };
}

async function scrollToEnd() {
  console.log('snapp loadMore');
  const r = document.getElementsByClassName('layout-0-2-3')[0];
  r.scrollTo(0, r.scrollHeight);
}

async function loadMore(n: number): Promise<{ items: Item[] }> {
  console.log('snapp loadMore');
  let items = (await loadItems()).items;
  let lastLength = items.length;
  while (items.length <= n) {
    await scrollToEnd();
    await delay(3000); // use MutationObserver for loading balls
    items = (await loadItems()).items;
    if (lastLength === items.length) {
      break;
    }
  }
  return { items };

  // r.getElementsByClassName('loadingBalls-0-2-9');
}
async function handleItem(id: string): Promise<{ detail: Detail }> {
  console.log('snapp handleItem');
  return { detail: {} as any };
}

async function closeItem(): Promise<void> {
  console.log('snapp closeItem');
}

export const snappDriver: Driver = {
  goToHistoryPage,
  loadItems,
  loadMore,
  handleItem,
  closeItem,
};
