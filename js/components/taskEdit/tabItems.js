
import React, { Component } from 'react';

import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon } from 'native-base';

import styles from './styles';
import { Actions } from 'react-native-router-flux';
export default class TabItems extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <Card>
            <CardItem>
              <Left>
                <Text note>Name</Text>
              </Left>
              <Right>
                <Text>Keyboard</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Price/unit</Text>
              </Left>
              <Right>
                <Text>50</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Unit</Text>
              </Left>
              <Right>
                <Text>ks</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Quantity</Text>
              </Left>
              <Right>
                <Text>ks</Text>
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Text note>Price total</Text>
              </Left>
              <Right>
                <Text>100</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Button active block>
                <Icon name="trash" />
                <Text>Delete</Text>
                </Button>
              </Left>
              <Right>
                <Button active block>
                <Icon name="open" />
                <Text>Edit</Text>
                </Button>
              </Right>
            </CardItem>

          </Card>
          <Card>
            <CardItem>
            <Left>
              <Text note>Total price</Text>
            </Left>
            <Right>
              <Text>100</Text>
            </Right>
          </CardItem>
          </Card>


      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={Actions.addItem} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Items</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
