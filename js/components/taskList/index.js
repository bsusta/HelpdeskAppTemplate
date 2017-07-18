
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {inboxTasks,projectTasks,getMoreTasks} from './taskList.gquery';
import TaskList from './taskList';
import {ADD_TO_TASKLIST} from '../../apollo/taskList';


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
            limit:this.props.taskList.some((task)=>task.project.id==this.props.projectId)?0:3,
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
                  status:'Done',
                  after:this.props.endId[this.props.projectId],
                  limit:3,
                },
                updateQuery:(previousResult,{fetchMoreResult})=>{
                  if(fetchMoreResult){
                    this.props.updateTaskList(fetchMoreResult.allTasks,this.props.projectId);
                  }
                    return previousResult;
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
          limit:this.props.taskList.some((task)=>task.project.id==this.props.projectId)?0:3,
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
                after:this.props.endId[this.props.projectId],
                limit:3,
              },
              updateQuery:(previousResult,{fetchMoreResult})=>{
                if(fetchMoreResult){
                  this.props.updateTaskList(fetchMoreResult.allTasks,this.props.projectId);
                }
                  return previousResult;
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
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    updateTaskList: (taskList,projectID) => dispatch({type:ADD_TO_TASKLIST,taskList,projectID}),
  };
}

const mapStateToProps = state => ({
  themeState: state.drawer.themeState,
  loggedUserId: state.logInUser.id,
  taskList: state.updateTaskList.taskList,
  endId: state.updateTaskList.endId,
});

export default connect(mapStateToProps, bindAction)(TaskListLoader);
