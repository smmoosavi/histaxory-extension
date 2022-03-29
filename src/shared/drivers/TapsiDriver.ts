import { delay } from 'src/shared/delay';
import { parseTapsiDate } from './tapsi/tapsiDate';
import { Detail, Driver, Item } from './type';

const css = `
header, footer {
  display: none
}
`;
let style = document.createElement('style') as HTMLStyleElement;
style.appendChild(document.createTextNode(css));

function $x(xpath: string) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null,
  ).singleNodeValue;
}

async function goToHistoryPage(): Promise<void> {
  (document.querySelector('.hamburger.drawer') as HTMLButtonElement)?.click();
  ($x("//div[contains(text(), 'سفر‌های من')]") as HTMLDivElement)?.click();
  await delay(1000);
}
async function loadItems(): Promise<{ items: Item[] }> {
  const elements = Array.from(
    document.getElementsByClassName('RideHistory-ride-content-container'),
  );
  const items = elements.map((el, index): Item => {
    const a = el as HTMLAnchorElement;
    const title = a.innerText.split('\n')[0];
    return {
      id: String(index),
      // TODO
      // date: parseTapsiDate(title),
      title,
    };
  });
  return { items };
}
async function scrollToEnd() {
  const r = document.getElementsByClassName(
    'RideHistory-ride-list-container',
  )[0];
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
}

function getSize() {
  const el = document.getElementsByClassName(
    'ride-details_wrap',
  )[0] as HTMLDivElement;
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
  const elements = Array.from(
    document.getElementsByClassName('RideHistory-ride-content-container'),
  );
  const element = elements[n] as HTMLAnchorElement;
  const title = element.innerText.split('\n')[0];
  const { datetime } = parseTapsiDate(title);
  element.click();

  await delay(3000);
  document.head.appendChild(style);
  const size = getSize();

  return { detail: { id, datetime, size } };
}

async function closeItem(): Promise<void> {
  try {
    document.head.removeChild(style);
  } catch (e) {}
  await delay(1000);

  const close = document.getElementsByClassName(
    'header-close_button',
  )[1] as HTMLDivElement;

  close.click();
  await delay(1000);
}

export const tapsiDriver: Driver = {
  goToHistoryPage,
  loadItems,
  loadMore,
  handleItem,
  closeItem,
};
