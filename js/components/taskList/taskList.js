
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {subscribeToMoreTasks} from './taskList.gquery';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import TaskListRow from './taskListRow';
import styles from './styles';
import I18n from '../../translations/';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state={items:10}
  }
  componentDidMount(){
    this.props.subscribeToMore({
      document: subscribeToMoreTasks,
      updateQuery: () => {
        this.props.refetch();
        return;
      },
    });
  }
  render() {
    if(this.props.loading){
      return <ActivityIndicator animating size={ 'large' } color='#007299' />
    }
    return (
      <Container style={styles.container}>
        <Content>
          <List>
          {
            this.props.allTasks.map((data) => <TaskListRow data={data} key={data.id} />)
          }
          </List>
          {
            this.state.items==this.props.allTasks.length &&
          <Button
            block
            primary
            style={styles.mb15}
            onPress={this.props.getMore}>
            <Text>{I18n.t('taskListLoadMore')}</Text>
          </Button>
          }
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={Actions.projectAdd}>
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
  };
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, bindAction)(TaskList);
