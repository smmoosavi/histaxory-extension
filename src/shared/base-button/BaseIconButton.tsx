import { CircularProgress, IconButton, IconButtonProps } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import {
  useButtonDisabledContext,
  useButtonLoadingContext,
  useButtonOnClickContext,
} from 'src/shared/button-state';

interface OwnProps extends Omit<IconButtonProps, 'onClick'> {
  loading?: boolean;
  disabled?: boolean;
}

export type Props = PropsWithChildren<OwnProps>;

export function BaseIconButton(props: Props) {
  const { children, ...buttonProps } = props;
  const loading = useButtonLoadingContext(props.loading);
  const disabled = useButtonDisabledContext(props.disabled);
  const onClick = useButtonOnClickContext();

  return (
    <IconButton {...buttonProps} onClick={onClick} disabled={disabled}>
      {loading ? <CircularProgress size="1em" color="inherit" /> : children}
    </IconButton>
  );
}
