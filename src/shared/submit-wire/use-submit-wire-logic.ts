import { useFn } from '@forminator/react-wire';
import { useCallback } from 'react';
import { SubmitWire } from './submit-wire';

/**
 * this hook should be used in one place for each wire. the best position for using this hook is near loading component, e.g. in submit button component.
 * @param wire
 */
export function useSubmitWireLogic(wire: SubmitWire) {
  const onStartLoading = useCallback(() => {
    wire.setValue(true);
  }, [wire]);
  const onStopLoading = useCallback(() => {
    wire.setValue(false);
  }, [wire]);

  useFn(wire, 'startLoading', onStartLoading);
  useFn(wire, 'stopLoading', onStopLoading);
}
