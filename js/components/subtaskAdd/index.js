
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { createSubtask } from './subtaskAdd.gquery';
import { withApollo, graphql } from 'react-apollo';
import I18n from '../../translations/';

class SubtaskAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subtaskName:'',
    };
  }

  submit(){
    let name = this.state.subtaskName;
    let taskId = this.props.id;
    this.props.client.mutate({
          mutation: createSubtask,
          variables: { name,taskId },
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
            <Title>{I18n.t('taskEditAddSubtask')}</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
        <Text note>{I18n.t('title')}</Text>
        <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
          <Input
            value={this.state.subtaskName}
            onChangeText={ value => this.setState({subtaskName:value}) }
          />
        </View>

        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="trash" />
              <Text style={{ color: 'white' }} >{I18n.t('delete')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={this.submit.bind(this)} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


export default withApollo(SubtaskAdd);
