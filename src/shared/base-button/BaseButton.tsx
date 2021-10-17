import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import React, { PropsWithChildren } from 'react';
import {
  useButtonDisabledContext,
  useButtonLoadingContext,
  useButtonOnClickContext,
} from 'src/shared/button-state';

interface OwnProps extends Omit<LoadingButtonProps, 'onClick'> {
  loading?: boolean;
  disabled?: boolean;
}

export type Props = PropsWithChildren<OwnProps>;

export function BaseButton(props: Props) {
  const { children, ...buttonProps } = props;
  const loading = useButtonLoadingContext(props.loading);
  const disabled = useButtonDisabledContext(props.disabled);
  const onClick = useButtonOnClickContext();

  return (
    <LoadingButton
      {...buttonProps}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
}
