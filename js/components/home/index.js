import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { withApollo } from 'react-apollo';

import { setLoggedUser } from './actions';
import { addTokenToUse } from '../../tokens/tokenHandling';
import { signinUser } from './user.gquery';


class Home extends Component { // eslint-disable-line

  constructor(props){
    super(props);
    this.state={
      email:'test@test.sk',
      pass:'test',
      errorMessage:'',
      working:false,
    }
  }
  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  async submitLogin(){
    this.setState(
      {working:true}
    );
    let email=this.state.email;
    let password = this.state.pass;
    let client = this.props.client;
    client.mutate({
      mutation: signinUser,
      variables: { email, password }
    }).then(
      (loggedUserData)=>{
        const signedUser = loggedUserData.data.signinUser;

        const token = signedUser.token;
        const userId = signedUser.user.id;

        addTokenToUse(client, token);
        setLoggedUser({
          id: userId,
          email: signedUser.user.email
        });
        this.setState(
          {working:false}
        );
        Actions.taskList();
      }
    ).catch(
      ()=>{
        this.setState({errorMessage:'Zlé meno alebo heslo!'});
        setTimeout(()=>this.setState({errorMessage:''}), 1500);
        this.setState(
          {working:false}
        );
      }
    );
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
              disabled={this.state.working}
            >
            {
              this.state.working? <ActivityIndicator animating size={ 'large' } color='#007299' /> : <Text>Login</Text>
            }
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

export default withApollo(connect(mapStateToProps, bindActions)(Home));
