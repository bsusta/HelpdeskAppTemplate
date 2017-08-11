import { combineReducers } from 'redux';

import drawer from './drawer';
import routes from './routes';
import cardNavigation from './cardNavigation';
import updateTaskList from './taskList';
import updateUsers from './users';
import updateCompanies from './companies';
import updateDrawer from './drawerData';
import logInUser from './user';
import statuses from './statuses';


export default combineReducers({
  apollo: client.reducer(),
  drawer,
  cardNavigation,
  routes,
  updateTaskList,
  updateDrawer,
  logInUser,
  updateCompanies,
  updateUsers,
  statuses,
});
