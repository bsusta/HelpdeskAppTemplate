
import React, { Component } from 'react';

import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon } from 'native-base';

import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

export default class TabItems extends Component { // eslint-disable-line
  constructor(props){
    super(props);
  }
  render() { // eslint-disable-line
    if(this.props.data.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    let total=0;
    this.props.data.allInvoiceItems.map((item)=>total+=item.quantity*item.price);
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
        {
          this.props.data.allInvoiceItems.map((item)=>
            <Card key={item.id}>
              <CardItem>
                <Left>
                  <Text note>Name</Text>
                </Left>
                <Right>
                  <Text>{item.name}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>Price/unit</Text>
                </Left>
                <Right>
                  <Text>{(item.price).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>Unit</Text>
                </Left>
                <Right>
                  <Text>{item.unit.name}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>Quantity</Text>
                </Left>
                <Right>
                  <Text>{(item.quantity).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>Price total</Text>
                </Left>
                <Right>
                  <Text>{(item.quantity*item.price).toString()}</Text>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                  <Button active block onPress={()=>console.log(item.id)}>
                  <Icon name="trash" />
                  <Text>Delete</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>console.log(item.id)}>
                  <Icon name="open" />
                  <Text>Edit</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>

          )
        }







          <Card>
            <CardItem>
            <Left>
              <Text note>Total price</Text>
            </Left>
            <Right>
              <Text>{total}</Text>
            </Right>
          </CardItem>
          </Card>


      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={()=>Actions.addItem({id:this.props.id})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Items</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
