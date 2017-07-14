
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';

class Messages extends Component {

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
            <Title>Messages</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content>
            <List>
            <ListItem>
                   <Body>
                       <Text>System message</Text>
                   </Body>
                   <Right>
                       <Text note>3:43 pm 12.2.2017</Text>
                   </Right>
               </ListItem>
          </List>
          </Content>

          <Footer>
            <FooterTab>
            </FooterTab>
          </Footer>
        </Container>
    );
  }
}


export default Messages;
