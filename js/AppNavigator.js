
import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import { StyleProvider, Drawer } from 'native-base';
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
import FolderAdd from './components/folderAdd/';
import FolderEdit from './components/folderEdit/';
import CompaniesList from './components/companiesList/';
import UsersList from './components/usersList/';
import UserAdd from './components/userAdd/';
import UserEdit from './components/userEdit/';
import CompanyAdd from './components/companyAdd/';
import CompanyEdit from './components/companyEdit/';
import ItemAdd from './components/itemAdd/';
import ItemEdit from './components/itemEdit/';
import CommentAdd from './components/commentAdd/';
import SubtaskAdd from './components/subtaskAdd/';
import ProjectsList from './components/projectsList/';

const RouterWithRedux = connect()(Router);


class AppNavigator extends Component {

  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer._root.close();
    }
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
            <Scene key="folderAdd" component={FolderAdd} />
            <Scene key="folderEdit" component={FolderEdit} />
            <Scene key="companiesList" component={CompaniesList} />
            <Scene key="usersList" component={UsersList} />
            <Scene key="userAdd" component={UserAdd} />
            <Scene key="userEdit" component={UserEdit} />
            <Scene key="companyAdd" component={CompanyAdd} />
            <Scene key="companyEdit" component={CompanyEdit} />
            <Scene key="itemAdd" component={ItemAdd} />
            <Scene key="itemEdit" component={ItemEdit} />
            <Scene key="commentAdd" component={CommentAdd} />
            <Scene key="subtaskAdd" component={SubtaskAdd} />
            <Scene key="projectsList" component={ProjectsList} />
            </Scene>
          </RouterWithRedux>
        </Drawer>
      </StyleProvider>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  themeState: state.drawer.themeState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
