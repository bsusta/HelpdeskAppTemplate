import React, { Component } from 'react';
import { withApollo,graphql } from 'react-apollo';
import { actions } from 'react-native-navigation-redux-helpers';
import { Input, Picker, Item, Footer, FooterTab, Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body, List, ListItem, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { openDrawer, closeDrawer } from '../../actions/drawer';
import styles from './styles';
import I18n from '../../translations/';
import {projects,editedTasksSubscription,editedProjectsSubscription} from './projectList.gquery';
const withProjects = graphql(projects, {
  props: ({ data: { loading, allProjects, error, refetch, subscribeToMore } }) => ({
    loadingProjects: loading,
    projects: allProjects,
    projectsError: error,
    refetchProjects:refetch,
    subscribeToMoreProjects:subscribeToMore,
  }),
});

class ProjectList extends Component {

  componentDidMount(){
    this.props.subscribeToMoreProjects({
      document: editedProjectsSubscription,
      updateQuery: () => {
        this.props.refetchProjects();
        return;
      },
    });
  }

  render() {
    if(this.props.loadingProjects){
      return <ActivityIndicator
      animating size={ 'large' }
      color='#007299' />
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
            <Title>{I18n.t('settingsProjectsListTitle')}</Title>
          </Body>
        </Header>
        <Content>
          <List
            dataArray={this.props.projects}
            renderRow={(project)=>
              <ListItem
                button onPress={()=>Actions.projectEdit({project})}
              >
                <Body>
                  <Text>{project.title}</Text>
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


export default withProjects(ProjectList);
