import { useWire } from '@forminator/react-wire';
import { nanoid } from 'nanoid';
import { RetryWire } from './retry-wire';

export function useRetryWire(wire?: RetryWire): RetryWire {
  return useWire(wire, () => nanoid());
}
