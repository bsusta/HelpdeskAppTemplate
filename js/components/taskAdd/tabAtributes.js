
import React, { Component } from 'react';
import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker, ListItem, Header,Title } from 'native-base';
import { withApollo, graphql } from 'react-apollo';
import styles from './styles';
import { connect } from 'react-redux';
import { createTask, users, companies,projects,editedTasksSubscription,editedProjectsSubscription,createRepeat, updateRepeat } from './taskAdd.gquery';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator , Modal } from 'react-native';
import DatePicker from 'react-native-datepicker';
import I18n from '../../translations/';
import AutoComplete from 'react-native-autocomplete-select';

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
      descriptionHeight:50,
      addingRepeatition:false,
      startDate:null,
      every:'',
      repeated:'Day',
      repetitionNumber:'',
      errorMessage:'',
      companyQuery:'',
      pendingAt:null,
      closedAt:null,
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
  finishRepetitionAdding(){
    if(this.state.startDate==null){
      this.setState({errorMessage:I18n.t('taskAddEmptyDate')});
    }
    else if(this.state.every==''){
      this.setState({errorMessage:I18n.t('taskAddEveryError')});
    }
    else{
      this.setState({addingRepeatition:false,errorMessage:''});
    }

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
  setEvery(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input[0]=='0'){
      this.setState({every:''});
    }
    else{
      this.setState({every:input});
    }
  }
  setRepetitionNumber(input){
    if(!/^\d*$/.test(input)){
      return;
    }
    if(input.length==2 && input[0]=='0'){
      this.setState({repetitionNumber:input[1]});
    }
    else{
      this.setState({repetitionNumber:input});
    }
  }

  submitForm(){
    let deadlineAt=this.state.deadline!=null?this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z':null;
    if(deadlineAt=='--TZ'){
      deadlineAt=null;
    }
    let pendingAt=this.state.pendingAt!=null?this.state.pendingAt.substring(6,10)+'-'+this.state.pendingAt.substring(3,5)+'-'+this.state.pendingAt.substring(0,2)+'T'+this.state.pendingAt.substring(11)+'Z':null;
    if(pendingAt=='--TZ'){
      pendingAt=null;
    }
    let closedAt=this.state.closedAt!=null?this.state.closedAt.substring(6,10)+'-'+this.state.closedAt.substring(3,5)+'-'+this.state.closedAt.substring(0,2)+'T'+this.state.closedAt.substring(11)+'Z':null;
    if(closedAt=='--TZ'){
      closedAt=null;
    }


    let startDate=this.state.startDate!=null?this.state.startDate.substring(6,10)+'-'+this.state.startDate.substring(3,5)+'-'+this.state.startDate.substring(0,2)+'T'+this.state.startDate.substring(11)+'Z':null;
    if(startDate=='--TZ'){
      startDate=null;
    }

    let title = this.state.taskName;
    let description = this.state.taskDescription;
    let client = this.props.client;
    let createdById= this.props.loggedUserId;
    let assignedUserId = this.state.assignedUserId;
    let duration = this.state.duration==''?0:parseInt(this.state.duration);
    let statusId= this.state.status!=''?this.state.status.id:'cj3odok71qrr10128le4rkzno';
    let requesterId=this.state.requesterUserId;
    let companyId=this.state.company;
    let projectId=this.state.project;

    let every=parseInt(this.state.every);
    let repeated=this.state.repeated;
    let times=parseInt(this.state.repetitionNumber==''?0:this.state.repetitionNumber);
    let repeatId=null;
    if(startDate!=null){
      client.mutate({
            mutation: createRepeat,
            variables: { every, repeated, startDate, times},
          }).then((result)=>{
            repeatId=result.data.createRepeat.id;
            client.mutate({
              mutation: createTask,
              variables: { title, description, assignedUserId, deadlineAt,createdById,duration,statusId,requesterId,companyId,projectId,closedAt, pendingAt },
            }).then((result2)=>{
              client.mutate({
                    mutation: updateRepeat,
                    variables: {id:repeatId, taskId:result2.data.createTask.id},
                  });
            });
          })

    }    else{
      client.mutate({
        mutation: createTask,
        variables: { title, repeatId, description, assignedUserId, deadlineAt,createdById,duration,statusId,requesterId,companyId,projectId,closedAt, pendingAt },
      });
    }


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

          <Text note>{I18n.t('taskAddRepeatition')}</Text>
            <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>

              <Button block iconLeft onPress={()=>this.setState({addingRepeatition:true})}>
                <Icon active name="refresh" style={{ color: 'white' }} />
                <Text style={{ color: 'white' }} >{this.state.startDate==null ? I18n.t('taskAddTaskAddRepeatition') : I18n.t('every')+' '+this.state.every+' '+I18n.t(this.state.repeated.toLowerCase())}</Text>
              </Button>
            </View>
            <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.addingRepeatition}
              onRequestClose={() => this.setState({addingRepeatition:false})}
              >
              <Header>
                <Body>
                  <Title>{I18n.t('taskAddTaskAddRepeatition')}</Title>
                </Body>
              </Header>

              <Content style={{ padding: 15 }}>
               <Text note>{I18n.t('taskAddStartDate')}</Text>
               <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
                 <DatePicker
                   date={this.state.startDate}
                   style={{width:380}}
                   mode="datetime"
                   placeholder={I18n.t('taskAddStartDate')}
                   showIcon={false}
                   androidMode="spinner"
                   format="DD.MM.YYYY HH:MM"
                   confirmBtnText={I18n.t('confirm')}
                   cancelBtnText={I18n.t('cancel')}
                   is24Hour={true}
                   onDateChange={(date) => {this.setState({startDate: date})}}
                 />
              </View>

             <Text note>{I18n.t('taskAddEvery')}</Text>
             <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
               <Input
               keyboardType='numeric'
               placeholder={ I18n.t('number')}
               value={ this.state.every }
               onChangeText={ value => this.setEvery(value) }
               />
             </View>

             <Text note>{I18n.t('time')}</Text>
             <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
               <Picker
                 supportedOrientations={['portrait', 'landscape']}
                 iosHeader={I18n.t('selectOne')}
                 mode="dropdown"
                 selectedValue={this.state.repeated}
                 onValueChange={(value)=>{this.setState({repeated : value})}}>
                 <Item label={I18n.t('day')} value={'Day'} />
                 <Item label={I18n.t('week')} value={'Week'} />
                 <Item label={I18n.t('month')} value={'Month'} />
                 <Item label={I18n.t('year')} value={'Year'} />
                </Picker>
             </View>

             <Text note>{I18n.t('taskAddRepetitionNumber')}</Text>
             <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
               <Input
               keyboardType='numeric'
               placeholder={ I18n.t('taskAddRepetitionNumberPlaceholder')}
               value={ this.state.repetitionNumber }
               onChangeText={ value => this.setRepetitionNumber(value) }
               />
             </View>
            <Text style={{color:'red'}}>{this.state.errorMessage}</Text>

            </Content>
            <Footer>
              <FooterTab>
                <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={()=>this.setState({errorMessage:'',addingRepeatition:false, startDate:null, every:'0', repeated:'Day', repetitionNumber:''})}>
                  <Text style={{ color: 'white' }} >{I18n.t('cancel')}</Text>
                </Button>
              </FooterTab>

              <FooterTab>
                <Button style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}
                onPress={this.finishRepetitionAdding.bind(this)}
                >
                  <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Modal>

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
              style={{height:Math.max(35, this.state.descriptionHeight)}}
              multiline={true}
              onChange={ event => this.setState({taskDescription:event.nativeEvent.text,descriptionHeight:event.nativeEvent.contentSize.height}) }
              placeholder={I18n.t('taskAddDescriptionLabel')}
              value={ this.state.taskDescription }
            />
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
          <AutoComplete
            onSelect={(value)=>this.setState({companyQuery:value.name,company:value.id})}
            suggestions={[{id:null,key:'',name:I18n.t('none')}].concat(this.props.companies)}
            suggestionObjectTextProperty='name'
            value={this.state.companyQuery}
            onChangeText={(value)=>this.setState({companyQuery:value})}
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

          <Text note>{I18n.t('pendingAt')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <DatePicker
              date={this.state.pendingAt}
              style={{width:380}}
              mode="datetime"
              placeholder={I18n.t('pendingAt')}
              showIcon={false}
              androidMode="spinner"
              format="DD.MM.YYYY HH:MM"
              confirmBtnText={I18n.t('confirm')}
              cancelBtnText={I18n.t('cancel')}
              is24Hour={true}
              onDateChange={(date) => {this.setState({pendingAt: date})}}
            />
          </View>

          <Text note>{I18n.t('closedAt')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <DatePicker
              date={this.state.closedAt}
              style={{width:380}}
              mode="datetime"
              placeholder={I18n.t('closedAt')}
              showIcon={false}
              androidMode="spinner"
              format="DD.MM.YYYY HH:MM"
              confirmBtnText={I18n.t('confirm')}
              cancelBtnText={I18n.t('cancel')}
              is24Hour={true}
              onDateChange={(date) => {this.setState({closedAt: date})}}
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
          <Button style={this.state.status==''?{flex:1}:{backgroundColor:this.state.status.color,flex:1}} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status==''?'Choose status':this.state.status.name}</Text></Button>
          {
            this.state.pickingStatus && this.props.statuses.map((status)=>
            this.state.status!=status &&
            <Button style={{backgroundColor:status.color}} onPress={()=>this.setState({status:status,pickingStatus:false})} key={status.id} >
            <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.name}</Text>
            </Button>)
          }
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
