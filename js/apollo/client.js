import ApolloClient, { addTypename } from 'apollo-client';

import networkInterface from './networkInterface';

export default new ApolloClient({
  networkInterface,
  addTypename: true,
  queryTransformer: addTypename,
  queryDeduplication: false,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      return result.__typename + result.id;
    }
    return null;
  },
});
