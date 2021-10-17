import React, { createContext, PropsWithChildren, useContext } from 'react';
import { RetryWire } from './retry-wire';

export type RetryContextType = RetryWire;
export const RetryContext = createContext<RetryContextType | undefined>(
  undefined,
);

export function useRetryContext(): RetryContextType {
  const context = useContext(RetryContext);
  if (context === undefined) {
    throw new Error(
      'useRetryContext must be used inside the <RetryContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: RetryContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function RetryProvider(props: Props) {
  return (
    <RetryContext.Provider value={props.value}>
      {props.children}
    </RetryContext.Provider>
  );
}
