import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import updateTaskList from './taskList';

export default client => createStore(
	combineReducers({
  apollo: client.reducer(),
	drawer,
	cardNavigation,
	routes,
	updateTaskList
}),
	{},
	compose(
		applyMiddleware(client.middleware()),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)
);
