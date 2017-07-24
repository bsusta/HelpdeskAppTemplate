
import React, { Component } from 'react';
import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker, ListItem } from 'native-base';
import { withApollo, graphql } from 'react-apollo';
import styles from './styles';
import { connect } from 'react-redux';
import { createTask, users, companies,projects,editedTasksSubscription,editedProjectsSubscription } from './taskAdd.gquery';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-datepicker';
import I18n from '../../translations/';

const withProjects = graphql(projects, {
  props: ({ data: { loading, allProjects, error, refetch, subscribeToMore } }) => ({
    loadingProjects: loading,
    projectList: allProjects,
    projectsError: error,
    refetchProjects:refetch,
    subscribeToMoreProjects:subscribeToMore,
  }),
});

class TabAtributes extends Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = {
      taskName:'',
      taskDescription:'',
      deadline:null,
      assignedUserId:null,
      requesterUserId:null,
      duration:'0',
      company:null,
      project:this.props.projectList[0].id,
      status:'',
      pickingStatus:false,
    }
  }
  componentDidMount(){
    this.props.subscribeToMoreProjects({
      document: editedProjectsSubscription,
      updateQuery: () => {
        this.props.refetchProjects();
        return;
      },
    });
  }

  setWorkTime(input) {
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({duration:input[1]});
    }
    else{
      this.setState({duration:input});
    }
  }
  submitForm(){
    let deadlineAt=this.state.deadline!=null?this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z':null;
    if(deadlineAt=='--TZ'){
      deadlineAt=null;
    }
    let title = this.state.taskName;
    let description = this.state.taskDescription;
    let client = this.props.client;
    let createdById= this.props.loggedUserId;
    let assignedUserId = this.state.assignedUserId;
    let duration = this.state.duration==''?0:parseInt(this.state.duration);
    let statusId= this.state.status.id;
    let requesterId=this.state.requesterUserId;
    let companyId=this.state.company;
    let projectId=this.state.project;

    client.mutate({
          mutation: createTask,
          variables: { title, description, assignedUserId, deadlineAt,createdById,duration,statusId,requesterId,companyId,projectId },
        });
    Actions.pop();
  }

  render() {
    if(this.props.loadingProjects){
      return <ActivityIndicator
      animating size={ 'large' }
      color='#007299' />
    }

    return (
      <Container>
        <Content style={{ padding: 15 }}>
          <Text note>{I18n.t('taskAddTaskName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={ I18n.t('taskAddTaskNameLabel')}
              value={ this.state.taskName }
              onChangeText={ value => this.setState({taskName:value}) }
            />
          </View>
          <Text note>{I18n.t('taskAddDescription')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('taskAddDescriptionLabel')}
              value={ this.state.taskDescription }
              onChangeText={ value => this.setState({taskDescription:value}) }
            />
          </View>
          <Text note>{I18n.t('assignedTo')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.assignedUserId}
              onValueChange={(value)=>{this.setState({assignedUserId : value})}}>
              {
                [{id:null,key:'',firstName:I18n.t('nobody')}].concat(this.props.users).map((user)=>
                    (<Item label={user.firstName?user.firstName:'id:'+user.id} key={user.id} value={user.id} />)
                  )
              }
            </Picker>
          </View>
          <Text note>{I18n.t('deadline')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <DatePicker
              date={this.state.deadline}
              style={{width:380}}
              mode="datetime"
              placeholder={I18n.t('deadline')}
              showIcon={false}
              androidMode="spinner"
              format="DD.MM.YYYY HH:MM"
              confirmBtnText={I18n.t('confirm')}
              cancelBtnText={I18n.t('cancel')}
              is24Hour={true}
              onDateChange={(date) => {this.setState({deadline: date})}}
            />
          </View>

          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              value={this.state.duration}
              keyboardType='numeric'
              onChangeText={ value => this.setWorkTime(value) }
            />
          </View>
          
          <Text note>{I18n.t('status')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Button rounded style={this.state.status==''?{}:{backgroundColor:this.state.status.color}} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text>{this.state.status==''?'Choose status':this.state.status.name}</Text></Button>
          {
            this.state.pickingStatus && this.props.statuses.map((status)=>
            this.state.status!=status &&
            <Button rounded style={{backgroundColor:status.color}} onPress={()=>this.setState({status:status,pickingStatus:false})} key={status.id} >
            <Text style={{color:'white'}}>{status.name}</Text>
            </Button>)
          }
          </View>

          <Text note>{I18n.t('requester')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.requesterUserId}
              onValueChange={(value)=>{this.setState({requesterUserId : value})}}>
              {
                [{id:null,key:'',firstName:I18n.t('nobody')}].concat(this.props.users).map((user)=>
                    (<Item label={user.firstName?user.firstName:'id:'+user.id} key={user.id} value={user.id} />)
                  )
              }
            </Picker>
          </View>
          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.company}
              onValueChange={(value)=>{this.setState({company : value})}}>
              {
                [{id:null,key:'',name:I18n.t('none')}].concat(this.props.companies).map((company)=>
                    (<Item label={company.name?company.name:'id:'+company.id} key={company.id} value={company.id} />)
                  )
              }
            </Picker>
          </View>
          <Text note>{I18n.t('project')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader={I18n.t('selectOne')}
              mode="dropdown"
              selectedValue={this.state.project}
              onValueChange={(value)=>{this.setState({project : value})}}>
              {
                this.props.projectList.map((project)=>
                    (<Item label={project.title?project.title:''} key={project.id} value={project.id} />)
                  )
              }
            </Picker>
          </View>
        </Content>
      <Footer>
        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={Actions.pop}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('cancel')}</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
          onPress={this.submitForm.bind(this)}
          >
            <Icon active name="md-add" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
          </Button>
        </FooterTab>
    </Footer>
    </Container>
    );
  }
}
const mapStateToProps = state => ({
  loggedUserId:state.logInUser.id,
  companies:state.updateCompanies.companies,
  users:state.updateUsers.users,
  statuses:state.statuses.statuses,
});
function bindAction(dispatch) {
  return {
  };
}
export default withProjects(withApollo(connect(mapStateToProps,bindAction)(TabAtributes)));
