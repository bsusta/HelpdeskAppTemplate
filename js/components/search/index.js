
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TaskListRow from './taskListRow';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterCategory:null,
      displayed:[],
      filterWord:''
    }
}

  filterDisplayed(){
    let category=this.state.filterCategory;
    let word= this.state.filterWord.toLowerCase();
    this.setState({
      displayed:this.props.taskList.filter((task)=>{
        if(category==null){
          let assignedUserFullname='';
          let assignedUserReversed='';
          let requesterUserFullname='';
          let requesterUserReversed='';
          let createdByUserFullname='';
          let createdByUserReversed='';
          if(task["assignedUser"]){
            assignedUserFullname= (task["assignedUser"].firstName?task["assignedUser"].firstName:'')+' '+(task["assignedUser"].surName?task["assignedUser"].surName:'');
            assignedUserReversed= (task["assignedUser"].surName?task["assignedUser"].surName:'')+' '+(task["assignedUser"].firstName?task["assignedUser"].firstName:'');
          }

          if(task["requester"]){
            requesterUserFullname= (task["requester"].firstName?task["requester"].firstName:'')+' '+(task["requester"].surName?task["requester"].surName:'');
            requesterUserReversed= (task["requester"].surName?task["requester"].surName:'')+' '+(task["requester"].firstName?task["requester"].firstName:'');
          }
          if(task["createdBy"]){
            createdByUserFullname= (task["createdBy"].firstName?task["createdBy"].firstName:'')+' '+(task["createdBy"].surName?task["createdBy"].surName:'');
            createdByUserReversed= (task["createdBy"].surName?task["createdBy"].surName:'')+' '+(task["createdBy"].firstName?task["createdBy"].firstName:'');
          }

          return assignedUserFullname.toLowerCase().includes(word)||assignedUserReversed.toLowerCase().includes(word)
          ||requesterUserFullname.toLowerCase().includes(word)||requesterUserReversed.toLowerCase().includes(word)
          ||createdByUserFullname.toLowerCase().includes(word)||createdByUserReversed.toLowerCase().includes(word)
          ||(task["company"]?(task["company"].name?task["company"].name.toLowerCase().includes(word):false):false)
          ||(task["project"]?(task["project"].title?task["project"].title.toLowerCase().includes(word):false):false)
          ||(task["duration"]?task["duration"]==parseInt(word):false)
          ||(task["title"]?task["title"].toLowerCase().includes(word):false)
          ||(task["status"]?task["status"].toLowerCase().includes(word):false)
          ||(task["description"]?task["description"].toLowerCase().includes(word):false);

        }
        else if(category=="assignedUser"||category=="requester"||category=="createdBy"){
          if(!task[category]){
            return false;
          }
          let fullname= (task[category].firstName?task[category].firstName:'')+' '+(task[category].surName?task[category].surName:'');
          let fullnameReversed= (task[category].surName?task[category].surName:'')+' '+(task[category].firstName?task[category].firstName:'');
          return fullname.toLowerCase().includes(word)||fullnameReversed.toLowerCase().includes(word);
        }
        switch (category) {
          case "company":
            return task[category]?(task[category].name?task[category].name.toLowerCase().includes(word):false):false;
            break;
          case "project":
            return task[category]?(task[category].title?task[category].title.toLowerCase().includes(word):false):false;
            break;
          case "duration":
            return task[category]?task[category]==parseInt(word):false;
          break;
          default:
            return task[category]?task[category].toLowerCase().includes(word):false;
            break;
        }
      })
    });
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
            <Title>Search</Title>
          </Body>
        </Header>
        <Content>
          <ListItem>
            <Item rounded>
              <Icon name="ios-search" />
              <Input placeholder="Search" value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              <Icon name="ios-people" />
            </Item>
          </ListItem>
          <ListItem>
            <Body>
              <Picker
                supportedOrientations={['portrait', 'landscape']}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.filterCategory}
                onValueChange={(value)=>this.setState({filterCategory:value})}>
                <Item label="All" value={null} />
                <Item label="Name" value="title" />
                <Item label="Assigned to" value="assignedUser" />
                <Item label="Requested by" value="requester" />
                <Item label="Company" value="company" />
                <Item label="Project" value="project" />
                <Item label="Status" value="status" />
                <Item label="Created by" value="createdBy" />
                <Item label="Description" value="description" />
                <Item label="Duration" value="duration" />
              </Picker>
            </Body>
          </ListItem>
          <Button onPress={this.filterDisplayed.bind(this)} primary block style={{ margin: 15 }}>
            <Text>Search</Text>
          </Button>
          <List>
          {
            this.state.displayed.map((data) => data.project.id==this.props.projectId||this.props.projectId==null?<TaskListRow data={data} key={data.id} />:null)
          }
          </List>
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
