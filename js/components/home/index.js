import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { withApollo,graphql } from 'react-apollo';
import { addTokenToUse } from '../../tokens/tokenHandling';
import { signinUser, editedTasksSubscription, tasks, projects, editedProjectsSubscription, companies, subscribeToMoreCompanies, users, subscribeToMoreUsers,statuses, editedStatusesSubscription } from './user.gquery';
import {UPDATE_PROJECTS} from '../../apollo/drawerData';
import {UPDATE_COMPANIES} from '../../apollo/companies';
import {UPDATE_USERS} from '../../apollo/users';
import {ADD_USER} from '../../apollo/user';
import {UPDATE_STATUSES} from '../../apollo/statuses';
import I18n from '../../translations/';

const withUsers = graphql(users, {
  props: ({ data: { loading, allUsers, error, refetch, subscribeToMore } }) => ({
    loadingUsers: loading,
    users: allUsers,
    usersError: error,
    refetchUsers:refetch,
    subscribeToMoreUsers:subscribeToMore,
  }),
});
const withCompanies = graphql(companies, {
  props: ({ data: { loading, allCompanies, error, refetch, subscribeToMore } }) => ({
    loadingCompanies: loading,
    companies: allCompanies,
    companiesError: error,
    refetchCompanies:refetch,
    subscribeToMoreCompanies:subscribeToMore,
  }),
});
const withStatuses = graphql(statuses, {
  props: ({ data: { loading, allStatuses, error, refetch, subscribeToMore } }) => ({
    loadingStatuses: loading,
    statuses: allStatuses,
    statusesError: error,
    refetchStatuses:refetch,
    subscribeToMoreStatuses:subscribeToMore,
  }),
});

class Home extends Component {

  constructor(props){
    super(props);
    this.state={
      email:'test@test.sk',
      pass:'test',
      errorMessage:'',
      working:false,
    }
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
        this.props.setUser(userId);
        this.setState(
          {working:false}
        );

        this.props.updateStatuses(this.props.statuses);
        this.props.subscribeToMoreStatuses({
          document: editedStatusesSubscription,
          updateQuery: () => {
            this.props.refetchStatuses().then(
              ()=>{
                this.props.updateStatuses(this.props.statuses);
              }
            ).catch((error)=>{console.log(error)});
            return;
          },
        });


        this.props.updateUsers(this.props.users,UPDATE_USERS);
        this.props.subscribeToMoreUsers({
          document: subscribeToMoreUsers,
          updateQuery: () => {
            this.props.refetchUsers().then(
              ()=>{
                this.props.updateUsers(this.props.users,UPDATE_USERS);
              }
            ).catch((error)=>{console.log(error)});
            return;
          },
        });

        this.props.updateCompanies(this.props.companies,UPDATE_COMPANIES);
        this.props.subscribeToMoreCompanies({
          document: subscribeToMoreCompanies,
          updateQuery: () => {
            this.props.refetchCompanies().then(
              ()=>{
                this.props.updateCompanies(this.props.companies,UPDATE_COMPANIES);
              }
            ).catch((error)=>{console.log(error)});
            return;
          },
        });

        Actions.taskList({projectId:'INBOX'});
      }
    ).catch(
      (error)=>{
        this.setState({errorMessage:I18n.t('homeLoginError')});
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
              <Title>{I18n.t('appName')}</Title>
            </Body>
          </Header>
          <Form>
            <Item inlineLabel>
              <Input
                placeholder={I18n.t('homeMail')}
                value={this.state.email}
                 onChangeText={(value)=>this.setState({email:value})}
              />
            </Item>
            <Item inlineLabel last>
              <Input
                secureTextEntry={true}
                placeholder={I18n.t('homePass')}
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
              this.state.working?
              <ActivityIndicator
              animating size={ 'large' }
              color='#007299' /> :
              <Text>{I18n.t('homeLogin')}</Text>
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
    updateDrawer: (drawerProjects,type) => dispatch({type,drawerProjects}),
    setUser: (userId) => dispatch({type:ADD_USER,id:userId}),
    updateUsers: (users) => dispatch({type:UPDATE_USERS,users}),
    updateStatuses: (statuses) => dispatch({type:UPDATE_STATUSES,statuses}),
    updateCompanies: (companies) => dispatch({type:UPDATE_COMPANIES,companies}),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
});

export default withStatuses(withUsers(withCompanies(withApollo(connect(mapStateToProps, bindActions)(Home)))));
