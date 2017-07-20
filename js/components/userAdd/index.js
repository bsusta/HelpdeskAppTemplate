
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withApollo} from 'react-apollo';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import {createUser} from './userAdd.gquery';
import I18n from '../../translations/';

class UserAdd extends Component {
constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      surName:'',
      email:'',
      company:null,
      password:'',
      note:'',
    };
    }

  submit(){
    let authProvider= { email: { email:this.state.email,password: this.state.password } }
    this.props.client.mutate({
          mutation: createUser,
          variables: { firstName:this.state.firstName,surName:this.state.surName,companyId:this.state.company,note:this.state.note,active:true,authProvider },
        });
    Actions.pop();
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
            <Title>{I18n.t('settingsAddUserTitle')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('settingsFirstName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder={I18n.t('settingsFirstName')}
            value={this.state.firstName}
            onChangeText={(value)=>this.setState({firstName:value})}
          />
          </View>
          <Text note>{I18n.t('settingsSurName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder={I18n.t('settingsSurName')}
          value={this.state.surName}
          onChangeText={(value)=>this.setState({surName:value})}
          />
          </View>
          <Text note>{I18n.t('homeMail')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            placeholder={I18n.t('homeMail')}
            value={this.state.email}
            onChangeText={(value)=>this.setState({email:value})}
            />
          </View>
          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.company}
              onValueChange={(value)=>{this.setState({company:value})}}>
              {
                ([{id:null,key:null,name:I18n.t('none')}].concat(this.props.companies)).map((company)=>
                  <Item label={company.name} value={company.id} key={company.key} />)
              }
            </Picker>
          </View>
          <Text note>{I18n.t('homePass')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            secureTextEntry={true}
            placeholder={I18n.t('homePass')}
            value={this.state.password}
            onChangeText={(value)=>this.setState({password:value})}
            />
          </View>
          <Text note>{I18n.t('settingsNote')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            style={{height:100}}
            multiline={true}
            placeholder={I18n.t('settingsNote')}
            value={this.state.note}
            onChangeText={(value)=>this.setState({note:value})}

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

function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({
  companies: state.updateCompanies.companies,
});

export default withApollo(connect(mapStateToProps, bindAction)(UserAdd));
