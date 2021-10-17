import { useFn } from '@forminator/react-wire';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';
import { RetryWire } from './retry-wire';

/**
 * This hook should be used in one place for each wire. The best position for using this hook is the near root with no uplink, e.g., in error boundary.
 * @param wire
 */
export function useRetryLogic(wire: RetryWire) {
  const retry = useCallback(() => {
    wire.setValue(nanoid());
  }, [wire]);
  useFn(wire, 'retry', retry);
}
