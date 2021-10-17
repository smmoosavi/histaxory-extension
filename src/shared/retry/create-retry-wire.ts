import { createWire } from '@forminator/react-wire';
import { nanoid } from 'nanoid';
import { RetryWire } from './retry-wire';

export function crateRetryWire(): RetryWire {
  return createWire(nanoid());
}
