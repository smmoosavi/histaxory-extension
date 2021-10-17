import { useWireValue } from '@forminator/react-wire';
import React, { PropsWithChildren, useCallback } from 'react';
import { ButtonStateProvider, useButtonState } from 'src/shared/button-state';
import { SubmitWire, useSubmitWireLogic } from 'src/shared/submit-wire';
import { useSubmitButtonContext } from './SubmitButtonContext';

interface OwnProps {
  submit$?: SubmitWire;
}

export type Props = PropsWithChildren<OwnProps>;

export function SubmitButtonStateProvider(props: Props) {
  const { children } = props;
  const submit$ = useSubmitButtonContext(props.submit$);
  useSubmitWireLogic(submit$);
  const onSubmit = useCallback(() => {
    submit$.fns.submit();
  }, [submit$]);
  const loading = useWireValue(submit$);
  const state = useButtonState();
  const disabled = loading;
  return (
    <ButtonStateProvider
      {...state}
      onClick={onSubmit}
      loading={loading}
      disabled={disabled}
    >
      {children}
    </ButtonStateProvider>
  );
}
