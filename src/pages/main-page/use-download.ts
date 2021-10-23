import { format, parseISO } from 'date-fns-jalali';
import { useCallback } from 'react';
import { Driver } from 'src/shared/drivers';
import { useQueue } from 'src/shared/queue';
import { delay } from '../../shared/delay';
import download from 'downloadjs';

async function realDownload(
  id: string,
  driver: Driver,
  ctx: { windowId: number; tabId: number },
) {
  console.log('real download start', id);
  let res = await driver.handleItem(id);
  console.log(res);
  await delay(1000);
  let img = await chrome.tabs.captureVisibleTab(ctx.windowId, {
    format: 'png',
  });
  let date = parseISO(res.detail.datetime);
  console.log(date);
  let name = format(date, 'yyyy-MM-dd hh-mm');
  console.log(name);
  download(img, name + '.png');
  await driver.closeItem();
  console.log('real download end', id);
}

export function useDownload(
  driver: Driver,
  ctx: { windowId: number; tabId: number },
) {
  const { windowId, tabId } = ctx;
  const download = useCallback(
    (id: string) => {
      return realDownload(id, driver, { windowId, tabId });
    },
    [driver, windowId, tabId],
  );
  const running$ = useQueue<string>(download);
  return useCallback(
    async (id: string) => {
      return new Promise<void>((resolve, reject) => {
        const unsubscribeError = running$.fn('error', (tid) => {
          console.log('end', tid, 'form ', id);
          if (id === tid) {
            console.log('done');
            unsubscribeError();
            reject();
          }
        });
        const unsubscribeEnd = running$.fn('end', (tid) => {
          console.log('end', tid, 'form ', id);
          if (id === tid) {
            console.log('done');
            unsubscribeEnd();
            resolve();
          }
        });
        running$.fns.push(id);
      });
    },
    [running$],
  );
}
