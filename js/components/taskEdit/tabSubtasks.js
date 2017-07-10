
import React, { Component } from 'react';
import { Right, Left, Container, Content, Card, CardItem, Text, Body, Footer, FooterTab, Button, Icon, CheckBox } from 'native-base';
import { withApollo } from 'react-apollo';
import styles from './styles';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator, Alert } from 'react-native';
import { changedSubtaskSubscription, deleteSubtask, updateSubtask } from './taskEdit.gquery';

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
      'Deleting subtask',
      'Are you sure you want to delete subtask named '+subtask,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () =>{
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
                <Text note>Name</Text>
              </Left>
              <Right>
                <Text>{subtask.name}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Text note>Description</Text>
              </Left>
              <Right>
                <Text>{subtask.description}</Text>
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Text note>Assigned to:</Text>
              </Left>
              <Right>
                <Text>{subtask.user?subtask.user.firstName:'Nikto'}</Text>
              </Right>
            </CardItem>


              <CardItem>
                <Left>
                  <Button active block onPress={()=>this.deleteSubtask(subtask.id,subtask.name)}>
                  <Icon name="trash" />
                  <Text>Delete</Text>
                  </Button>
                </Left>
                <Right>
                  <Button active block onPress={()=>{this.changeSubtaskStatus(!subtask.finished,subtask.id)}}>
                  <Text>Finished?</Text>
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
          <Button onPress={()=>Actions.addSubtask({id:this.props.id})} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Subtask</Text>
          </Button>
        </FooterTab>
      </Footer>
      </Container>
    );
  }
}
export default withApollo(Subtasks);
