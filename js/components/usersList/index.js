
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';


class usersList extends Component {
  constructor(props) {
    super(props);
    this.state={seached:''}
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
            <Title>Users list</Title>
          </Body>
        </Header>
        <Content>
        <Item rounded>
          <Icon name="ios-search" />
          <Input placeholder="Search"
          value={this.state.seached}
          onChangeText={((value)=>this.setState({seached:value}))} />
        </Item>

          <List
            dataArray={
              this.props.users.filter((user)=>
              {
                let filter=this.state.seached.toLowerCase();
                return (user.firstName&&user.firstName.toLowerCase().includes(filter))||(user.surName&&user.surName.toLowerCase().includes(filter))||(user.email&&user.email.toLowerCase().includes(filter))||(user.company&&user.company.name&&user.company.name.toLowerCase().includes(filter))
              })
              }
            renderRow={(user)=>
              <ListItem
                button onPress={()=>Actions.editUser({user})}
              >
                <Body>
                  {(user.firstName || user.surName) && <Text>{user.firstName?user.firstName:''} {user.surName?user.surName:''}</Text>}
                  {user.email  && <Text note>{user.email}</Text>}
                  {!user.email && !user.firstName && !user.surName && <Text note>{user.email}</Text>}
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            }
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={Actions.addUser} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >User</Text>
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

export default connect(mapStateToProps, bindAction)(usersList);
