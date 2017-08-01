
import React, { Component } from 'react';
import { Tab, Tabs, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabAtributes from './tabAtributes';
import styles from './styles';
import I18n from '../../translations/';

class TaskAdd extends Component {
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
            <Title>{I18n.t('taskAddTitle')}</Title>
          </Body>
          <Right />
        </Header>
           <Tabs>
               <Tab heading={I18n.t('taskAddAttributes')}>
                   <TabAtributes projectId={this.props.projectId} />
               </Tab>
           </Tabs>
      </Container>
    );
  }
}

export default TaskAdd;
