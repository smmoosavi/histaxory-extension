import { useCallback } from 'react';
import { useQueue } from 'src/shared/queue';
import { delay } from 'src/shared/delay';

async function realDownload(id: string) {
  console.log('real download start', id);
  await delay(2000);
  console.log('real download end', id);
}

export function useDownload() {
  const running$ = useQueue<string>(realDownload);
  return useCallback(
    async (id: string) => {
      return new Promise<void>((resolve) => {
        const unsubscribe = running$.fn('end', (tid) => {
          console.log('end', tid, 'form ', id);
          if (id === tid) {
            console.log('done');
            unsubscribe();
            resolve();
          }
        });
        running$.fns.push(id);
      });
    },
    [running$],
  );
}
