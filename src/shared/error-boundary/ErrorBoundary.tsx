import React, { ErrorInfo, ReactNode } from 'react';

import { ErrorProvider } from 'src/shared/error';
import {
  crateRetryWire,
  Retry,
  RetryControl,
  RetryWire,
} from 'src/shared/retry';

interface Props {
  fallback: ReactNode;
}

interface State {
  error: Error | null;
  retry$: RetryWire;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null, retry$: crateRetryWire() };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  private retry = () => {
    this.setState({ error: null });
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <RetryControl retry$={this.state.retry$}>
          <Retry retry={this.retry} />
          <ErrorProvider value={this.state.error}>
            {this.props.fallback}
          </ErrorProvider>
        </RetryControl>
      );
    }

    return (
      <RetryControl retry$={this.state.retry$}>
        {this.props.children}
      </RetryControl>
    );
  }
}
