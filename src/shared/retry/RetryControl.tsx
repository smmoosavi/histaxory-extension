import React, { PropsWithChildren } from 'react';
import { RetryWire } from './retry-wire';
import { RetryProvider } from './RetryContext';
import { useRetryLogic } from './use-retry-logic';
import { useRetryWire } from './use-retry-wire';

interface OwnProps {
  retry$?: RetryWire;
}

export type Props = PropsWithChildren<OwnProps>;

export function RetryControl(props: Props) {
  const { children } = props;
  const retry$ = useRetryWire(props.retry$);
  useRetryLogic(retry$);
  return <RetryProvider value={retry$}>{children}</RetryProvider>;
}
