
import React, { Component } from 'react';

import { CheckBox, Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';

import styles from './styles';

export default class TabACL extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List>
               <ListItem >
                  <Body>
                                <Text>View own task</Text>
                  </Body>
                  <Right>
                    <CheckBox checked={false} />
                  </Right>
               </ListItem>
           </List>
        </Content>


      <Footer>
        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Cancel</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active name="md-add" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }} >Save</Text>
          </Button>
        </FooterTab>
    </Footer>


    </Container>

    );
  }
}
