import { AsyncStorage } from 'react-native';

export const addTokenInMiddleware = (client, token) => {
  if (typeof client.networkInterface.use === 'function') {
    client.networkInterface.use(
      [
        {
          applyMiddleware(req, next) {
            req.options.headers = {
              ...req.options.headers,
              authorization: token ? `Bearer ${token}` : null
            };
            next();
          }
        }
      ]
		);
  } else {
		// mock interface
    client.networkInterface.__accessToken = token;
  }
};

export const removeTokenInMiddleware = (client) => {
  if (typeof client.networkInterface.use === 'function') {
    client.networkInterface.use(
      [
        {
          applyMiddleware(req, next) {
            if (typeof req.options.headers === 'object') {
              delete req.options.headers.authorization;
            }
            next();
          }
        }
      ]
		);
  } else {
    client.networkInterface.__accessToken = null;
  }
};

export const storeTokenToAsyncStorage = (token) =>
  AsyncStorage.setItem('lansystem-graphcool-token',token);

export const removeTokenFromAsyncStorage = () =>
  AsyncStorage.multiRemove(['lansystem-graphcool-token']);

export const addTokenToUse = (client, token) => {
  addTokenInMiddleware(client, token);
  storeTokenToAsyncStorage(token);
};

export const removeTokenFromUse = (client) => {
  removeTokenInMiddleware(client);
  removeTokenFromAsyncStorage();
};
