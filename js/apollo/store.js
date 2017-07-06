import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import updateTaskList from './taskList';
import updateDrawer from './drawerData';

export default client => createStore(
	combineReducers({
  apollo: client.reducer(),
	drawer,
	cardNavigation,
	routes,
	updateTaskList,
	updateDrawer
}),
	{},
	compose(
		applyMiddleware(client.middleware()),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)
);
