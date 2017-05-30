
import React, { Component } from 'react';

import { Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class TabComments extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List>
          <ListItem avatar>
                  <Left>
                     <Thumbnail/>
                 </Left>
                 <Body>
                     <Text note>Kumar Pratik</Text>
                     <Text>Doing what you like will always keep you happy . .</Text>
                 </Body>
                 <Right>
                     <Text note>3:43 pm 12.2.2017</Text>
                 </Right>
             </ListItem>
             <ListItem avatar>
                     <Left>
                        <Thumbnail/>
                    </Left>
                    <Body>
                        <Text note>Kumar Pratik posted a reply</Text>
                        <Text>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm 12.2.2017</Text>
                    </Right>
                </ListItem>
                <ListItem avatar>
                        <Left>
                           <Thumbnail/>
                       </Left>
                       <Body>
                           <Text note>FROM:branislav.susta@gmail.com</Text>
                           <Text note>TO:hotline@lansystems.sk</Text>
                           <Text>Doing what you like will always keep you happy . .</Text>
                       </Body>
                       <Right>
                           <Text note>3:43 pm 12.2.2017</Text>
                       </Right>
                   </ListItem>
        </List>
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={Actions.addComment} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Comment</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>

    );
  }
}
