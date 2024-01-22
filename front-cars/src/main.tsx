import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from './services/apolloClient';
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ProviderRedux}  from 'react-redux' 
import dataSlice from './features/userSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const storeRedux = configureStore({
reducer: {
  dataSlice
}
})

root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ProviderRedux store={storeRedux}>
        <App />
        </ProviderRedux>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
