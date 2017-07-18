
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import TaskListRow from './taskListRow';
import styles from './styles';
import I18n from '../../translations/';
import {editedTasksSubscription} from './taskList.gquery';
import {ADD_TO_TASKLIST} from '../../apollo/taskList';


class TaskList extends Component {
  constructor(props){
    super(props);
    console.log(this.props.justInfo);
  }

  render() {
    if(this.props.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }

    if(!this.props.endId[this.props.projectId]){
      this.props.updateTaskList(this.props.allTasks,this.props.projectId);
    }
    console.log(this.props.projectId);
    return (
      <Container style={styles.container}>
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

        <Content>
          <List>
          {
            this.props.projectId=='INBOX'?
            this.props.taskList.filter((task)=>task.assignedUser&&task.assignedUser.id==this.props.loggedUserId).map((data) => <TaskListRow data={data} key={data.id} />)
            :
            this.props.taskList.filter((task)=>task.project.id==this.props.projectId).map((data) => <TaskListRow data={data} key={data.id} />)
          }
          </List>
          <Button transparent style={{ marginTop: 8 }} onPress={this.props.getMore}>
            <Text>Load more</Text>
          </Button>

        </Content>

        <Footer>
          <FooterTab>
            <Button
             vertical
             onPress={()=>console.log(this.props.taskList[this.props.projectId].length)}
             >
              <Icon active style={{ color: 'white' }} name="refresh" />
              <Text style={{ color: 'white' }} >{I18n.t('reload')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button vertical onPress={Actions.folderAdd}>
              <Icon active style={{ color: 'white' }} name="md-add" />
              <Text style={{ color: 'white' }} >{I18n.t('project')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button vertical onPress={Actions.taskAdd}>
              <Icon name="md-add" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >{I18n.t('task')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  taskList: state.updateTaskList.taskList,
  endId:state.updateTaskList.endId,
  loggedUserId: state.logInUser.id,
});

export default connect(mapStateToProps, bindAction)(TaskList);
