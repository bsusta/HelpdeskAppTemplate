
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { withApollo} from 'react-apollo';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import {updateUser} from './editUser.gquery';
import { AsyncStorage } from 'react-native';

class EditUser extends Component {
constructor(props) {
    super(props);
    this.state = {
      firstName:this.props.user.firstName?this.props.user.firstName:'',
      surName:this.props.user.surName?this.props.user.surName:'',
      email:this.props.user.email?this.props.user.email:'',
      company:this.props.user.company?this.props.user.company.id:null,
      password:'',
      note:this.props.user.note?this.props.user.note:'',
      active:this.props.user.active?this.props.user.active:true,
    };
    }
//active=true

  submit(){
      this.props.client.mutate({
            mutation: updateUser,
            variables: { id:this.props.user.id, firstName:this.state.firstName,surName:this.state.surName,companyId:this.state.company,note:this.state.note,active:this.state.active },
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
            <Title>Add/Edit user</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            placeholder='First name'
            value={this.state.firstName}
            onChangeText={(value)=>this.setState({firstName:value})}
          />
          </View>
          <Text note>Surname</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
          placeholder='Last name'
          value={this.state.surName}
          onChangeText={(value)=>this.setState({surName:value})}
          />
          </View>
          <Text note>Email</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            disabled={true}
            placeholder='E-mail'
            value={this.state.email}
            onChangeText={(value)=>this.setState({email:value})}
            />
          </View>
          <Text note>Company</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.company}
              onValueChange={(value)=>{this.setState({company:value})}}>
              {
                ([{id:null,key:null,name:"Neurčitá"}].concat(this.props.companies)).map((company)=>
                  <Item label={company.name} value={company.id} key={company.key} />)
              }
            </Picker>
          </View>
          <Text note>Password</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            disabled={true}
            secureTextEntry={true}
            placeholder='password'
            value={this.state.password}
            onChangeText={(value)=>this.setState({password:value})}
            />
          </View>
          <Text note>Note</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
            style={{height:100}}
            multiline={true}
            placeholder='poznamka'
            value={this.state.note}
            onChangeText={(value)=>this.setState({note:value})}

             />
          </View>


        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="trash" />
              <Text style={{ color: 'white' }} >Delete</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Save</Text>
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

export default withApollo(connect(mapStateToProps, bindAction)(EditUser));
