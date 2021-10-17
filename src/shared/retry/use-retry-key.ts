import { useWireValue } from '@forminator/react-wire';
import { useRetryContext } from './RetryContext';

export function useRetryKey() {
  return useWireValue(useRetryContext());
}
