import { i18n } from '@lingui/core';
import { t } from '@lingui/macro';
import { I18nProvider } from '@lingui/react';
import { Suspense } from 'react';
import { MuiConfig } from 'src/core/mui';
import { ErrorBoundary } from 'src/shared/error-boundary';

export function App() {
  return (
    <I18nProvider i18n={i18n}>
      <MuiConfig>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>{t`histaxory`}</Suspense>
        </ErrorBoundary>
      </MuiConfig>
    </I18nProvider>
  );
}
