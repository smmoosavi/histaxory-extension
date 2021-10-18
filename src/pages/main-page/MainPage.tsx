import { useWire, useWireValue } from '@forminator/react-wire';
import { t } from '@lingui/macro';
import { Box, Stack } from '@mui/material';
import { PropsWithChildren, useCallback, useMemo } from 'react';
import { createRemoteDriver } from 'src/shared/drivers';
import { Item } from 'src/shared/drivers/type';
import { SubmitButton } from 'src/shared/submit-button';
import { useSubmit, useSubmitWire } from 'src/shared/submit-wire';

interface OwnProps {}

export type Props = PropsWithChildren<OwnProps>;

export function MainPage() {
  const tabId = Number(window.location.search.split('?')[1]);
  let driver = useMemo(() => createRemoteDriver(tabId), [tabId]);
  const items$ = useWire<Item[]>(null, []);
  const goToStoryPage$ = useSubmitWire();
  useSubmit(
    goToStoryPage$,
    useCallback(async () => {
      await driver.goToHistoryPage();
    }, [driver]),
  );
  const loadItems$ = useSubmitWire();
  useSubmit(
    loadItems$,
    useCallback(async () => {
      const res = await driver.loadItems();
      console.log('res load items', res);
      items$.setValue(res.items);
    }, [driver, items$]),
  );
  const items = useWireValue(items$);
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
          <SubmitButton
            fullWidth
            variant="contained"
            submit$={loadItems$}
          >{t`Load trips`}</SubmitButton>
        </Box>
        <Box>item counts: {items.length}</Box>
      </Stack>
    </Box>
  );
}
