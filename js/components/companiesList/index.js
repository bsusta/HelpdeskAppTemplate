
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';



class CompaniesList extends Component {


  constructor(props) {
    super(props);
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
            <Title>Companies list</Title>
          </Body>
        </Header>
        <Content>
          <List
          dataArray={this.props.companies}
          renderRow={(company)=>
            <ListItem
              button onPress={()=>Actions.editCompany({company})}
            >
              <Body>
                <Text>{company.name}</Text>
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
            <Button onPress={Actions.addCompany} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >Company</Text>
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
  companies: state.updateCompanies.companies,
});

export default connect(mapStateToProps, bindAction)(CompaniesList);
