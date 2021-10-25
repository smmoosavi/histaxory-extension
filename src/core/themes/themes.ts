import {
  createTheme as createMuiTheme,
  Direction,
  PaletteMode,
  PaletteOptions,
  Theme,
  ThemeOptions,
} from '@mui/material';
import { activeLocale } from 'src/domains/locale';

declare module '@mui/material/styles' {
  interface DefaultTheme extends Theme {}
}

export function getThemeOptions(
  base: ThemeOptions,
  direction: Direction,
  paletteMode: PaletteMode,
  palette?: Partial<PaletteOptions>,
) {
  const themeOptions: ThemeOptions = {
    ...base,
    direction,
    palette: {
      mode: paletteMode,
      ...palette,
    },
  };
  return themeOptions;
}

const TAPSI_COLOR = '#f95921';
const SNAPP_COLOR = '#00d170';

const baseThemeOptions: ThemeOptions = {};
const customizedPalette: Partial<PaletteOptions> = {
  background: {},
  primary: {
    main: TAPSI_COLOR,
  },
  secondary: {
    main: SNAPP_COLOR,
  },
};

export interface CustomThemeOptions {
  direction: Direction;
  paletteMode: PaletteMode;
}

export const createTheme = (options: CustomThemeOptions) =>
  createMuiTheme(
    getThemeOptions(
      baseThemeOptions,
      options.direction,
      options.paletteMode,
      customizedPalette,
    ),
  );

export const rtlTheme = createTheme({ direction: 'rtl', paletteMode: 'light' });
export const ltrTheme = createTheme({ direction: 'ltr', paletteMode: 'light' });
export const darkRtlTheme = createTheme({
  direction: 'rtl',
  paletteMode: 'dark',
});
export const darkLtrTheme = createTheme({
  direction: 'ltr',
  paletteMode: 'dark',
});

export const activeTheme =
  activeLocale.language.direction === 'rtl' ? rtlTheme : ltrTheme;
export const darkActiveTheme =
  activeLocale.language.direction === 'rtl' ? darkRtlTheme : darkLtrTheme;
