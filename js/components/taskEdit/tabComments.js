
import React, { Component } from 'react';
import { Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { ActivityIndicator } from 'react-native';
import { addedCommentsSubscription } from './taskEdit.gquery';


class TabComments extends Component { // eslint-disable-line
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.data.subscribeToMore({
      document: addedCommentsSubscription,
      updateQuery: () => {
        this.props.data.refetch();
        return;
      },
    });

  }
  render() { // eslint-disable-line
    if(this.props.data.loading){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List
          dataArray={this.props.data.allComments}
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
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={()=>{Actions.addComment({id:this.props.id})}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >Comment</Text>
          </Button>
        </FooterTab>
      </Footer>

    </Container>

    );
  }
}
export default TabComments;
