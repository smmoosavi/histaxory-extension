import { Styles, StylesKey } from './types';

export function createStyles<S extends Styles<string>>(
  styles: S,
): Styles<StylesKey<S>> {
  return styles;
}
