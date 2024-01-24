import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apolloClient';
import { Provider as ReduxProvider } from 'react-redux';
import { store as storeRedux } from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ReduxProvider store={storeRedux}>
          <App />
        </ReduxProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
