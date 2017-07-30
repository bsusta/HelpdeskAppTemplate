
import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon, CheckBox,Item, ListItem, List, View, Input } from 'native-base';
import { withApollo } from 'react-apollo';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import { changedSubtaskSubscription, deleteSubtask, updateSubtask, createSubtask, subtasks } from './taskEdit.gquery';
import I18n from '../../translations/';
import gql from 'graphql-tag';

class Subtasks extends Component { // eslint-disable-line
  constructor(props){
    super(props);
    this.state={
      subtaskName:'',
    }
  }
  componentWillMount(){
    this.props.subscribeToMore({
      document: changedSubtaskSubscription,
      updateQuery: () => {
        this.props.refetch();
        return;
      },
    });
  }

  submit(){
    let name = this.state.subtaskName;
    let taskId = this.props.id;
    this.props.client.mutate({
      mutation: createSubtask,
      variables: { name,taskId },
    });
    this.setState({
      subtaskName:'',
    });
  }

  deleteSubtask(subtaskId,subtask){
    Alert.alert(
      I18n.t('taskEditdeletingSubtask'),
      I18n.t('taskEditdeletingSubtaskMessage')+subtask,
      [
        {text: I18n.t('cancel'), style: 'cancel'},
        {text: I18n.t('ok'), onPress: () =>{
          this.props.client.mutate({
            mutation: deleteSubtask,
            variables: { subtaskId},
          });
        }},
      ],
      { cancelable: false }
    )
  }

  render() {
    if(this.props.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
        <List>
        {
          this.props.allSubtasks.map((subtask)=>
            <ListItem thumbnail key={subtask.id}>
            <Left>
            <CheckBox checked={subtask.finished} color='#3F51B5' onPress={()=>{
                let newFinished=!subtask.finished;
                this.props.client.mutate({
                  mutation: updateSubtask,
                  optimisticResponse: {
                    updateSubtask:{
                      finished: newFinished,
                      __typename:'Subtask'
                    }
                  },
                  variables: {finished:newFinished,id:subtask.id},
                  update: (proxy, { data: { updateSubtask } }) => {
                  let data = proxy.readQuery({ query:subtasks,variables:{id:this.props.id}});
                  let index = data.allSubtasks.findIndex((element)=>element.id==subtask.id);
                  data.allSubtasks[index].finished=updateSubtask.finished;
                  proxy.writeQuery({ query:subtasks,variables:{id:this.props.id}, data });
                },
              });
            }
          }
            />
            </Left>
            <Body>
              <Text>{subtask.name}</Text>
            </Body>

            <Right>
              <Button active block style={{backgroundColor:'white'}} onPress={()=>this.deleteSubtask(subtask.id,subtask.name)}>
                <Icon name="trash" style={{color:'#3F51B5'}} />
              </Button>
            </Right>

            </ListItem>
          )
        }
        </List>
      </Content>
      <Footer>
        <FooterTab style={{flex:6,backgroundColor:'white'}}>
        <Input
          style={{flex:1,flexDirection:'column',borderColor:'#3F51B5',borderWidth:1}}
          multiline={true}
          onChange={ event => this.setState({message:event.nativeEvent.text,subtaskHeight:event.nativeEvent.contentSize.height}) }
          value={this.state.subtaskName}
          label={I18n.t('taskEditAddSubtask')}
          onChangeText={ value => this.setState({subtaskName:value}) }
        />
        </FooterTab>
        <FooterTab style={{flex:1}}>
        <Button onPress={this.submit.bind(this)} style={{ borderColor: 'white',flex:1, borderWidth: 0.5 }}>
          <Icon active style={{ color: 'white' }} name="add" />
        </Button>
        </FooterTab>
     </Footer>

      </Container>
    );
  }
}
export default withApollo(Subtasks);
