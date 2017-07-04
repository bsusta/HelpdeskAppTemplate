
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabAtributes from './tabAtributes';
import TabComments from './tabComments';
import TabItems from './tabItems';
import { comments, invoiceItems } from './taskEdit.gquery';


import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { graphql } from 'react-apollo';

const {
  pushRoute,
} = actions;



class TaskEdit extends Component {
  constructor(props){
    super(props);
  }
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

  render() {
    const withData = graphql(comments,{options:{variables:{
      id:this.props.data.id,
    },
      props: ({ data: { loading, allComments, error, refetch, subscribeToMore } }) => ({
        loading,
        allComments,
        error,
        refetch,
        subscribeToMore,
      })
    }});
    const HOCTabComments=withData(TabComments);
    const withData2 = graphql(invoiceItems,{options:{variables:{
      id:this.props.data.id,
    },
      props: ({ data: { loading, allInvoiceItems, error, refetch, subscribeToMore } }) => ({
        loading,
        allInvoiceItems,
        error,
        refetch,
        subscribeToMore,
      })
    }});
    const HOCTabItems=withData2(TabItems);

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          <Button transparent onPress={() => Actions.pop()}>
            <Icon name="arrow-back" />
          </Button>
          </Left>
          <Body>
            <Title>Edit task</Title>
          </Body>
          <Right />
        </Header>
           <Tabs>
               <Tab heading="Attributes">
                   <TabAtributes data={this.props.data} />
               </Tab>
               <Tab heading="Comments">
                   <HOCTabComments id={this.props.data.id}/>
               </Tab>
               <Tab heading="Items">
                   <HOCTabItems id={this.props.data.id}/>
               </Tab>
           </Tabs>
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

export default connect(mapStateToProps, bindAction)(TaskEdit);
