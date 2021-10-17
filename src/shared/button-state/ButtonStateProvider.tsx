import React, { PropsWithChildren } from 'react';
import {
  ButtonOnClickContextType,
  ButtonOnClickContextProvider,
} from './ButtonOnClickContext';
import {
  ButtonLoadingContextType,
  ButtonLoadingContextProvider,
} from './ButtonLoadingContext';
import {
  ButtonDisabledContextType,
  ButtonDisabledContextProvider,
} from './ButtonDisabledContext';

interface OwnProps {
  loading?: ButtonLoadingContextType;
  disabled?: ButtonDisabledContextType;
  onClick?: ButtonOnClickContextType;
}

export type Props = PropsWithChildren<OwnProps>;

export function ButtonStateProvider(props: Props) {
  const { onClick, loading = false, disabled = false, children } = props;
  return (
    <ButtonOnClickContextProvider value={onClick}>
      <ButtonLoadingContextProvider value={loading}>
        <ButtonDisabledContextProvider value={disabled}>
          {children}
        </ButtonDisabledContextProvider>
      </ButtonLoadingContextProvider>
    </ButtonOnClickContextProvider>
  );
}
