
import React, { Component } from 'react';

import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon } from 'native-base';
import { withApollo } from 'react-apollo';

import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { changedInvoiceItemsSubscription, deleteInvoiceItem } from './taskEdit.gquery';

class TabItems extends Component { // eslint-disable-line
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.data.subscribeToMore({
      document: changedInvoiceItemsSubscription,
      updateQuery: () => {
        this.props.data.refetch();
        return;
      },
    });
  }

  deleteInvoiceItem(InvoiceItemId,itemName){
    Alert.alert(
      'Deleting Item',
      'Are you sure you want to delete item named '+itemName,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () =>{
          this.props.client.mutate({
                mutation: deleteInvoiceItem,
                variables: { InvoiceItemId},
              });
        }},
      ],
      { cancelable: false }
    )
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
                  <Text>{item.unit?item.unit.name:'None'}</Text>
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
                  <Button active block onPress={()=>this.deleteInvoiceItem(item.id,item.name)}>
                  <Icon name="trash" />
                  <Text>Delete</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>Actions.editItem({itemData:item})}>
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
export default withApollo(TabItems);
