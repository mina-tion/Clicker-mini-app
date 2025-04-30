import * as Sentry from '@sentry/react';
import { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorFallback } from '../ErrorFallback/ErrorFallback';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  eventId: string | undefined | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidMount() {
    window.addEventListener('error', this.handleGlobalError);
    window.addEventListener(
      'unhandledrejection',
      this.handleGlobalPromiseRejection
    );
  }

  componentWillUnmount() {
    window.removeEventListener('error', this.handleGlobalError);
    window.removeEventListener(
      'unhandledrejection',
      this.handleGlobalPromiseRejection
    );
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const extraInfo = { componentStack: errorInfo.componentStack };

    const eventId = Sentry.captureException(error, { extra: extraInfo });
    this.setState({ hasError: true, eventId });

    console.error('An error occurred:', error, errorInfo);
  }

  handleGlobalError = (event: ErrorEvent) => {
    Sentry.captureException(event.error || new Error(event.message));
    event.preventDefault();
    this.setState({ hasError: true, eventId: Sentry.lastEventId() });
  };

  handleGlobalPromiseRejection = (event: PromiseRejectionEvent) => {
    Sentry.captureException(event.reason);
    if (
      event.reason &&
      event.reason.message &&
      this.isWebSocketError(event.reason.message)
    ) {
      console.warn('WebSocket error ignored:', event.reason);

      return;
    }
    event.preventDefault();
    this.setState({ hasError: true, eventId: Sentry.lastEventId() });
  };

  isWebSocketError = (message: string): boolean => {
    const webSocketErrorPhrases = [
      'WebSocket',
      'connection failed',
      'websocket connection failed',
      'WebSocket connection',
      'WebSocket connection failed',
      'WebSocket Error',
    ];

    return webSocketErrorPhrases.some((phrase) => message.includes(phrase));
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorFallback />; 
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
