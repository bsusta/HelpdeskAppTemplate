
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
import {withFilterNewRequested,withFilterOpenRequested,withFilterPendingRequested,withFilterClosedRequested,
  withFilterNewInbox,withFilterOpenInbox,withFilterPendingInbox,withFilterClosedInbox,
  withFilterProjectMy,withFilterProjectActive,withFilterProjectClosed} from './wrappers';
class TaskListLoader extends Component {
  constructor(props){
    super(props);
    if(this.props.projectId=='INBOX'){
      HOCNewInbox=(withFilterNewInbox(userId=this.props.loggedUserId))(TaskList);
      HOCOpenInbox=(withFilterOpenInbox(userId=this.props.loggedUserId))(TaskList);
      HOCPendingInbox=(withFilterPendingInbox(userId=this.props.loggedUserId))(TaskList);
      HOCClosedInbox=(withFilterClosedInbox(userId=this.props.loggedUserId))(TaskList);
    }
    else if(this.props.projectId=='REQUESTED'){
      HOCNewRequested=(withFilterNewRequested(userId=this.props.loggedUserId))(TaskList);
      HOCOpenRequested=(withFilterOpenRequested(userId=this.props.loggedUserId))(TaskList);
      HOCPendingRequested=(withFilterPendingRequested(userId=this.props.loggedUserId))(TaskList);
      HOCClosedRequested=(withFilterClosedRequested(userId=this.props.loggedUserId))(TaskList);
    } else{
      TabMy=withFilterProjectMy(this.props.projectId,this.props.loggedUserId)(TaskList);
      TabActive=withFilterProjectActive(this.props.projectId)(TaskList);
      TabClosed=withFilterProjectClosed(this.props.projectId)(TaskList);
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
              <Title>{I18n.t('taskListAllFolder')}</Title>
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
             <Tab tabStyle={{backgroundColor:'#2DA3EC'}} activeTabStyle={{backgroundColor:'#2DA3EC'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabNew')}>
               <HOCNewInbox projectId={null} />
             </Tab>

             <Tab tabStyle={{backgroundColor:'#68bc00'}} activeTabStyle={{backgroundColor:'#68bc00'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabOpen')}>
               <HOCOpenInbox projectId={null} />
             </Tab>

               <Tab tabStyle={{backgroundColor:'#ff9c00'}} activeTabStyle={{backgroundColor:'#ff9c00'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabPending')}>
                 <HOCPendingInbox projectId={null} />
               </Tab>

               <Tab tabStyle={{backgroundColor:'#b3b3b3'}} activeTabStyle={{backgroundColor:'#b3b3b3'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabClosed')}>
                 <HOCClosedInbox projectId={null} />
               </Tab>
           </Tabs>
        </Container>);
      }
      if(this.props.projectId=='REQUESTED'){
        return (<Container style={styles.container}>
          <Header>
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>{I18n.t('taskListRequestedFolder')}</Title>
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
             <Tab tabStyle={{backgroundColor:'#2DA3EC'}} activeTabStyle={{backgroundColor:'#2DA3EC'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabNew')}>
               <HOCNewRequested projectId={null} />
             </Tab>

             <Tab tabStyle={{backgroundColor:'#68bc00'}} activeTabStyle={{backgroundColor:'#68bc00'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabOpen')}>
               <HOCOpenRequested projectId={null} />
             </Tab>

               <Tab tabStyle={{backgroundColor:'#ff9c00'}} activeTabStyle={{backgroundColor:'#ff9c00'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabPending')}>
                 <HOCPendingRequested projectId={null} />
               </Tab>

               <Tab tabStyle={{backgroundColor:'#b3b3b3'}} activeTabStyle={{backgroundColor:'#b3b3b3'}} textStyle={{color:'white'}} heading={I18n.t('taskListTabClosed')}>
                 <HOCClosedRequested projectId={null} />
               </Tab>
           </Tabs>
        </Container>);
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
              <Title>{this.props.projectName}</Title>
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
                   <TabMy projectId={this.props.projectId}/>
                 </Tab>

                 <Tab heading={I18n.t('taskListTabActive')}>
                   <TabActive projectId={this.props.projectId}/>
                 </Tab>

                 <Tab heading={I18n.t('taskListTabClosed')}>
                   <TabClosed projectId={this.props.projectId}/>
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
