
import React, { Component } from 'react';

import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker } from 'native-base';
import { ActivityIndicator } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { updateTask } from './taskEdit.gquery';
import { Actions } from 'react-native-router-flux';
import { withApollo, graphql } from 'react-apollo';
import DatePicker from 'react-native-datepicker';

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    let date=new Date(this.props.data.deadlineAt);
    this.state = {
      taskName:this.props.data.title,
      taskDescription:this.props.data.description,
      deadline:this.props.data.deadlineAt?date.toGMTString():null,
      assignedUserId:this.props.data.assignedUser?this.props.data.assignedUser.id:null,
      requesterUserId:this.props.data.requester?this.props.data.requester.id:null,
      progress:this.props.data.status?this.props.data.status:'New',
      duration:this.props.data.duration?this.props.data.duration.toString():'0',
      company:this.props.data.company?this.props.data.company.id:null,
      project:this.props.data.project?this.props.data.project.id:this.props.projectList[0].id,
    }
    this.setWorkTime.bind(this);
  }
  setWorkTime(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({duration:input});
  }

   submitForm(){
     let deadlineAt=new Date(this.state.deadline)=="Invalid Date"?(this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z'):this.props.data.deadlineAt;
     let title = this.state.taskName;
     let description = this.state.taskDescription;
     let client = this.props.client;
     let id = this.props.data.id;
     let assignedUserId = this.state.assignedUserId;
     let duration = this.state.duration==''?0:parseInt(this.state.duration);
     let status= this.state.progress;
     let requesterId=this.state.requesterUserId;
     let companyId=this.state.company;
     let projectId=this.state.project;

     client.mutate({
           mutation: updateTask,
           variables: {title, description, id, assignedUserId,deadlineAt,duration,status,requesterId,companyId,projectId},
         });
    Actions.pop();
   }

  render() {
    return (
      <Container>
        <Content style={{ padding: 15 }}>
          <Text note> Task Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={ 'Zadajte názov' }
              value={ this.state.taskName }
              onChangeText={ value => this.setState({taskName:value}) }
            />
          </View>
          <Text note>Descrition</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={ 'Zadajte popis' }
              value={ this.state.taskDescription }
              onChangeText={ value => this.setState({taskDescription:value}) }
            />
          </View>
          <Text note>Assigned</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Picker
            supportedOrientations={['portrait', 'landscape']}
            iosHeader="Select one"
            mode="dropdown"
            selectedValue={this.state.assignedUserId}
            onValueChange={(value)=>{this.setState({assignedUserId : value})}}>
            {
              [{id:null,key:'',firstName:'Nikto'}].concat(this.props.users).map((user)=>
                  (<Item label={user.firstName?user.firstName:'id:'+user.id} key={user.id} value={user.id} />)
                )
            }
          </Picker>
          </View>
          <Text note>Deadline</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <DatePicker
            date={this.state.deadline}
            style={{width:380}}
            mode="datetime"
            placeholder="Deadline"
            showIcon={false}
            androidMode="spinner"
            format="DD.MM.YYYY HH:MM"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            is24Hour={true}
            onDateChange={(date) => {this.setState({deadline: date})}}
          />
          </View>

          <Text note>Work hours</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.duration}
            keyboardType='numeric'
            onChangeText={ value => this.setWorkTime(value) }
          />
          </View>
          <Text note>Status</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.progress}
              onValueChange={(value)=>this.setState({progress:value})}>
              <Item label="New" value="New" />
              <Item label="Pending" value="Pending" />
              <Item label="Done" value="Done" />
            </Picker>
          </View>
          <Text note>Requester</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.requesterUserId}
              onValueChange={(value)=>{this.setState({requesterUserId : value})}}>
              {
                [{id:null,key:'',firstName:'Nikto'}].concat(this.props.users).map((user)=>
                    (<Item label={user.firstName?user.firstName:'id:'+user.id} key={user.id} value={user.id} />)
                  )
              }
            </Picker>
          </View>
          <Text note>Company</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.company}
              onValueChange={(value)=>{this.setState({company : value})}}>
              {
                [{id:null,key:'',name:'Ziadna'}].concat(this.props.companies).map((company)=>
                    (<Item label={company.name?company.name:'id:'+company.id} key={company.id} value={company.id} />)
                  )
              }
            </Picker>
          </View>
          <Text note>Project</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
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
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Cancel</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
          onPress={this.submitForm.bind(this)}
          >
            <Icon active name="md-add" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }} >Save</Text>
          </Button>
        </FooterTab>
    </Footer>
    </Container>
    );
  }
}

const mapStateToProps = state => ({
  projectList: state.updateDrawer.drawerProjects,
  users: state.updateUsers.users,
  companies: state.updateCompanies.companies,
});
function bindAction(dispatch) {
  return {
  };
}
export default withApollo(connect(mapStateToProps,bindAction)(TabAtributes));
