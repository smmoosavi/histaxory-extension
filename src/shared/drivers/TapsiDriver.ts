import { Detail, Driver, Item } from './type';

async function goToHistoryPage(): Promise<void> {
  console.log('tapsi goToHistoryPage');
}
async function loadItems(): Promise<{ items: Item[] }> {
  console.log('tapsi loadItems');
  return { items: [] };
}
async function scrollToEnd(): Promise<void> {
  console.log('tapsi scrollToEnd');
}
async function openItem(id: string): Promise<void> {
  console.log('tapsi openItem');
}
async function readItem(): Promise<{ detail: Detail }> {
  console.log('tapsi readItem');
  return { detail: {} as any };
}
async function closeItem(): Promise<void> {
  console.log('tapsi closeItem');
}

export const tapsiDriver: Driver = {
  goToHistoryPage,
  loadItems,
  scrollToEnd,
  openItem,
  readItem,
  closeItem,
};
