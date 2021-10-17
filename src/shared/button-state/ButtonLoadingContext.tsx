import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ButtonLoadingContextType = boolean;
export const ButtonLoadingContext =
  createContext<ButtonLoadingContextType>(false);

export function useButtonLoadingContext(
  value?: ButtonLoadingContextType,
): ButtonLoadingContextType {
  const context = useContext(ButtonLoadingContext);
  if (value) {
    return true;
  }
  return context;
}

interface OwnProps {
  value: ButtonLoadingContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ButtonLoadingContextProvider(props: Props) {
  return (
    <ButtonLoadingContext.Provider value={props.value}>
      {props.children}
    </ButtonLoadingContext.Provider>
  );
}
