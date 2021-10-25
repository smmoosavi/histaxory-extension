import { format, parseISO } from 'date-fns-jalali';
import download from 'downloadjs';
import Jimp from 'jimp';
import { useCallback } from 'react';
import { Driver } from 'src/shared/drivers';
import { useQueue } from 'src/shared/queue';
import { delay } from 'src/shared/delay';
import { Size } from 'src/shared/drivers';

async function cropImage(size: Size, img: string): Promise<string> {
  const x = img.split(',')[1];
  const j = await Jimp.read(Buffer.from(x, 'base64'));
  const { top, left, width, height } = size;
  return await j.crop(left, top, width, height).getBase64Async(Jimp.MIME_PNG);
}

async function realDownload(
  id: string,
  driver: Driver,
  ctx: { windowId: number; tabId: number },
) {
  let res = await driver.handleItem(id);
  await delay(1000);
  let img = await chrome.tabs.captureVisibleTab(ctx.windowId, {
    format: 'png',
  });
  let date = parseISO(res.detail.datetime);
  let name = format(date, 'yyyy-MM-dd HH-mm');
  const cropped = await cropImage(res.detail.size, img);
  download(cropped, name + '.png');
  await driver.closeItem();
}

export function useDownload(
  driver: Driver,
  ctx: { windowId: number; tabId: number },
) {
  const { windowId, tabId } = ctx;
  const download = useCallback(
    (id: string) => {
      return realDownload(id, driver, { windowId, tabId }).catch((e) =>
        console.error(e),
      );
    },
    [driver, windowId, tabId],
  );
  const running$ = useQueue<string>(download);
  return useCallback(
    async (id: string) => {
      return new Promise<void>((resolve, reject) => {
        const unsubscribeError = running$.fn('error', (tid) => {
          if (id === tid) {
            unsubscribeError();
            reject();
          }
        });
        const unsubscribeEnd = running$.fn('end', (tid) => {
          if (id === tid) {
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
