
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withApollo} from 'react-apollo';
import {Modal} from 'react-native';
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
      company:this.props.companies[0],
      password:'',
      note:'',
      selectingCompany:false,
      filterWord:'',

    };
    }

  submit(){
    let authProvider= { email: { email:this.state.email,password: this.state.password } }
    this.props.client.mutate({
          mutation: createUser,
          variables: { firstName:this.state.firstName,surName:this.state.surName,companyId:this.state.company?this.state.company.id:null,note:this.state.note,active:true,authProvider },
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
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingCompany:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('taskAddCompanySelect') : this.state.company.name}</Text>
              </Left>
            </Button>
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

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingCompany}
              onRequestClose={() => this.setState({selectingCompany:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelect')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              this.props.companies.map((company) =>
              company.name.toLowerCase().includes(this.state.filterWord.toLowerCase()) && <ListItem button key={company.id} onPress={()=>this.setState({company:company,selectingCompany:false})} >
                <Body>
                  <Text>{company.name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

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
