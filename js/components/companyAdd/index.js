
import React, { Component } from 'react';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withApollo} from 'react-apollo';
import {createCompany} from './companyAdd.gquery';
import styles from './styles';
import I18n from '../../translations/';

class CompanyAdd extends Component {

  constructor(props) {
      super(props);
      this.state = {
        name:'',
        street:'',
        city:'',
        country:'',
        note:'',
        hours:'0',
        registrationNumber:'',
        taxNumber:'',
        vat:'',
        zip:'',
      };
      this.setHours.bind(this);
      this.setRegistrationNumber.bind(this);
      this.setTaxNumber.bind(this);
      this.setZIP.bind(this);
    }
  submit(){
    this.props.client.mutate({
          mutation: createCompany,
          variables: {
            active:true,
            name:this.state.name,
            street:this.state.street,
            city:this.state.city,
            country:this.state.country,
            note:this.state.note,
            hours:this.state.hours!=''?parseInt(this.state.hours):0,
            registrationNumber:this.state.registrationNumber,
            taxNumber:this.state.taxNumber,
            vat:this.state.vat,
            zip:this.state.zip
          },
        });

    Actions.pop();
  }

  setHours(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({hours:input[1]});
    }
    else{
      this.setState({hours:input});
    }
  }
  setRegistrationNumber(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({registrationNumber:input});
  }
  setTaxNumber(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({taxNumber:input});
  }
  setZIP(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({zip:input});
  }

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
            <Title>{I18n.t('settingsAddCompanyTitle')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>

          <Text note>{I18n.t('settingsCompanyName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('settingsCompanyName')}
            value={this.state.name}
            onChangeText={(value)=>this.setState({name:value})}
            />
          </View>

          <Text note>{I18n.t('street')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('street')}
          value={this.state.street}
          onChangeText={(value)=>this.setState({street:value})}
          />
          </View>

          <Text note>{I18n.t('city')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('city')}
          value={this.state.city}
          onChangeText={(value)=>this.setState({city:value})}
          />
          </View>

          <Text note>{I18n.t('country')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('country')}
          value={this.state.country}
          onChangeText={(value)=>this.setState({country:value})}
          />
          </View>

          <Text note>{I18n.t('note')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('note')}
          value={this.state.note}
          onChangeText={(value)=>this.setState({note:value})}
          style={{height:100}}
          multiline={true}
          />
          </View>

          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('workHours')}
          keyboardType='numeric'
          value={this.state.hours}
          onChangeText={value => this.setHours(value)}
          />
          </View>

          <Text note>{I18n.t('registrationNumber')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('registrationNumber')}
          value={this.state.registrationNumber}
          onChangeText={value => this.setRegistrationNumber(value)}
          />
          </View>

          <Text note>{I18n.t('taxNumber')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          keyboardType='numeric'
          placeholder={I18n.t('taxNumber')}
          value={this.state.taxNumber}
          onChangeText={value => this.setTaxNumber(value)}
          />
          </View>

          <Text note>{I18n.t('vat')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('vat')}
          value={this.state.vat}
          onChangeText={(value)=>this.setState({vat:value})}
          />
          </View>

          <Text note>{I18n.t('zipCode')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('zipCode')}
          keyboardType='numeric'
          value={this.state.zip}
          onChangeText={value => this.setZIP(value)}
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


export default (withApollo)(CompanyAdd);
