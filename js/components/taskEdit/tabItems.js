
import React, { Component } from 'react';

import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon } from 'native-base';
import { withApollo } from 'react-apollo';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { changedInvoiceItemsSubscription, deleteInvoiceItem } from './taskEdit.gquery';
import I18n from '../../translations/';

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
      I18n.t('taskEditdeletingItem'),
      I18n.t('taskEditdeletingItemMessage')+itemName,
      [
        {text: I18n.t('cancel'), style: 'cancel'},
        {text: I18n.t('ok'), onPress: () =>{
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
                  <Text note>{I18n.t('title')}</Text>
                </Left>
                <Right>
                  <Text>{item.name}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditPricePerUnit')}</Text>
                </Left>
                <Right>
                  <Text>{(item.price).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditUnit')}</Text>
                </Left>
                <Right>
                  <Text>{item.unit?item.unit.name:'None'}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditQuantity')}</Text>
                </Left>
                <Right>
                  <Text>{(item.quantity).toString()}</Text>
                </Right>
              </CardItem>
              <CardItem>
                <Left>
                  <Text note>{I18n.t('taskEditPriceTotal')}</Text>
                </Left>
                <Right>
                  <Text>{(item.quantity*item.price).toString()}</Text>
                </Right>
              </CardItem>

              <CardItem>
                <Left>
                  <Button active block onPress={()=>this.deleteInvoiceItem(item.id,item.name)}>
                  <Icon name="trash" />
                  <Text>{I18n.t('delete')}</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>Actions.itemEdit({itemData:item})}>
                  <Icon name="open" />
                  <Text>{I18n.t('edit')}</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>

          )
        }

          <Card>
            <CardItem>
            <Left>
              <Text note>{I18n.t('taskEditTotalPrice')}</Text>
            </Left>
            <Right>
              <Text>{total}</Text>
            </Right>
          </CardItem>
          </Card>


      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={()=>Actions.itemAdd({id:this.props.id})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }}>{I18n.t('taskEditItem')}</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
export default withApollo(TabItems);
