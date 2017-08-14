
import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Title ,Header, Body, Content, Text, List, ListItem, Icon, Container, Left, Right, Badge, Button, View, StyleProvider, getTheme, variables } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withApollo,graphql } from 'react-apollo';
import { ActivityIndicator } from 'react-native';

import material from '../../../native-base-theme/variables/material';
import { changePlatform, changeMaterial, closeDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';
import I18n from '../../translations/';
import {projects,editedTasksSubscription,editedProjectsSubscription} from './sidebar.gquery';


const withProjects = graphql(projects, {
  props: ({ data: { loading, allProjects, error, refetch, subscribeToMore } }) => ({
    loadingProjects: loading,
    projectList: allProjects,
    projectsError: error,
    refetchProjects:refetch,
    subscribeToMoreProjects:subscribeToMore,
  }),
});


class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  componentDidMount(){
    this.props.subscribeToMoreProjects({
      document: editedProjectsSubscription,
      updateQuery: () => {
        this.props.refetchProjects();
        return;
      },
    });
    this.props.subscribeToMoreProjects({
      document: editedTasksSubscription,
      updateQuery: () => {
        this.props.refetchProjects();
        return;
      },
    });
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    if(this.props.loadingProjects){
      return <ActivityIndicator
      animating size={ 'large' }
      color='#007299' />
    }
    let countAll=0;
    let countRequested=0;
    this.props.projectList.map((project)=>{
      project.tasks.map((task)=>{
        if(task.assignedUser&&task.assignedUser.id==this.props.loggedUserId){
          countAll++;
        }
        if(task.requester&&task.requester.id==this.props.loggedUserId){
          countRequested++;
        }
      });
    });
    let all={
      title:I18n.t('taskListAllFolder'),
      id:'INBOX',
      tasks: new Array(countAll),
    }
    let requested={
      title:I18n.t('taskListRequestedFolder'),
      id:'REQUESTED',
      tasks: new Array(countRequested),
    }
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: '#fff', top: -1 }}
        >
        <Header>
          <Body>
            <Title>{I18n.t('appName')}</Title>
          </Body>
          <Right />
        </Header>
          <List
            dataArray={[all,requested].concat(this.props.projectList)} renderRow={data =>
              <ListItem button noBorder onPress={() => {this.props.closeDrawer(),Actions.taskList({projectId:data.id,projectName:data.title})}} >
                <Left>
                  <Icon active name={data.id=='REQUESTED'||data.id=='INBOX'?'ios-color-filter-outline':'ios-folder-outline'} style={{ color: '#777', fontSize: 26, width: 30 }} />
                  <Text style={styles.text}>{data.title}</Text>
                </Left>
                {(data.tasks.length>0) &&
                <Right style={{ flex: 1 }}>
                  <Badge
                    style={{ borderRadius: 3, height: 25, backgroundColor: '#477EEA' }}
                  >
                    <Text style={styles.badgeText}>{data.tasks.length.toString()}</Text>
                  </Badge>
                </Right>
                }
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    closeDrawer: () => dispatch(closeDrawer()),
    changePlatform: () => dispatch(changePlatform()),
    changeMaterial: () => dispatch(changeMaterial()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  loggedUserId: state.logInUser.id,
});

export default withProjects(connect(mapStateToProps, bindAction)(SideBar));
