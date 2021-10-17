import { useFn } from '@forminator/react-wire';
import { PropsWithChildren } from 'react';
import { useRetryContext } from './RetryContext';

interface OwnProps {
  retry: () => unknown;
}

export type Props = PropsWithChildren<OwnProps>;

export function Retry(props: Props) {
  const retry$ = useRetryContext();
  useFn(retry$, 'retry', props.retry);
  return null;
}
