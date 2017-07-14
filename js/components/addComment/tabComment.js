
import React, { Component } from 'react';

import { Title, Header, Left, Right, View, Card, CardItem, Body, Container, Content, Icon, Input, Item, Label, Text, Footer, FooterTab, Button, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { withApollo} from 'react-apollo';
import { createComment } from './addComment.gquery';
import { connect } from 'react-redux';



class TabComment extends Component { // eslint-disable-line
    constructor(props) {
      super(props);
      this.state = {
        message:'',
      };
    }

    submitForm(){
      let content=this.state.message;
      let userId = this.props.loggedUserId;
      let taskId = this.props.id;
      this.props.client.mutate({
            mutation: createComment,
            variables: { content, userId, taskId },
          });
      Actions.pop();
    }
    render() {
      return (
        <Container style={styles.container}>
          <Content style={{ padding: 15 }}>
              <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15}}>
              <Input
                style={{height:100}}
                multiline={true}
                placeholder='Zadajte správu'
                value={this.state.message}
                onChangeText={ value => this.setState({message:value}) }
              />
            </View>
          </Content>
          <Footer>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
                <Icon active style={{ color: 'white' }} name="trash" />
                <Text style={{ color: 'white' }} >Cancel</Text>
              </Button>
            </FooterTab>
            <FooterTab>
              <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={this.submitForm.bind(this)}>
                <Icon active style={{ color: 'white' }} name="add" />
                <Text style={{ color: 'white' }} >Add</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }


  const mapStateToProps = state => ({
    loggedUserId:state.logInUser.id,
  });

  function bindAction(dispatch) {
    return {
    };
  }
  export default withApollo(connect(mapStateToProps,bindAction)(TabComment));
