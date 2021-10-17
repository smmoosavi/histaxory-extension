import React, { PropsWithChildren } from 'react';
import { BaseIconButton, BaseIconButtonProps } from 'src/shared/base-button';
import { SubmitWire } from 'src/shared/submit-wire';
import { SubmitButtonStateProvider } from './SubmitButtonStateProvider';

interface OwnProps extends Omit<BaseIconButtonProps, 'onClick'> {
  submit$?: SubmitWire;
}

export type Props = PropsWithChildren<OwnProps>;

export function SubmitIconButton(props: Props) {
  const { submit$, ...buttonProps } = props;

  return (
    <SubmitButtonStateProvider submit$={submit$}>
      <BaseIconButton {...buttonProps} />
    </SubmitButtonStateProvider>
  );
}
