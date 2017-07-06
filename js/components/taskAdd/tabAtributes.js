
import React, { Component } from 'react';
import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker } from 'native-base';
import { withApollo, graphql } from 'react-apollo';
import styles from './styles';
import { createTask, users, companies } from './taskAdd.gquery';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-datepicker';
const withData = graphql(users, {
  props: ({ data: { loading, allUsers, error, refetch, subscribeToMore } }) => ({
    loadingUsers: loading,
    users: allUsers,
    usersError: error,
    refetch,
    subscribeToMore,
  }),
});
const withData2 = graphql(companies, {
  props: ({ data: { loading, allCompanies, error, refetch, subscribeToMore } }) => ({
    loadingCompanies: loading,
    companies: allCompanies,
    companiesError: error,
    refetch,
    subscribeToMore,
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
      progress:'New',
      duration:'0',
      company:null,
    }
  }
  setWorkTime(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    this.setState({duration:input});
  }
  submitForm(){
    let deadlineAt=this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z';
    if(deadlineAt=='--TZ'){
      deadlineAt=null;
    }
    let title = this.state.taskName;
    let description = this.state.taskDescription;
    let client = this.props.client;
    let createdById= 'cj46tjoxp49qd01429j1w4pxa';
    let assignedUserId = this.state.assignedUserId;
    let duration = this.state.duration==''?0:parseInt(this.state.duration);
    let status= this.state.progress;
    let requesterId=this.state.requesterUserId;
    let companyId=this.state.company;

    client.mutate({
          mutation: createTask,
          variables: { title, description, assignedUserId, deadlineAt,createdById,duration,status,requesterId,companyId },
        });
    Actions.taskList();
  }

  render() {
    if(this.props.loadingUsers||this.props.loadingCompanies){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
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
export default withData2(withData(withApollo(TabAtributes)));
