import { Defined, useFn, useWire, Wire } from '@forminator/react-wire';
import { useCallback } from 'react';

export type QueueFn<T> = {
  push: (id: T) => void;
  start: (id: T) => void;
  end: (id: T) => void;
};

export type QueueWire<T> = Wire<T | null, QueueFn<T>>;

export function useQueue<T>(process: (id: T) => Promise<void>): QueueWire<T> {
  const queue$ = useWire<T[]>(null, []);
  const running$: QueueWire<T> = useWire<T | null, QueueFn<T>>(null, null);
  useFn(
    running$,
    'push',
    useCallback(
      (id: T) => {
        const popAndRun = async () => {
          const r = running$.getValue();
          if (r !== null) {
            return;
          }
          let q = queue$.getValue();
          if (q.length === 0) {
            return;
          }
          const [c, ...rest] = q;
          console.log('pop', c, rest);
          queue$.setValue(rest);
          running$.setValue(c as Defined<T>);
          running$.fns.start(c);
          await process(c);
          running$.fns.end(c);
          running$.setValue(null);
          Promise.resolve().then(() => popAndRun());
        };

        let q = queue$.getValue();
        q = [...q, id];
        console.log('push', q);
        queue$.setValue(q);
        Promise.resolve().then(() => popAndRun());
      },
      [process, queue$, running$],
    ),
  );
  return running$;
}
