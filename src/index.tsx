import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts/fonts.css';
import './ui/common.css';
import './ui/box-model.css';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import App from './app/app';
import { store } from './services/store';
// import ErrorPop

Sentry.init({
  dsn: 'https://5b896f5e6a29476ab5d97830abe3d544@o1127696.ingest.sentry.io/6631914',
  integrations: [new BrowserTracing()],
  debug: true,
  attachStacktrace: true,
  autoSessionTracking: true,
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Sentry.ErrorBoundary
        fallback={({ error, componentStack, resetError }) => {
          console.dir(error);
          console.dir(componentStack);
          return (
            <div>
              {error.toString()}
            </div>
          );
        }}>
        <App />
      </Sentry.ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
