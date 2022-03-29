import { delay } from 'src/shared/delay';
import { parseSnappDate, parseSnappDateTime } from './snapp/snappDate';
import { Detail, Driver, Item } from './type';

const css = `
header, footer {
  display: none
}
main {
  width: 450px;
}
`;
let style = document.createElement('style') as HTMLStyleElement;
style.appendChild(document.createTextNode(css));

async function goToHistoryPage(): Promise<void> {
  window.location.replace('/ride-history');
}

async function loadItems(): Promise<{ items: Item[] }> {
  const elements = Array.from(document.getElementsByClassName('_3IFnKX'));
  const items = elements.map((el, index): Item => {
    const a = el as HTMLAnchorElement;
    const title = a.innerText.split('\n')[0];
    return {
      id: String(index),
      date: parseSnappDate(title),
      title,
    };
  });
  return { items };
}

async function scrollToEnd() {
  const r = document.getElementsByClassName('layout-0-2-3')[0];
  r.scrollTo(0, r.scrollHeight);
}

async function loadMore(n: number): Promise<{ items: Item[] }> {
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

function getSize() {
  const el = document.getElementsByTagName('main')[1] as HTMLDivElement;
  const top = el.offsetTop;
  const left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { top, left, width, height };
}

async function handleItem(id: string): Promise<{ detail: Detail }> {
  const n = Number(id);
  let items = (await loadMore(n)).items;
  while (items.length < n) {
    items = (await loadMore(n)).items;
  }
  const elements = Array.from(document.getElementsByClassName('_3IFnKX'));
  const element = elements[n] as HTMLAnchorElement;
  element.click();

  await delay(2000);
  document.head.appendChild(style);

  const data =
    document.getElementById('ride-history-info')?.innerText.split('\n') ?? [];
  const dateIndex = data.findIndex((s) => s === 'تاریخ سفر') + 1;
  const timeIndex = data.findIndex((s) => s === 'زمان شروع سفر') + 1;

  const datetime = parseSnappDateTime(
    data[dateIndex],
    data[timeIndex],
  ).datetime;
  const size = getSize();
  return { detail: { id, datetime, size } };
}

async function closeItem(): Promise<void> {
  try {
    document.head.removeChild(style);
  } catch (e) {}
  window.history.back();
}

export const snappDriver: Driver = {
  goToHistoryPage,
  loadItems,
  loadMore,
  handleItem,
  closeItem,
};
