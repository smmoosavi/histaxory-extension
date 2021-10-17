import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ButtonOnClickContextType = (() => void) | undefined;
export const ButtonOnClickContext =
  createContext<ButtonOnClickContextType>(undefined);

export function useButtonOnClickContext(): ButtonOnClickContextType {
  return useContext(ButtonOnClickContext);
}

interface OwnProps {
  value: ButtonOnClickContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function ButtonOnClickContextProvider(props: Props) {
  return (
    <ButtonOnClickContext.Provider value={props.value}>
      {props.children}
    </ButtonOnClickContext.Provider>
  );
}
