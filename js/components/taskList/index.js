
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {inboxTasks} from './taskList.gquery';
import TaskList from './taskList';

class TaskListLoader extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
  }
  render() {
      if(this.props.projectId='INBOX'){
        const withFilterInbox = graphql(inboxTasks,{
          options:{
          props: ({ data: { loading, allTasks, error, refetch, subscribeToMore } }) => ({
            loading,
            tasks:allTasks,
            error,
            refetch,
            subscribeToMore,
          })
        }});
        const HOCTaskList=withFilterInbox(TaskList);
        return (
          <HOCTaskList projectId={this.props.projectId}/>
        );
      }
      return (
        <TaskList/>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  loggedUserId: state.logInUser.id,
});

export default connect(mapStateToProps, bindAction)(TaskListLoader);
