import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import {
  ApolloClient,
  InMemoryCache,
  split, 
  HttpLink,
  ApolloProvider
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: 'https://united-parrot-18.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': "MeUZ13Sn9oenBbF4X7pCTIbxP66lrhS6Xn5y8IaO9oR3xEWjhoknVAaJ8VEXV2Je"
  }
});

const wsLink = new WebSocketLink({
  uri: 'wss://united-parrot-18.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret': "MeUZ13Sn9oenBbF4X7pCTIbxP66lrhS6Xn5y8IaO9oR3xEWjhoknVAaJ8VEXV2Je"
      }
    }
  }
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client = {client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
