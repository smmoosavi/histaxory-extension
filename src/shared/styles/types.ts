import { Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export type Styles<K extends string> = Record<K, SxProps<Theme>>;
export type StylesKey<S extends Styles<string>> = S extends Styles<infer K>
  ? K
  : never;
