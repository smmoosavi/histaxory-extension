import { useButtonDisabledContext } from './ButtonDisabledContext';
import { useButtonLoadingContext } from './ButtonLoadingContext';
import { useButtonOnClickContext } from './ButtonOnClickContext';

export function useButtonState() {
  const onClick = useButtonOnClickContext();
  const loading = useButtonLoadingContext();
  const disabled = useButtonDisabledContext();
  return {
    onClick,
    loading,
    disabled,
  };
}
