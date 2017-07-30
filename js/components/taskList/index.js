
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header,Tabs,Tab, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {inboxTasks,closedProjectTasks,activeProjectTasks,myProjectTasks,getMoreTasks} from './taskList.gquery';
import TaskList from './taskList';
import styles from './styles';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import I18n from '../../translations/';

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
            limit:10,
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
                  limit:10,
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
      HOCInbox=withFilterInbox(TaskList);
    }
    else{
      const withFilterProjectActive = graphql(activeProjectTasks,{
        options:{
          variables:{
            id:this.props.projectId,
            after:null,
            limit:10,
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
                  limit:10,
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
      const withFilterProjectMy = graphql(myProjectTasks,{
        options:{
          variables:{
            id:this.props.projectId,
            userId:this.props.loggedUserId,
            after:null,
            limit:10,
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
                  userId:this.props.loggedUserId,
                  limit:10,
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
      const withFilterProjectClosed = graphql(closedProjectTasks,{
        options:{
          variables:{
            id:this.props.projectId,
            after:null,
            limit:10,
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
                  limit:10,
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
      TabMy=withFilterProjectMy(TaskList);
      TabActive=withFilterProjectActive(TaskList);
      TabClosed=withFilterProjectClosed(TaskList);
      }
    }

  render() {
      if(this.props.projectId=='INBOX'){
        return (<Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.projectId=='INBOX'?I18n.t('taskListAllFolder'):this.props.projectName}</Title>
            </Body>
            <Right>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.search}>
                <Icon name="search" style={{ color: 'white' }} />
              </Button>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.messages}>
                <Icon name="mail" style={{ color: 'white' }} />
              </Button>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
                <Icon name="settings" style={{ color: 'white' }} />
              </Button>
            </Right>
          </Header>
        <HOCInbox projectId={this.props.projectId} projectName={this.props.projectName}/>
        </Container>)
      }
      return (
        <Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{this.props.projectId==null?I18n.t('taskListAllFolder'):this.props.projectName}</Title>
            </Body>
            <Right>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.search}>
                <Icon name="search" style={{ color: 'white' }} />
              </Button>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.messages}>
                <Icon name="mail" style={{ color: 'white' }} />
              </Button>
              <Button transparent style={{ marginTop: 8 }} onPress={Actions.settings}>
                <Icon name="settings" style={{ color: 'white' }} />
              </Button>
            </Right>
          </Header>

             <Tabs>
                 <Tab heading={I18n.t('taskListTabMy')}>
                   <TabMy projectId={this.props.projectId} projectName={this.props.projectName}/>
                 </Tab>

                 <Tab heading={I18n.t('taskListTabActive')}>
                   <TabActive projectId={this.props.projectId} projectName={this.props.projectName}/>
                 </Tab>

                 <Tab heading={I18n.t('taskListTabClosed')}>
                   <TabClosed projectId={this.props.projectId} projectName={this.props.projectName}/>
                 </Tab>
             </Tabs>
        </Container>
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
  themeState: state.drawer.themeState,
  loggedUserId: state.logInUser.id,
});

export default connect(mapStateToProps, bindAction)(TaskListLoader);
