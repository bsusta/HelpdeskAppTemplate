
import React, { Component } from 'react';

import { Title, Header, Left, Right, View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class TabAtributes extends Component { // eslint-disable-line

    render() {
      return (
        <Container style={styles.container}>
          <Content style={{ padding: 15 }}>
            <Text note>To:</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input />
            </View>
            <Text note>Subject:</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input />
            </View>
            <Text note>Subject:</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
              <Input />
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
                <Icon active style={{ color: 'white' }} name="trash" />
                <Text style={{ color: 'white' }} >Cancel</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
                <Icon active style={{ color: 'white' }} name="add" />
                <Text style={{ color: 'white' }} >Add</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
