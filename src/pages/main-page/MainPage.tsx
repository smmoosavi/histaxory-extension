import { PropsWithChildren } from 'react';

interface OwnProps {}

export type Props = PropsWithChildren<OwnProps>;

export function MainPage() {
  const tabId = window.location.search.split('?')[1];
  return <div>tab id: {tabId}</div>;
}
