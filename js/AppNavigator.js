
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StyleProvider, variables, Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';
import { Router, Scene } from 'react-native-router-flux';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/material';
import { closeDrawer } from './actions/drawer';
import statusBarColor from './themes/variables';
import Home from './components/home/';
import SideBar from './components/sidebar';
import TaskList from './components/taskList/';
import TaskEdit from './components/taskEdit/';
import TaskAdd from './components/taskAdd/';
import Search from './components/search/';
import Settings from './components/settings/';
import Messages from './components/messages/';
import AddFolder from './components/addFolder/';
import CompaniesList from './components/companiesList/';
import UsersList from './components/usersList/';
import AddUser from './components/addUser/';
import EditUser from './components/editUser/';
import AddCompany from './components/addCompany/';
import EditCompany from './components/editCompany/';
import AddItem from './components/addItem/';
import EditItem from './components/editItem/';
import AddComment from './components/addComment/';
import AddSubtask from './components/addSubtask/';

const {
  popRoute,
} = actions;

const RouterWithRedux = connect()(Router);


class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    themeState: React.PropTypes.string,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }

  popRoute() {
    this.props.popRoute();
  }

  openDrawer() {
    this._drawer._root.open();
  }

  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }

  render() {
    return (
      <StyleProvider style={getTheme((this.props.themeState === 'material') ? material : undefined)}>
        <Drawer
          ref={(ref) => { this._drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => this.closeDrawer()}
        >
          <StatusBar
            hidden={(this.props.drawerState === 'opened' && Platform.OS === 'ios') ? true : false}
            backgroundColor={statusBarColor.statusBarColor}
          />
          <RouterWithRedux>
            <Scene key="root">
              <Scene key="home" component={Home} hideNavBar initial={true} />
              <Scene key="taskList" component={TaskList} />
              <Scene key="taskEdit" component={TaskEdit} />
              <Scene key="taskAdd" component={TaskAdd} />
              <Scene key="search" component={Search} />
              <Scene key="messages" component={Messages} />
              <Scene key="settings" component={Settings} />
              <Scene key="addFolder" component={AddFolder} />
              <Scene key="companiesList" component={CompaniesList} />
              <Scene key="usersList" component={UsersList} />
              <Scene key="addUser" component={AddUser} />
              <Scene key="editUser" component={EditUser} />
              <Scene key="addCompany" component={AddCompany} />
              <Scene key="editCompany" component={EditCompany} />
              <Scene key="addItem" component={AddItem} />
              <Scene key="editItem" component={EditItem} />
              <Scene key="addComment" component={AddComment} />
              <Scene key="addSubtask" component={AddSubtask} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
