import { Detail, Driver, Item } from './type';

async function goToHistoryPage(): Promise<void> {
  console.log('snapp goToHistoryPage');
}
async function loadItems(): Promise<{ items: Item[] }> {
  console.log('snapp loadItems');
  return { items: [] };
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
