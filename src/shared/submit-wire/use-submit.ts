import { useFn } from '@forminator/react-wire';
import { useCallback } from 'react';
import { SubmitWire } from './submit-wire';

export function useSubmit(
  wire: SubmitWire,
  onSubmit: () => void | Promise<unknown>,
) {
  useFn(
    wire,
    'submit',
    useCallback(() => {
      const promise = onSubmit();
      if (promise) {
        wire.fns.startLoading();
        promise
          .catch(() => {})
          .finally(() => {
            wire.fns.stopLoading();
          });
      }
    }, [wire, onSubmit]),
  );
}
