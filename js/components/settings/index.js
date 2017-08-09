
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { withApollo} from 'react-apollo';
import I18n from '../../translations/';
import {createUser,createTask,createCompany} from './query';



class Settings extends Component {
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
            <Title>{I18n.t('settingsTitle')}</Title>
          </Body>
          <Right>
         </Right>
        </Header>
        <Content>
          <ListItem button onPress={Actions.usersList} icon>
            <Left>
              <Icon name="person" />
            </Left>
            <Body>
              <Text>{I18n.t('settingsUsers')}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem button onPress={Actions.companiesList} icon>
            <Left>
              <Icon name="people" />
            </Left>
            <Body>
              <Text>{I18n.t('settingsCompanies')}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem button onPress={Actions.projectList} icon>
            <Left>
              <Icon name="book" />
            </Left>
            <Body>
              <Text>{I18n.t('settingsProjects')}</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>

          <ListItem icon>
            <Left>
              <Icon name="exit" />
            </Left>
            <Body>
              <Text>
                {I18n.t('logOut')}
              </Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.userAdd} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('settingsUser')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={Actions.companyAdd} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('company')}</Text>
            </Button>
          </FooterTab>
          <FooterTab>
            <Button onPress={Actions.projectAdd} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('project')}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withApollo(Settings);
