import { useWire } from '@forminator/react-wire';
import { SubmitWire } from './submit-wire';

export function useSubmitWire(
  wire?: SubmitWire | null | undefined,
  initialValue: boolean = false,
): SubmitWire {
  return useWire(wire, initialValue);
}
