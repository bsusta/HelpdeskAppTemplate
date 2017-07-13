
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs, Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import TabDescription from './tabDescription';
import TabACL from './tabACL';

export default class EditFolder extends Component {

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
            <Title>Edit Folder</Title>
          </Body>
        </Header>

          <Tabs>
              <Tab heading="Description">
                  <TabDescription folder={this.props.folder} />
              </Tab>
              <Tab heading="ACL">
                  <TabACL />
              </Tab>
          </Tabs>

      </Container>
    );
  }
}
