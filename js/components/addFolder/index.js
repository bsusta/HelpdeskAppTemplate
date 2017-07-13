
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs, Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import TabDescription from './tabDescription';
import TabACL from './tabACL';

class AddFolder extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={Actions.pop}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add Folder</Title>
          </Body>
        </Header>

          <Tabs>
              <Tab heading="Description">
                  <TabDescription />
              </Tab>
              <Tab heading="ACL">
                  <TabACL />
              </Tab>
          </Tabs>

      </Container>
    );
  }
}

export default AddFolder;
