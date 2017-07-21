import React, { Component } from 'react';
import { Form, Input, Label, Button, Icon, Item, Footer, FooterTab, Thumbnail, Container, Content, Card, CardItem, Text, ListItem, List,  Left, Body, Right } from 'native-base';
import styles from './styles';
import {createProject} from './projectAdd.gquery';
import { Actions } from 'react-native-router-flux';
import { withApollo} from 'react-apollo';
import I18n from '../../translations/';

class TabDescription extends Component { // eslint-disable-line


  constructor(props){
    super(props);
    this.state={
      title:'',
      description:''
    }
  }
  submit(){
    this.props.client.mutate({
          mutation: createProject,
          variables: { title:this.state.title,description:this.state.description},
        });
    Actions.pop();
  }

  render() { // eslint-disable-line
    return (
      <Container>
        <Content padder style={{ marginTop: 0 }}>

        <Form>
        <Item stackedLabel>
          <Label>{I18n.t('title')}</Label>
          <Input
          placeholder={I18n.t('title')}
          value={this.state.title}
          onChangeText={(value)=>this.setState({title:value})}
          />
          </Item>

          <Item stackedLabel>
            <Label>{I18n.t('description')}</Label>
            <Input
            style={{height:100}}
            multiline={true}
            placeholder={I18n.t('description')}
            value={this.state.description}
            onChangeText={(value)=>this.setState({description:value})}
            />
            </Item>
          </Form>

        </Content>


      <Footer>
        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={Actions.pop} >
            <Icon active style={{ color: 'white' }} name="md-add" />
            <Text style={{ color: 'white' }} >{I18n.t('cancel')}</Text>
          </Button>
        </FooterTab>

        <FooterTab>
          <Button iconLeft style={{ flexDirection: 'row', borderColor: 'white', borderWidth: 0.5 }} onPress={this.submit.bind(this)}>
            <Icon active name="md-add" style={{ color: 'white' }} />
            <Text style={{ color: 'white' }} >{I18n.t('save')}</Text>
          </Button>
        </FooterTab>
    </Footer>


    </Container>

    );
  }
}
export default withApollo(TabDescription);
