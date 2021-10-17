import React, { createContext, PropsWithChildren, useContext } from 'react';
import { SubmitWire } from 'src/shared/submit-wire';

export type SubmitButtonContextType = SubmitWire;
export const UseSubmitButtonContext = createContext<
  SubmitButtonContextType | undefined
>(undefined);

export function useSubmitButtonContext(
  value?: SubmitButtonContextType,
): SubmitButtonContextType {
  const context = useContext(UseSubmitButtonContext);
  if (value) {
    return value;
  }
  if (context === undefined) {
    throw new Error(
      'useUseSubmitButtonContext must be used inside the <UseSubmitButtonContextProvider/>',
    );
  }
  return context;
}

interface OwnProps {
  value: SubmitButtonContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function SubmitButtonContextProvider(props: Props) {
  return (
    <UseSubmitButtonContext.Provider value={props.value}>
      {props.children}
    </UseSubmitButtonContext.Provider>
  );
}
