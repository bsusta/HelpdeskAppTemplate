
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabAtributes from './tabAtributes';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import I18n from '../../translations/';

class TaskEdit extends Component {
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
                   <TabAtributes />
               </Tab>
           </Tabs>
      </Container>
    );
  }
}

export default TaskEdit;
