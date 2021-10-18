import { Detail, Driver, Item } from './type';

function parseSnappDate(text: string): string {
  // سفر صبح چهارشنبه ۸ اردیبهشت
  // سفر لغو شده توسط راننده، صبح چهارشنبه ۸ اردیبهشت
  // سفر لغو شده توسط شما، شنبه بعدازظهر ۲۱ فروردین
  return text;
}

async function goToHistoryPage(): Promise<void> {
  window.location.replace('/ride-history');
}
async function loadItems(): Promise<{ items: Item[] }> {
  console.log('snapp loadItems');

  const elements = Array.from(document.getElementsByClassName('_3e91kz'));
  const items = elements.map((el, index): Item => {
    const a = el as HTMLAnchorElement;
    return {
      id: String(index),
      date: parseSnappDate(a.innerText.split('\n')[0]),
    };
  });
  console.log(items);
  return { items };
}
async function scrollToEnd(): Promise<void> {
  console.log('snapp scrollToEnd');
}
async function openItem(id: string): Promise<void> {
  console.log('snapp openItem');
}
async function readItem(): Promise<{ detail: Detail }> {
  console.log('snapp readItem');
  return { detail: {} as any };
}
async function closeItem(): Promise<void> {
  console.log('snapp closeItem');
}

export const snappDriver: Driver = {
  goToHistoryPage,
  loadItems,
  scrollToEnd,
  openItem,
  readItem,
  closeItem,
};
