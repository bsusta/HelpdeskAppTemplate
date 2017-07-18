import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import updateTaskList from './taskList';
import updateUsers from './users';
import updateCompanies from './companies';
import updateDrawer from './drawerData';
import logInUser from './user';

export default client => createStore(
	combineReducers({
  apollo: client.reducer(),
	drawer,
	cardNavigation,
	routes,
	updateTaskList,
	updateDrawer,
	logInUser,
	updateCompanies,
	updateUsers
}),
	{},
	compose(
		applyMiddleware(client.middleware()),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	)
);
