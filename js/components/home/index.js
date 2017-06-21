import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import { addTokenToUse } from '../../tokens/tokenHandling';
import { signinUser } from './user.gquery';


class Home extends Component { // eslint-disable-line

  constructor(props){
    super(props);
    this.state={
      email:'test@test.sk',
      pass:'test',
      errorMessage:''
    }
  }
  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  async submitLogin(){
    let mail=this.state.email;
    let pass=this.state.pass;

    const loggedUserData = await this.props.client.mutate({
      mutation: signinUser,
      variables: { email, password }
    });
    const signedUser = loggedUserData.data.signinUser;

    const token = signedUser.token;
    const userId = signedUser.user.id;

    addTokenToUse(client, token);
    console.log("Mám token");
    console.log(token);
    setLoggedUser({
      id: userId,
      email: signedUser.user.email
    });


    console.log(this.props);

    this.setState({errorMessage:'Zlé meno alebo heslo!'});
    setTimeout(()=>this.setState({errorMessage:''}), 1500);
    return;
    Actions.taskList();
  }
  render() {
    return (
      <Container>
        <Content padder style={{ backgroundColor: '#FFF', padding: 20 }}>
          <Header>
            <Body>
              <Title>LanHelpdesk</Title>
            </Body>
          </Header>
          <Form>
            <Item inlineLabel>
              <Input
                placeholder='E-mail'
                value={this.state.email}
                 onChangeText={(value)=>this.setState({email:value})}
              />
            </Item>
            <Item inlineLabel last>
              <Input
                placeholder='password'
                value={this.state.pass}
                onChangeText={(value)=>this.setState({pass:value})}
              />
            </Item>
          </Form>
          <View style={{ marginBottom: 80, marginTop: 20 }}>
            <Button
              block
              primary
              style={styles.mb15}
              onPress={this.submitLogin.bind(this)}
            >
              <Text>Login</Text>
            </Button>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

          </View>
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
});

export default connect(mapStateToProps, bindActions)(Home);
