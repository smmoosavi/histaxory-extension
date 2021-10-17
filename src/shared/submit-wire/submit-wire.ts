import { Wire } from '@forminator/react-wire';

export interface SubmitWireFns {
  submit: () => void;
  startLoading: () => void;
  stopLoading: () => void;
}

export type SubmitWire = Wire<boolean, SubmitWireFns>;
