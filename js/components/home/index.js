import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Container, Button, Text, Content, Item, Form, Input, Label, Header, Body, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer } from '../../actions/drawer';
import styles from './styles';
import { withApollo,graphql } from 'react-apollo';
import { addTokenToUse } from '../../tokens/tokenHandling';
import { signinUser, editedTasksSubscription, tasks, projects, editedProjectsSubscription } from './user.gquery';
import {UPDATE_TASKLIST} from '../../apollo/taskList';
import {UPDATE_PROJECTS} from '../../apollo/drawerData';
import {ADD_USER} from '../../apollo/user';

const withData = graphql(tasks, {
  props: ({ data: { loading, allTasks, error, refetch, subscribeToMore } }) => ({
    loadingTasks: loading,
    tasks: allTasks,
    tasksError: error,
    refetch,
    subscribeToMore,
  }),
});
const withData2 = graphql(projects, {
  props: ({ data: { loading, allProjects, error, refetch, subscribeToMore } }) => ({
    loadingProjects: loading,
    projects: allProjects,
    projectsError: error,
    refetchProjects:refetch,
    subscribeToMoreProjects:subscribeToMore,
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
        this.props.setUser(userId);
        this.setState(
          {working:false}
        );
        this.props.updateTaskList(this.props.tasks);
        this.props.subscribeToMore({
          document: editedTasksSubscription,
          updateQuery: () => {
            this.props.refetch().then(
              ()=>{
                this.props.updateTaskList(this.props.tasks);
              }
            ).catch((error)=>{console.log(error)});
            this.props.refetchProjects().then(
              ()=>{
                this.props.updateDrawer(this.props.projects,UPDATE_PROJECTS);
              }
            ).catch((error)=>{console.log(error)});
            return;
          },
        });

        this.props.updateDrawer(this.props.projects,UPDATE_PROJECTS);
        this.props.subscribeToMoreProjects({
          document: editedProjectsSubscription,
          updateQuery: () => {
            this.props.refetchProjects().then(
              ()=>{
                this.props.updateDrawer(this.props.projects,UPDATE_PROJECTS);
              }
            ).catch((error)=>{console.log(error)});
            return;
          },
        });

        Actions.taskList();
      }
    ).catch(
      (error)=>{
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
              this.state.working?
              <ActivityIndicator
              animating size={ 'large' }
              color='#007299' /> :
              <Text>Login</Text>
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
    updateTaskList: (data) => dispatch({type:UPDATE_TASKLIST,taskList:data}),
    updateDrawer: (drawerProjects,type) => dispatch({type,drawerProjects}),
    setUser: (userId) => dispatch({type:ADD_USER,id:userId}),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  routes: state.drawer.routes,
  taskList:state.updateTaskList.taskList,
});

export default withData2(withData(withApollo(connect(mapStateToProps, bindActions)(Home))));
