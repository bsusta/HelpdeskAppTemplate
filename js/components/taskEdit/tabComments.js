
import React, { Component } from 'react';

import { Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { ActivityIndicator } from 'react-native';
import { addedCommentsSubscription } from './taskEdit.gquery';


class TabComments extends Component { // eslint-disable-line
  constructor(props){
    super(props);
    console.log(this.props);
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
    if(this.props.loadingComments){
      return (<ActivityIndicator animating size={ 'large' } color='#007299' />);
    }
    console.log(this.props);
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>
          <List
          dataArray={this.props.comments}
          renderRow={data =>
            (<ListItem avatar>
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
               </ListItem>)
          }
          >
        </List>
      </Content>

      <Footer>
        <FooterTab>
          <Button onPress={()=>{Actions.addComment({id:this.props.data.id})}} iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }}>
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
/*
<ListItem avatar>
        <Left>
           <Thumbnail/>
       </Left>
       <Body>
           <Text note>Kumar Pratik</Text>
           <Text>Doing what you like will always keep you happy . .</Text>
       </Body>
       <Right>
           <Text note>3:43 pm 12.2.2017</Text>
       </Right>
   </ListItem>
   <ListItem avatar>
           <Left>
              <Thumbnail/>
          </Left>
          <Body>
              <Text note>Kumar Pratik posted a reply</Text>
              <Text>Doing what you like will always keep you happy . .</Text>
          </Body>
          <Right>
              <Text note>3:43 pm 12.2.2017</Text>
          </Right>
      </ListItem>
      <ListItem avatar>
              <Left>
                 <Thumbnail/>
             </Left>
             <Body>
                 <Text note>FROM:branislav.susta@gmail.com</Text>
                 <Text note>TO:hotline@lansystems.sk</Text>
                 <Text>Doing what you like will always keep you happy . .</Text>
             </Body>
             <Right>
                 <Text note>3:43 pm 12.2.2017</Text>
             </Right>
         </ListItem>

*/
