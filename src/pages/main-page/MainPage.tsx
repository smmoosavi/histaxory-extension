import { useWire } from '@forminator/react-wire';
import { t } from '@lingui/macro';
import { Box, Stack } from '@mui/material';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { createRemoteDriver, Item } from 'src/shared/drivers';
import { SubmitButton } from 'src/shared/submit-button';
import { useSubmit, useSubmitWire } from 'src/shared/submit-wire';
import { TripsTable } from './table/TripsTable';
import { useDownload } from './use-download';

interface OwnProps {}

export type Props = PropsWithChildren<OwnProps>;

export function MainPage() {
  let searchParts = window.location.search.split('?')[1];
  let [windowIdString, tabIdString] = searchParts.split('/');
  const windowId = Number(windowIdString);
  const tabId = Number(tabIdString);
  let driver = useMemo(() => createRemoteDriver(tabId), [tabId]);
  const items$ = useWire<Item[]>(null, []);
  const goToStoryPage$ = useSubmitWire();
  useSubmit(
    goToStoryPage$,
    useCallback(async () => {
      await driver.goToHistoryPage();
      await driver.loadMore(0);
    }, [driver]),
  );

  const loadMore$ = useSubmitWire();

  useSubmit(
    loadMore$,
    useCallback(async () => {
      let { items } = await driver.loadMore(items$.getValue().length);
      items$.setValue(items);
    }, [driver, items$]),
  );

  const download = useDownload(driver, { windowId, tabId });

  return (
    <Box m={2}>
      <Stack spacing={2}>
        <Box>
          <SubmitButton
            fullWidth
            variant="contained"
            submit$={goToStoryPage$}
          >{t`Go to history page`}</SubmitButton>
        </Box>
        <Box>
          <TripsTable items$={items$} download={download} />
        </Box>
        <Box>
          <SubmitButton
            fullWidth
            variant="contained"
            submit$={loadMore$}
          >{t`Load more`}</SubmitButton>
        </Box>
      </Stack>
    </Box>
  );
}
