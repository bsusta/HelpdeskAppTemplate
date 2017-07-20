
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {inboxTasks,projectTasks,getMoreTasks} from './taskList.gquery';
import TaskList from './taskList';


class TaskListLoader extends Component {
  constructor(props){
    super(props);
    if(this.props.projectId=='INBOX'){
      const withFilterInbox = graphql(inboxTasks,{
        options:{
          variables:{
            id:this.props.loggedUserId,
            status:'Done',
            after:null,
            limit:this.props.numberOfTasks,
          },
        },
        props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
          loading,
          allTasks,
          error,
          refetch,
          subscribeToMore,
          getMore:()=>{
            fetchMore(
              {
                variables:{
                  id:this.props.loggedUserId,
                  statusId:'cj5b6hwro0m5d0161vwmgev4o',
                  after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
                  limit:this.props.numberOfTasks,
                },
                updateQuery:(previousResult,{fetchMoreResult})=>{
                  if(fetchMoreResult.allTasks.length==0){
                    return previousResult;
                  }
                  return Object.assign({},previousResult, {
                    allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
                }
              }
            )
          }
        })
      });
      HOCTaskList=withFilterInbox(TaskList);
    }
  else{
    const withFilterProject = graphql(projectTasks,{
      options:{
        variables:{
          id:this.props.projectId,
          after:null,
          limit:this.props.numberOfTasks,
        },
      },
      props: ({ data: { loading, allTasks, error, refetch, fetchMore,subscribeToMore } }) => ({
        loading,
        allTasks,
        error,
        refetch,
        subscribeToMore,
        getMore:()=>{
          fetchMore(
            {
              variables:{
                id:this.props.projectId,
                after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
                limit:this.props.numberOfTasks,
              },
              updateQuery:(previousResult,{fetchMoreResult})=>{
                if(fetchMoreResult.allTasks.length==0){
                  return previousResult;
                }
                return Object.assign({},previousResult, {
                  allTasks: [...previousResult.allTasks, ...fetchMoreResult.allTasks]});
              }
            }
          )
        }
      })
    });
    HOCTaskList=withFilterProject(TaskList);
    }
  }
  render() {
      return (
        <HOCTaskList projectId={this.props.projectId} projectName={this.props.projectName}/>
      );
  }
}

function bindAction(dispatch) {
  return {
    updateTaskList: (taskList,projectID) => dispatch({type:ADD_TO_TASKLIST,taskList,projectID}),
  };
}

const mapStateToProps = state => ({
  themeState: state.drawer.themeState,
  loggedUserId: state.logInUser.id,
  numberOfTasks: state.updateTaskList.numberOfTasks,
});

export default connect(mapStateToProps, bindAction)(TaskListLoader);
