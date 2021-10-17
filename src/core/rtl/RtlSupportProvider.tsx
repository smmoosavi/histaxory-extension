import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { Direction } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [(...args) => rtlPlugin(...args) ?? undefined],
  prepend: true,
});
const cacheLtr = createCache({
  key: 'mui',
  prepend: true,
});

interface OwnProps {
  direction: Direction;
}

type Props = PropsWithChildren<OwnProps>;

export function RtlSupportProvider(props: Props) {
  const { direction } = props;
  const cache = direction === 'rtl' ? cacheRtl : cacheLtr;
  return <CacheProvider value={cache}>{props.children}</CacheProvider>;
}
