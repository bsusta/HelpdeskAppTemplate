
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';



class CompaniesList extends Component {
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
            <Title>Companies list</Title>
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
          dataArray={this.props.companies.filter((company)=>company.name.toLowerCase().includes(this.state.seached.toLowerCase()))}
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
  };
}

const mapStateToProps = state => ({
  companies: state.updateCompanies.companies,
});

export default connect(mapStateToProps, bindAction)(CompaniesList);
