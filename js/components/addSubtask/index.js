
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { createSubtask } from './addItem.gquery';
import { withApollo, graphql } from 'react-apollo';
const {
  pushRoute,
} = actions;

class AddItem extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    pushRoute: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  pushRoute(route) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }


  constructor(props) {
    super(props);
    this.state = {
      subtaskName:'',
      subtaskDescription:'',
      assignedTo:null,
    };
  }

  submit(){
    let name = this.state.subtaskName;
    let description = this.state.description;
    let userId = this.state.assignedTo;
    let taskId = this.props.id;
    this.props.client.mutate({
          mutation: createSubtask,
          variables: { name,userId, taskId, description },
        });
    Actions.pop();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add subtask</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
        <Text note>Name</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.subtaskName}
            onChangeText={ value => this.setState({subtaskName:value}) }
          />
        </View>

        <Text note>Description</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.description}
            onChangeText={ value => this.setState({description:value}) }
          />
        </View>

          <Text note>Assigned to:</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              selectedValue={this.state.assignedTo}
              onValueChange={(value)=>this.setState({assignedTo:value})}>
              {([{id:null,firstName:"None"}].concat(this.props.users)).map(
                (unit)=> <Item label={unit.firstName} key={unit.id} value={unit.id} />
              )}
            </Picker>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="trash" />
              <Text style={{ color: 'white' }} >Delete</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Save</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  themeState: state.drawer.themeState,
  users: state.updateUsers.users,
});

export default withApollo(connect(mapStateToProps, bindAction)(AddItem));
