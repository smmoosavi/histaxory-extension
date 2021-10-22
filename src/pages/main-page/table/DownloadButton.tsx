import { useContent } from '@ctablex/core';
import { t } from '@lingui/macro';
import DownloadIcon from '@mui/icons-material/Download';
import React, { PropsWithChildren, useCallback } from 'react';
import { SubmitIconButton } from 'src/shared/submit-button';
import { useSubmit, useSubmitWire } from 'src/shared/submit-wire';

interface OwnProps {
  download: (id: string) => Promise<void>;
}

export type Props = PropsWithChildren<OwnProps>;

export function DownloadButton(props: Props) {
  const submit$ = useSubmitWire();
  const { download } = props;
  const id = useContent<string>();
  useSubmit(
    submit$,
    useCallback(() => {
      return download(id);
    }, [id, download]),
  );

  return (
    <SubmitIconButton submit$={submit$} size="small" title={t`Download`}>
      <DownloadIcon />
    </SubmitIconButton>
  );
}
