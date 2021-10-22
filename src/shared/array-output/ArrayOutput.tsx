import React, { Fragment, PropsWithChildren } from 'react';
import { CurrentIndexProvider } from './CurrentIndexContext';
import { CurrentItemProvider } from './CurrentItemContext';

interface OwnProps<V> {
  value: ReadonlyArray<V>;
  getKey?: (value: V, index: number) => string | number;
}

type Props<V> = PropsWithChildren<OwnProps<V>>;

const defaultGetKey = (value: any, index: number) => index;

export function ArrayOutput<V>(props: Props<V>) {
  const { value: values, children, getKey = defaultGetKey } = props;
  return (
    <Fragment>
      {values.map((value, index) => (
        <CurrentItemProvider value={value} key={getKey(value, index)}>
          <CurrentIndexProvider value={index}>{children} </CurrentIndexProvider>
        </CurrentItemProvider>
      ))}
    </Fragment>
  );
}
