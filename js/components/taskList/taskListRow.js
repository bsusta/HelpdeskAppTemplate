
import React, { Component } from 'react';
import { Icon, Text, Right, Body, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import I18n from '../../translations/';

class TaskListRow extends Component {
  render() {
    return (
      <ListItem button onPress={()=>Actions.taskEdit({data:this.props.data})} >
              <Body>
                <Text>{this.props.data.title}</Text>
                <Text numberOfLines={1} note>
                  {I18n.t('project')}: {this.props.data.project.title}
                </Text>
                <Text numberOfLines={1} note>{I18n.t('assignedTo')}: {this.props.data.assignedUser?this.props.data.assignedUser.firstName:I18n.t('nobody')}</Text>
                <Text numberOfLines={1} note>{I18n.t('deadline')}: {this.props.data.deadlineAt?this.props.data.deadlineAt:I18n.t('noDate')}</Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
    );
  }
}


export default TaskListRow;
