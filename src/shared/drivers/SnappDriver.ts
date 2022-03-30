import { delay } from 'src/shared/delay';
import { parseSnappDate, parseSnappDateTime } from './snapp/snappDate';
import { Detail, Driver, Item } from './type';

const iframeCss = `
header, footer {
  display: none
}
.z4-SpS > div {
  overflow: hidden;
}
`;

const css = `
.histaxory-iframe-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9999;
  background-color: #fff;
}

#histaxory-iframe {
  width: 450px;
  height: 100%;
  border: none;
}

`;
let style = document.createElement('style') as HTMLStyleElement;
style.appendChild(document.createTextNode(css));

let iframeStyle = document.createElement('style') as HTMLStyleElement;
iframeStyle.appendChild(document.createTextNode(iframeCss));

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
  const el = document.getElementById('histaxory-iframe') as HTMLIFrameElement;
  const top = el.offsetTop;
  const left = el.offsetLeft;
  const width = el.offsetWidth;
  const height = el.offsetHeight;
  return { top, left, width, height };
}

async function addIframe(href: string) {
  const wrapper = document.createElement('div');
  wrapper.className = 'histaxory-iframe-wrapper';
  const iframe = document.createElement('iframe');
  iframe.id = 'histaxory-iframe';
  wrapper.appendChild(iframe);
  iframe.src = href;
  document.head.appendChild(style);
  document.body.appendChild(wrapper);
  await delay(1000);
  iframe.contentWindow!.document.head.appendChild(iframeStyle);

  return iframe;
}

async function waitForElement(
  document: Document,
  selector: string,
  retry = 3,
): Promise<HTMLElement> {
  const el = document.querySelector(selector) as HTMLElement;
  if (el) {
    return el;
  }
  if (retry <= 0) {
    throw new Error(`waitForElement: ${selector} not found`);
  }

  await delay(1000);
  return waitForElement(document, selector, retry - 1);
}

async function handleItem(id: string): Promise<{ detail: Detail }> {
  const n = Number(id);
  let items = (await loadMore(n)).items;
  while (items.length < n) {
    items = (await loadMore(n)).items;
  }
  const elements = Array.from(document.getElementsByClassName('_3IFnKX'));
  const element = elements[n] as HTMLAnchorElement;
  const href = element.closest('a')!.href;

  const iframe = await addIframe(href);
  const dateEl = await waitForElement(
    iframe.contentWindow!.document,
    '#ride-history-info',
    6,
  );
  const data = dateEl?.innerText.split('\n') ?? [];
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
    const wrapper = document.getElementsByClassName(
      'histaxory-iframe-wrapper',
    )[0];
    document.body.removeChild(wrapper);
    document.head.removeChild(style);
  } catch (e) {}
}

export const snappDriver: Driver = {
  goToHistoryPage,
  loadItems,
  loadMore,
  handleItem,
  closeItem,
};
