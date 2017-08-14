import React, { Component } from 'react';
import { View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker,  ListItem, Header,Title , Left, Right, List } from 'native-base';
import { ActivityIndicator, Modal } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import { updateTask, editedProjectsSubscription, deleteRepeat,updateRepeat, createRepeat } from './taskEdit.gquery';
import { Actions } from 'react-native-router-flux';
import { withApollo, graphql } from 'react-apollo';
import DatePicker from 'react-native-datepicker';
import I18n from '../../translations/';
import moment from 'moment';

class TabAtributes extends Component {
  constructor(props) {
    super(props);
    let date=new Date(this.props.data.deadlineAt);
    let date3=new Date(this.props.data.pendingAt);
    let date2=null;
    if(this.props.data.repeat){
      date2=new Date(this.props.data.repeat.startDate);
    }

    this.state = {
      taskName:this.props.data.title,
      taskDescription:this.props.data.description,
      deadline:this.props.data.deadlineAt?date.toGMTString():null,
      assignedTo:this.props.data.assignedUser?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.data.assignedUser.id)]:null,
      requester:this.props.data.requester?this.props.users[this.props.users.findIndex((item)=>item.id==this.props.data.requester.id)]:null,
      status:this.props.data.status?this.props.data.status:this.props.statuses[0],
      duration:this.props.data.duration?this.props.data.duration.toString():'0',
      descriptionHeight:100,
      company:this.props.data.company?this.props.companies[this.props.companies.findIndex((item)=>item.id==this.props.data.company.id)]:null,
      project:this.props.data.project?this.props.data.project.id:this.props.projectList[0].id,
      addingRepeatition:false,
      startDate:this.props.data.repeat?date2.toGMTString():null,
      every:this.props.data.repeat?this.props.data.repeat.every.toString():'',
      repeated:this.props.data.repeat?this.props.data.repeat.repeated:'Day',
      repetitionNumber:this.props.data.repeat?this.props.data.repeat.times.toString():'',
      errorMessage:'',
      pendingAt:this.props.data.pendingAt?date3.toGMTString():null,
      statusChangedAt:this.props.data.statusChangedAt?this.props.data.statusChangedAt.toString():'',
      selectingCompany:false,
      filterWord:'',
      selectingRequester:false,
      filterWordRequester:'',
      selectingAssignedTo:false,
      filterWordAssignedTo:'',
    }
    this.setWorkTime.bind(this);
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
    let deadlineAt=new Date(this.state.deadline)=="Invalid Date"?(this.state.deadline.substring(6,10)+'-'+this.state.deadline.substring(3,5)+'-'+this.state.deadline.substring(0,2)+'T'+this.state.deadline.substring(11)+'Z'):this.props.data.deadlineAt;

    let pendingAt=new Date(this.state.pendingAt)=="Invalid Date"?(this.state.pendingAt.substring(6,10)+'-'+this.state.pendingAt.substring(3,5)+'-'+this.state.pendingAt.substring(0,2)+'T'+this.state.pendingAt.substring(11)+'Z'):this.props.data.pendingAt;

    let statusChangedAt=this.props.data.status.id==this.state.status.id?this.props.statusChangedAt:moment().format();

    let title = this.state.taskName;
    let description = this.state.taskDescription;
    let client = this.props.client;
    let id = this.props.data.id;
    let assignedUserId = this.state.assignedTo?this.state.assignedTo.id:null;
    let requesterId=this.state.requester?this.state.requester.id:null;
    let duration = this.state.duration==''?0:parseInt(this.state.duration);
    let statusId= this.state.status!=''?this.state.status.id:this.props.data.status.id;
    let companyId=this.state.company.id;
    let projectId=this.state.project;
    let startDate=new Date(this.state.startDate)=="Invalid Date"?(this.state.startDate.substring(6,10)+'-'+this.state.startDate.substring(3,5)+'-'+this.state.startDate.substring(0,2)+'T'+this.state.startDate.substring(11)+'Z'):(this.props.data.repeat?this.props.data.repeat.startDate:null);
    let every=parseInt(this.state.every);
    let repeated=this.state.repeated;
    let times=parseInt(this.state.repetitionNumber==''?0:this.state.repetitionNumber);
    if(this.state.every!=''){
      if(this.props.data.repeat){//update
        client.mutate({
          mutation: updateTask,
          variables: {title, description, id, assignedUserId,deadlineAt,duration,statusId,requesterId,companyId,projectId,repeatId:this.props.data.repeat.id,statusChangedAt,pendingAt},
        });
        client.mutate({
          mutation: updateRepeat,
          variables: {id:this.props.data.repeat.id,startDate,every, repeated, times},
        });

      }
      else{//create
        client.mutate({
          mutation: createRepeat,
          variables: { every, repeated, startDate, times,taskId:id},
        }).then((result)=>{
          repeatId=result.data.createRepeat.id;
          client.mutate({
            mutation: updateTask,
            variables: {title, description, id, assignedUserId,deadlineAt,duration,statusId,requesterId,companyId,projectId,repeatId,statusChangedAt,pendingAt},
          });
        });

      }
    }
    else{
      if(this.props.data.repeat){//delete
        client.mutate({
          mutation: deleteRepeat,
          variables: { id:this.props.data.repeat.id},
        });
        client.mutate({
          mutation: updateTask,
          variables: {title, description, id, assignedUserId,deadlineAt,duration,statusId,requesterId,companyId,projectId,repeatId:null,statusChangedAt,pendingAt},
        });

      }
      else{//just update
        client.mutate({
          mutation: updateTask,
          variables: {title, description, id, assignedUserId,deadlineAt,duration,statusId,requesterId,companyId,projectId,statusChangedAt,pendingAt},
        });
      }
    }


    Actions.pop();
  }

  render() {

    let statusButtonStyle={flex:1};
    if(this.state.status=='' && this.props.data.status){
      statusButtonStyle={backgroundColor:this.props.data.status.color,flex:1};
    }
    else if (this.state.status!='') {
      statusButtonStyle={backgroundColor:this.state.status.color,flex:1};
    }
    return (
      <Container>
        <Content style={{ padding: 15 }}>



          <Text note>{I18n.t('taskAddTaskName')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              placeholder={I18n.t('taskAddTaskNameLabel')}
              value={ this.state.taskName }
              onChangeText={ value => this.setState({taskName:value}) }
            />
          </View>
          <View style={{flexDirection:'row'}}>
            <Text note>{I18n.t('status')}</Text>
            <Text note  style={{textAlign: 'right',flex:1}}>{this.state.statusChangedAt}</Text>
          </View>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button style={statusButtonStyle} onPress={()=>this.setState({pickingStatus:!this.state.pickingStatus})}><Text style={{color:'white',flex:1,textAlign:'center'}}>{this.state.status =='' && this.props.data.status ? this.props.data.status.name : this.state.status ==''?'Choose status':this.state.status.name}</Text></Button>
              {
                  this.state.pickingStatus && this.props.statuses.map((status)=>
                      this.state.status!=status && !(this.props.data.status.id==status.id && this.state.status=='') &&
                      <Button style={{backgroundColor:status.color,flex:1}} onPress={()=>this.setState({status:status,pickingStatus:false})} key={status.id} >
                        <Text style={{color:'white',flex:1,textAlign:'center'}}>{status.name}</Text>
                      </Button>)
              }
          </View>

          <Text note>{I18n.t('taskAddDescription')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input
              style={{height:Math.max(35, this.state.descriptionHeight)}}
              multiline={true}
              onChange={ event => this.setState({taskDescription:event.nativeEvent.text,descriptionHeight:event.nativeEvent.contentSize.height}) }
              value={ this.state.taskDescription }
              placeholder={I18n.t('taskAddDescriptionLabel')}
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
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingRequester:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.requester==null ? I18n.t('taskAddSelectUser') : (
                  (this.state.requester.firstName||this.state.requester.surName)?<Text>
                    {
                    this.state.requester.firstName?
                    this.state.requester.firstName+' ':
                    ''+this.state.requester.surName?this.state.requester.surName:''
                  }</Text>:
                <Text>{this.state.requester.email}</Text>

                )}</Text>
              </Left>
            </Button>
          </View>

          <Text note>{I18n.t('assignedTo')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingAssignedTo:true})}>
            <Left>
              <Text style={{textAlign:'left',color:'black'}}>{this.state.assignedTo==null ? I18n.t('taskAddSelectUser') : (
                (this.state.assignedTo.firstName||this.state.assignedTo.surName)?<Text>
                  {
                  this.state.assignedTo.firstName?
                  this.state.assignedTo.firstName+' ':
                  ''+this.state.assignedTo.surName?this.state.assignedTo.surName:''
                }</Text>:
              <Text>{this.state.assignedTo.email}</Text>

              )}</Text>
            </Left>
            </Button>
          </View>

          <Text note>{I18n.t('company')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Button block style={{backgroundColor:'white'}} onPress={()=>this.setState({selectingCompany:true})}>
              <Left>
                <Text style={{textAlign:'left',color:'black'}}>{this.state.company==null ? I18n.t('taskAddCompanySelect') : this.state.company.name}</Text>
              </Left>
            </Button>
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


          <Text note>{I18n.t('workHours')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.duration}
            keyboardType='numeric'
            onChangeText={ value => this.setWorkTime(value) }
          />
          </View>

          <Text note>{I18n.t('taskAddRepeatition')}</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 30 }}>
            <Button block iconLeft onPress={()=>this.setState({addingRepeatition:true})}>
              <Icon active name="refresh" style={{ color: 'white' }} />
              <Text style={{ color: 'white' }} >{this.state.startDate==null ? I18n.t('taskAddTaskAddRepeatition') : I18n.t('every')+' '+this.state.every+'. '+I18n.t(this.state.repeated.toLowerCase())}</Text>
            </Button>
          </View>
          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.addingRepeatition}
              onRequestClose={() => this.setState({addingRepeatition:false})}>
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
              <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 30 }}>
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

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingCompany}
              onRequestClose={() => this.setState({selectingCompany:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelect')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWord} onChangeText={((value)=>this.setState({filterWord:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              this.props.companies.map((company) =>
              company.name.toLowerCase().includes(this.state.filterWord.toLowerCase()) && <ListItem button key={company.id} onPress={()=>this.setState({company:company,selectingCompany:false})} >
                <Body>
                  <Text>{company.name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingRequester}
              onRequestClose={() => this.setState({selectingRequester:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelectRequester')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWordRequester} onChangeText={((value)=>this.setState({filterWordRequester:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,firstName:I18n.t('nobody'), email:I18n.t('none')}]).concat(this.props.users)).map((user) =>
              (user.email+user.firstName+' '+user.surName+' '+user.firstName).toLowerCase().includes(this.state.filterWordRequester.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({requester:user,selectingRequester:false})} >
                <Body>
                {(user.firstName||user.surName)&& <Text>{user.firstName?user.firstName+' ':''+user.surName?user.surName:''}</Text> }
                <Text note>{user.email}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

          <Modal
              animationType={"fade"}
              transparent={false}
              style={{flex:1}}
              visible={this.state.selectingAssignedTo}
              onRequestClose={() => this.setState({selectingAssignedTo:false})}>
            <Header>
              <Body>
              <Title>{I18n.t('taskAddCompanySelectAssignedTo')}</Title>
              </Body>
            </Header>
            <Content style={{ padding: 15 }}>

            <ListItem>
              <Item rounded>
                <Icon name="ios-search" />
                <Input placeholder={I18n.t('search')} value={this.state.filterWordAssignedTo} onChangeText={((value)=>this.setState({filterWordAssignedTo:value}))} />
              </Item>
            </ListItem>

            <List>
            {
              (([{id:null,firstName:I18n.t('nobody'), email:I18n.t('none')}]).concat(this.props.users)).map((user) =>
              (user.email+user.firstName+' '+user.surName+' '+user.firstName).toLowerCase().includes(this.state.filterWordAssignedTo.toLowerCase()) &&
              <ListItem button key={user.id} onPress={()=>this.setState({assignedTo:user,selectingAssignedTo:false})} >
                <Body>
                {(user.firstName||user.surName)&& <Text>{user.firstName?user.firstName+' ':''+user.surName?user.surName:''}</Text> }
                <Text note>{user.email}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            )
            }
            </List>
            </Content>
          </Modal>

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
  users: state.updateUsers.users,
  companies: state.updateCompanies.companies,
  statuses:state.statuses.statuses,
});
function bindAction(dispatch) {
  return {
  };
}
export default withApollo(connect(mapStateToProps,bindAction)(TabAtributes));
