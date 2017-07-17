
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { units, createInvoiceItem } from './itemAdd.gquery';
import { withApollo, graphql } from 'react-apollo';
import I18n from '../../translations/';


const withData = graphql(units, {
  props: ({ data: { loading, allUnits, error, refetch, subscribeToMore } }) => ({
    loadingUnits: loading,
    units: allUnits,
    usersError: error,
    refetch,
    subscribeToMore,
  }),
});

class ItemAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit:null,
      itemQuantity:'0',
      itemName:'',
      itemPrice:'0',
    };
    this.setPrice.bind(this);
    this.setQuantity.bind(this);
  }

  submit(){
    let name = this.state.itemName;
    let price = parseInt(this.state.itemPrice);
    let unitId = this.state.unit;
    let quantity = parseInt(this.state.itemQuantity);
    let taskId = this.props.id;
    this.props.client.mutate({
          mutation: createInvoiceItem,
          variables: { name, price, unitId, quantity,taskId },
        });
    Actions.pop();
  }

  setPrice(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({itemPrice:input[1]});
    }
    else{
      this.setState({itemPrice:input});
    }
  }

  setQuantity(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({itemQuantity:input[1]});
    }
    else{
      this.setState({itemQuantity:input});
    }
  }

  render() {
    if(this.props.loadingUnits){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{I18n.t('taskEditAddItem')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('title')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemName}
              onChangeText={ value => this.setState({itemName:value}) }
            />
          </View>
          <Text note>{I18n.t('taskEditPricePerUnit')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemPrice}
              keyboardType='numeric'
              onChangeText={ value => this.setPrice(value) }
            />
          </View>
          <Text note>{I18n.t('taskEditUnit')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              selectedValue={this.state.unit}
              onValueChange={(value)=>this.setState({unit:value})}>
              {([{id:null,name:I18n.t('none')}].concat(this.props.units)).map(
                (unit)=> <Item label={unit.name} key={unit.id} value={unit.id} />
              )}
            </Picker>
          </View>
          <Text note>{I18n.t('taskEditQuantity')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.itemQuantity}
              keyboardType='numeric'
              onChangeText={ value => this.setQuantity(value) }
            />
          </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="trash" />
              <Text style={{ color: 'white' }} >{I18n.t('delete')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default withData(withApollo((ItemAdd)));
