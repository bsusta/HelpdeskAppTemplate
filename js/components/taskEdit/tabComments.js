
import React, { Component } from 'react';
import { Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { ActivityIndicator } from 'react-native';
import { addedCommentsSubscription } from './taskEdit.gquery';
import I18n from '../../translations/';


class TabComments extends Component { // eslint-disable-line
  constructor(props){
    super(props);
    this.state={items:10}

  }
  componentWillMount(){
    this.props.subscribeToMore({
      document: addedCommentsSubscription,
      updateQuery: () => {
        this.props.refetch();
        return;
      },
    });

  }
  render() { // eslint-disable-line
    if(this.props.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List
          dataArray={this.props.allComments}
          renderRow={data =>
            <ListItem avatar>
                    <Left>
                       <Thumbnail/>
                   </Left>
                   <Body>
                       <Text note>{data.user?data.user.firstName:'Nikto'}</Text>
                       <Text>{data.content}</Text>
                   </Body>
                   <Right>
                       <Text note>{data.createdAt}</Text>
                   </Right>
               </ListItem>
          }
          >
        </List>
        {
          this.state.items==this.props.allComments.length &&
        <Button
          block
          primary
          style={styles.mb15}
          onPress={this.props.getMore}>
          <Text>Load more...</Text>
          </Button>
        }
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={()=>{Actions.commentAdd({id:this.props.id})}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('taskEditComment')}</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>

    );
  }
}
export default TabComments;
