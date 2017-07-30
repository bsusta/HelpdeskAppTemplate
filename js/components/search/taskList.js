import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { graphql, withApollo } from 'react-apollo';
import { ActivityIndicator, RefreshControl } from 'react-native';
import {subscribeToMoreTasks} from './search.gquery';
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
      <View style={{flex:1,flexDirection:'column'}}>
        <List>
        {
          this.props.allTasks.map((data) => <TaskListRow style={{flex:1,flexDirection:'column'}} data={data} key={data.id} />)
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
      </View>
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
