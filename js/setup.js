
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import App from './App';

import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import createStore from './apollo/store';

function setup():React.Component {
  const store = createStore(client);
  class Root extends Component {
    render() {
      return (
        <ApolloProvider
          client={ client }
          store={ store }
        >
          <App />
        </ApolloProvider>
      );
    }
  }

  return Root;
}

export default setup;
