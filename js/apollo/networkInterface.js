import { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cj181bsf22crn0189q8au5ijj', {
  reconnect: true,
});

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj181bsf22crn0189q8au5ijj',
});

// Extend the network interface with the WebSocket
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
	networkInterface,
	wsClient
);

export default networkInterfaceWithSubscriptions;
