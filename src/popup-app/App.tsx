import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { Suspense } from 'react';
import { MuiConfig } from 'src/core/mui';
import { MainPage } from 'src/pages/main-page';
import { ErrorBoundary } from 'src/shared/error-boundary';

export function App() {
  return (
    <I18nProvider i18n={i18n}>
      <MuiConfig>
        <ErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <MainPage />
          </Suspense>
        </ErrorBoundary>
      </MuiConfig>
    </I18nProvider>
  );
}
