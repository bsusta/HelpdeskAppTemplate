
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import I18n from '../../translations/';


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
            <Title>{I18n.t('settingsCompaniesListTitle')}</Title>
          </Body>
        </Header>
        <Content>
        <Item rounded style={{marginTop:15,marginBottom:15,marginLeft: 20, marginRight: 20,}}>
          <Icon name="ios-search" />
          <Input placeholder={I18n.t('search')}
          value={this.state.seached}
          onChangeText={((value)=>this.setState({seached:value}))} />
        </Item>
          <List
          dataArray={this.props.companies.filter((company)=>company.name.toLowerCase().includes(this.state.seached.toLowerCase()))}
          renderRow={(company)=>
            <ListItem
              button onPress={()=>Actions.companyEdit({company})}
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
            <Button onPress={Actions.companyAdd} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
              <Icon active style={{ color: 'white' }} name="add" />
              <Text style={{ color: 'white' }} >{I18n.t('company')}</Text>
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
