import React, { createContext, PropsWithChildren, useContext } from 'react';

export type CurrentItemContextType<T> = T;
export const CurrentItemContext = createContext<
  CurrentItemContextType<any> | undefined
>(undefined);

export function useCurrentItemContext<T>(value: T): CurrentItemContextType<T> {
  const context = useContext(CurrentItemContext);
  if (value !== undefined) {
    return value;
  }
  if (context === undefined) {
    throw new Error(
      'useCurrentItemContext must be used inside the <CurrentItemContextProvider/>',
    );
  }
  return context;
}

interface OwnProps<T> {
  value: CurrentItemContextType<T>;
}

type Props<T> = PropsWithChildren<OwnProps<T>>;

export function CurrentItemProvider<T>(props: Props<T>) {
  return (
    <CurrentItemContext.Provider value={props.value}>
      {props.children}
    </CurrentItemContext.Provider>
  );
}
