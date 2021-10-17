import { Wire } from '@forminator/react-wire';

export interface RetryWireFns {
  retry: () => void;
}

export type RetryWire = Wire<string, RetryWireFns>;
