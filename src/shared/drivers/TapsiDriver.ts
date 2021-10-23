import { Detail, Driver, Item } from './type';

async function goToHistoryPage(): Promise<void> {
  console.log('tapsi goToHistoryPage');
}
async function loadItems(): Promise<{ items: Item[] }> {
  console.log('tapsi loadItems');
  return { items: [] };
}
async function loadMore(n: number): Promise<{ items: Item[] }> {
  console.log('tapsi loadMore', n);
  return { items: [] };
}
async function handleItem(id: string): Promise<{ detail: Detail }> {
  console.log('tapsi handleItem', id);
  return { detail: {} as any };
}
async function closeItem(): Promise<void> {
  console.log('tapsi closeItem');
}

export const tapsiDriver: Driver = {
  goToHistoryPage,
  loadItems,
  loadMore,
  handleItem,
  closeItem,
};
