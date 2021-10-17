import { PropsWithChildren, useMemo, useState } from 'react';
import { createRemoteDriver } from 'src/shared/drivers';

interface OwnProps {}

export type Props = PropsWithChildren<OwnProps>;

export function MainPage() {
  const tabId = Number(window.location.search.split('?')[1]);
  let driver = useMemo(() => createRemoteDriver(tabId), [tabId]);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setLoading(true);
          driver.goToHistoryPage().then(() => setLoading(false));
        }}
      >
        {loading ? 'loading' : 'go to history page'}
      </button>
    </div>
  );
}
