import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { RtlSupportProvider } from 'src/core/rtl';
import { GlobalStyles } from 'src/core/styles';
import { activeTheme } from 'src/core/themes';

interface OwnProps {}

export type Props = PropsWithChildren<OwnProps>;

export function MuiConfig(props: Props) {
  const { children } = props;
  return (
    <RtlSupportProvider direction={activeTheme.direction}>
      <ThemeProvider theme={activeTheme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </RtlSupportProvider>
  );
}
