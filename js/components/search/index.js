
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TaskListRow from './taskListRow';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import I18n from '../../translations/';
import { graphql} from 'react-apollo';
import TaskList from './taskList';
import {taskNameFilter,taskAssignedUserFilter,taskRequesterFilter,taskCompanyFilter,taskProjectFilter,taskStatusFilter,taskCreatedByFilter,taskWorkHoursFilter,taskDescriptionFilter} from './search.gquery.js';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterCategory:'title',
      displayed:[],
      filterWord:'',
      wrapper:null,
    }
}

  async filterDisplayed(){
    let category=this.state.filterCategory;
    let word= this.state.filterWord;
    let query='';

    switch(category){
      case 'title':{
        query=taskNameFilter;
        break;
      }
      case 'assignedUser':{
        query=taskAssignedUserFilter;
        break;
      }
      case 'requester':{
        query=taskRequesterFilter;
        break;
      }
      case 'company':{
        query=taskCompanyFilter;
        break;
      }
      case 'project':{
        query=taskProjectFilter;
        break;
      }
      case 'status':{
        query=taskStatusFilter;
        break;
      }
      case 'createdBy':{
        query=taskCreatedByFilter;
        break;
      }
      case 'duration':{
        query=taskWorkHoursFilter;
        break;
      }
      case 'description':{
        query=taskDescriptionFilter;
        break;
      }
      default:return;
    }
    let wrapper= graphql(query,{
            options:{
              variables:{
                after:null,
                limit:10,
                filter:category=='duration'?parseInt(word):word,
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
                      after:allTasks.length==0?null:allTasks[allTasks.length-1].id,
                      limit:this.props.numberOfTasks,
                      filter:word,
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
      this.setState({wrapper:wrapper(TaskList)})
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('search')}</Title>
          </Body>
        </Header>
        <Content>
          <ListItem>
            <Item rounded>
              <Icon name="ios-search" />
              <Input placeholder={I18n.t('search')} value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              <Icon name="ios-people" />
            </Item>
          </ListItem>
          <ListItem>
            <Body>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                iosHeader={I18n.t('selectOne')}
                mode="dropdown"
                selectedValue={this.state.filterCategory}
                onValueChange={(value)=>this.setState({filterCategory:value})}>
                <Item label={I18n.t('title')} value="title" />
                <Item label={I18n.t('assignedTo')} value="assignedUser" />
                <Item label={I18n.t('requester')} value="requester" />
                <Item label={I18n.t('company')} value="company" />
                <Item label={I18n.t('project')} value="project" />
                <Item label={I18n.t('status')} value="status" />
                <Item label={I18n.t('workHours')} value="duration" />
                <Item label={I18n.t('createdBy')} value="createdBy" />
                <Item label={I18n.t('description')} value="description" />
              </Picker>
            </Body>
          </ListItem>

          <Button onPress={this.filterDisplayed.bind(this)} primary block style={{ margin: 15 }}>
            <Text>{I18n.t('search')}</Text>
          </Button>
          {
            this.state.wrapper && <this.state.wrapper/>
          }
        </Content>
      </Container>
    );
  }
}
function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
  taskList: state.updateTaskList.taskList,
});

export default connect(mapStateToProps, bindAction)(Search);
