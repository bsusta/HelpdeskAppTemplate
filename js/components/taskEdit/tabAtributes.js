
import React, { Component } from 'react';

import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker } from 'native-base';
import { ActivityIndicator } from 'react-native';
import styles from './styles';
import { updateTask , users } from './taskEdit.gquery';
import { Actions } from 'react-native-router-flux';
import { withApollo, graphql } from 'react-apollo';
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

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    let date=new Date(this.props.data.deadlineAt);
    this.state = {
      taskName:this.props.data.title,
      taskDescription:this.props.data.description,
      selectedItem: undefined,
      selected1: 'key1',
      deadline:this.props.data.deadlineAt?date.toGMTString():null,
      assignedUserId:this.props.data.assignedUser?this.props.data.assignedUser.id:'',
      results: {
        items: []
     }
    }
  }
   onValueChange (value: string) {
     this.setState({
         selected1 : value,
     });
   }
   pickedAssigned(value:string){
     this.setState({
         assignedUserId : value
     });
   }
   submitForm(){
     let deadlineAt=new Date(this.state.deadline)=="Invalid Date"?(this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z'):this.props.data.deadlineAt;
     let title = this.state.taskName;
     let description = this.state.taskDescription;
     let client = this.props.client;
     let id = this.props.data.id;
     let assignedUserId = this.state.assignedUserId==''?null:this.state.assignedUserId;
     client.mutate({
           mutation: updateTask,
           variables: { title, description, id, assignedUserId,deadlineAt},
         });
    Actions.taskList();
   }

  render() {
    if(this.props.loadingUsers){
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
            onValueChange={this.pickedAssigned.bind(this)}>
            {
              [{id:'',key:'',firstName:'Nikto'}].concat(this.props.users).map((user)=>
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
            <Input />
          </View>
          <Text note>Status</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="New" value="key0" />
              <Item label="Company 2" value="key1" />
            </Picker>
          </View>
          <Text note>Requester</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="user 1" value="key0" />
              <Item label="Company 2" value="key1" />
            </Picker>
          </View>
          <Text note>Company</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              iosHeader="Select one"
              mode="dropdown"
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}>
              <Item label="Company 1" value="key0" />
              <Item label="Company 2" value="key1" />
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
export default withData(withApollo(TabAtributes));
