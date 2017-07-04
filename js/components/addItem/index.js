
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { ActivityIndicator } from 'react-native';

import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { units } from './addItem.gquery';
import { withApollo, graphql } from 'react-apollo';

const {
  pushRoute,
} = actions;
const withData = graphql(units, {
  props: ({ data: { loading, allUnits, error, refetch, subscribeToMore } }) => ({
    loadingUnits: loading,
    units: allUnits,
    usersError: error,
    refetch,
    subscribeToMore,
  }),
});

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
      unit:null
    };
  }


  render() {
    if(this.props.loadingUnits){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Add item</Title>
          </Body>
        </Header>
        <Content style={{ padding: 15 }}>
          <Text note>Name</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
          </View>
          <Text note>Price/unit</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
          </View>
          <Text note>Unit</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Picker
              supportedOrientations={['portrait', 'landscape']}
              selectedValue={this.state.unit}
              onValueChange={(value)=>this.setState({unit:value})}>
              {([{id:null,name:"None"}].concat(this.props.units)).map(
                (unit)=> <Item label={unit.name} key={unit.id} value={unit.id} />
              )}
            </Picker>
          </View>
          <Text note>Quantity</Text>
          <View style={{ borderColor: '#CCCCCC', borderWidth: 0.5, marginBottom: 15 }}>
            <Input />
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
            <Button onPress={Actions.pop} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
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
});

export default withData(connect(mapStateToProps, bindAction)(AddItem));
