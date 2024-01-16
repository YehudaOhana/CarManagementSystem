import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider as JotaiProvider } from 'jotai';
import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apolloClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <JotaiProvider>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </JotaiProvider>
    </BrowserRouter>
  </StrictMode>
);
