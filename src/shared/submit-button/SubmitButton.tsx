import React, { PropsWithChildren } from 'react';
import { BaseButton, BaseButtonProps } from 'src/shared/base-button';
import { SubmitWire } from 'src/shared/submit-wire';
import { SubmitButtonStateProvider } from './SubmitButtonStateProvider';

interface OwnProps extends Omit<BaseButtonProps, 'onClick'> {
  submit$?: SubmitWire;
}

export type Props = PropsWithChildren<OwnProps>;

export function SubmitButton(props: Props) {
  const { submit$, ...buttonProps } = props;

  return (
    <SubmitButtonStateProvider submit$={submit$}>
      <BaseButton {...buttonProps} />
    </SubmitButtonStateProvider>
  );
}
