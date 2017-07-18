
import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon, CheckBox } from 'native-base';
import { withApollo } from 'react-apollo';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { changedSubtaskSubscription, deleteSubtask, updateSubtask } from './taskEdit.gquery';
import I18n from '../../translations/';

class Subtasks extends Component { // eslint-disable-line
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.data.subscribeToMore({
      document: changedSubtaskSubscription,
      updateQuery: () => {
        this.props.data.refetch();
        return;
      },
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
  changeSubtaskStatus(finished,id){
    this.props.client.mutate({
          mutation: updateSubtask,
          variables: {finished,id},
        });
  }

  render() {
    if(this.props.data.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
        {
          this.props.data.allSubtasks.map((subtask)=>
            <Card key={subtask.id}>
            <CardItem>
              <Left>
                <Text note>{I18n.t('title')}</Text>
              </Left>
              <Right>
                <Text>{subtask.name}</Text>
              </Right>
            </CardItem>

              <CardItem>
                <Left>
                  <Button active block onPress={()=>this.deleteSubtask(subtask.id,subtask.name)}>
                  <Icon name="trash" />
                  <Text>{I18n.t('delete')}</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>{this.changeSubtaskStatus(!subtask.finished,subtask.id)}}>
                  <Text>{I18n.t('taskEditFinished')}</Text>
                  {
                    subtask.finished?<Text style={styles.checkboxText}>✓</Text>:<Text style={styles.checkboxText}>X</Text>
                  }
                  </Button>
                </Right>
              </CardItem>
            </Card>
          )
        }

      </Content>
      <Footer>
        <FooterTab>
          <Button onPress={()=>Actions.subtaskAdd({id:this.props.id})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('taskEditSubtask')}</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
export default withApollo(Subtasks);
