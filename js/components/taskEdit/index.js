
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Tab, Tabs, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabAtributes from './tabAtributes';
import TabComments from './tabComments';
import TabItems from './tabItems';
import Subtasks from './tabSubtasks';
import { comments, invoiceItems,subtasks } from './taskEdit.gquery';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import { graphql } from 'react-apollo';
import I18n from '../../translations/';



class TaskEdit extends Component {
  constructor(props){
    super(props);
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

    const withData3 = graphql(subtasks,{options:{variables:{
      id:this.props.data.id,
    },
      props: ({ data: { loading, allSubtasks, error, refetch, subscribeToMore } }) => ({
        loading,
        allSubtasks,
        error,
        refetch,
        subscribeToMore,
      })
    }});
    const HOCTabSubtasks=withData3(Subtasks);

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
            <Title>{I18n.t('taskEditTitle')}</Title>
          </Body>
          <Right />
        </Header>
           <Tabs>
               <Tab heading={I18n.t('taskEditTabAttributes')}>
                   <TabAtributes data={this.props.data} />
               </Tab>
               <Tab heading= {I18n.t('taskEditTabComments')}>
                   <HOCTabComments id={this.props.data.id}/>
               </Tab>
               <Tab heading={I18n.t('taskEditTabItems')}>
                   <HOCTabItems id={this.props.data.id}/>
               </Tab>
               <Tab heading={I18n.t('taskEditTabSubtasks')}>
                   <HOCTabSubtasks id={this.props.data.id}/>
               </Tab>
           </Tabs>
      </Container>
    );
  }
}

export default TaskEdit;
