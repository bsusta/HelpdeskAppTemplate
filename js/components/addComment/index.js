
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs,Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import TabComment from './tabComment';
import TabEmail from './tabEmail';

class AddComment extends Component {

  render() {
    return (
      <Container style={styles.container}>
        <Tabs>
            <Tab heading="+ Comment">
                <TabComment id={this.props.id} />
            </Tab>
            <Tab heading="+ Email">
                <TabEmail />
            </Tab>
        </Tabs>
      </Container>
    );
  }
}

export default AddComment;
