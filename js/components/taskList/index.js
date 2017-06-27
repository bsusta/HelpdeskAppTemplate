
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql } from 'react-apollo';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import TaskListRow from './taskListRow';
import styles from './styles';
import { tasks } from './taskList.gquery';

const {
  pushRoute,
} = actions;

const withData = graphql(tasks, {
  props: ({ data: { loading, allTasks, error, refetch, subscribeToMore } }) => ({
    loadingTasks: loading,
    tasks: allTasks,
    tasksError: error,
    refetch,
    subscribeToMore,
  }),
});

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state={tasks:[]};
  }
  componentDidMount(){
    this.props.refetch().then(()=>{
      this.props.refetch().then(()=>{
        this.setState({tasks:this.props.tasks});
    })
  });
  }
  static propTypes = {
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Filter/Folder name</Title>
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
          <List dataArray={this.state.tasks} renderRow={data =>
            <TaskListRow taskName={data.title} folder={data.description} personName={data.assignedUser?data.assignedUser.firstName:'Nikto'} date={data.deadlineAt} id={data.id} />
          }
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon active style={{ color: 'white' }} name="refresh" />
              <Text style={{ color: 'white' }} >Reload</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button vertical onPress={Actions.addFolder}>
              <Icon active style={{ color: 'white' }} name="md-add" />
              <Text style={{ color: 'white' }} >Folder</Text>
            </Button>
          </FooterTab>

          <FooterTab>
            <Button vertical onPress={Actions.taskAdd}>
              <Icon name="md-add" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >Task</Text>
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
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
});

export default withData(connect(mapStateToProps, bindAction)(TaskList));
