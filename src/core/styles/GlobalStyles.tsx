import {
  GlobalStyles as MuiGlobalStyles,
  GlobalStylesProps,
  useTheme,
} from '@mui/material';
import { PropsWithChildren, useEffect } from 'react';

interface OwnProps {}

type Props = PropsWithChildren<OwnProps>;

export function GlobalStyles(props: Props) {
  const theme = useTheme();
  const { direction } = theme;

  // Material-UI read dir attribute of body, so we should set that value
  useEffect(() => {
    document.body.setAttribute('dir', direction === 'rtl' ? 'rtl' : 'ltr');
  }, [direction]);

  return <MuiGlobalStyles styles={styles} />;
}

const styles: GlobalStylesProps['styles'] = {
  body: {
    fontSize: '0.875rem',
  },
};
