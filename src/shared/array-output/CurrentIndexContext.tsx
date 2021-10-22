import React, { createContext, PropsWithChildren, useContext } from 'react';

export type CurrentIndexContextType = number | undefined;
export const CurrentIndexContext = createContext<
  CurrentIndexContextType | undefined
>(undefined);

export function useCurrentIndexContext(): CurrentIndexContextType {
  return useContext(CurrentIndexContext);
}

interface OwnProps {
  value: CurrentIndexContextType;
}

type Props = PropsWithChildren<OwnProps>;

export function CurrentIndexProvider(props: Props) {
  return (
    <CurrentIndexContext.Provider value={props.value}>
      {props.children}
    </CurrentIndexContext.Provider>
  );
}
