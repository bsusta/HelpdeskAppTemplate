
import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';


class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={()=>Actions.taskEdit({data:this.props})} >
              <Body>
                <Text>{this.props.taskName}</Text>
                <Text numberOfLines={1} note>
                  Folder: {this.props.folder}
                </Text>
                <Text numberOfLines={1} note>Assigned: {this.props.personName}</Text>
                <Text numberOfLines={1} note>Deadline: {this.props.date}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}


export default TaskListRow;
