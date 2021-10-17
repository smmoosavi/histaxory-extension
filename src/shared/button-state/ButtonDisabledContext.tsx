import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ButtonDisabledContextType = boolean;
export const ButtonDisabledContext =
  createContext<ButtonDisabledContextType>(false);

export function useButtonDisabledContext(
  value?: ButtonDisabledContextType,
): ButtonDisabledContextType {
  const context = useContext(ButtonDisabledContext);
  if (value) {
    return true;
  }
  return context;
}

interface OwnProps {
  value: ButtonDisabledContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ButtonDisabledContextProvider(props: Props) {
  return (
    <ButtonDisabledContext.Provider value={props.value}>
      {props.children}
    </ButtonDisabledContext.Provider>
  );
}
