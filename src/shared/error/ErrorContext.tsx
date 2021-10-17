import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ErrorContextType = Error;
export const ErrorContext = createContext<ErrorContextType | undefined>(
  undefined,
);

export function useErrorContext(): ErrorContextType {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error(
      'useErrorContext must be used inside the <ErrorContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: ErrorContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ErrorProvider(props: Props) {
  return (
    <ErrorContext.Provider value={props.value}>
      {props.children}
    </ErrorContext.Provider>
  );
}
