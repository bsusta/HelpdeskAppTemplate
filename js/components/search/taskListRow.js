
import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';

class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={()=>Actions.taskEdit({data:this.props.data})} >
              <Body>
                <Text>{this.props.data.title}</Text>
                <Text numberOfLines={1} note>
                  Folder: {this.props.data.description}
                </Text>
                <Text numberOfLines={1} note>Assigned: {this.props.data.assignedUser?this.props.data.assignedUser.firstName:'Nikto'}</Text>
                <Text numberOfLines={1} note>Deadline: {this.props.data.deadlineAt?this.props.data.deadlineAt:'No date'}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}


export default TaskListRow;
