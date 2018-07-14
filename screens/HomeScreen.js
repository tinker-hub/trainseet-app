import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import {
  Badge,
  Body,
  Container,
  Form,
  Icon,
  Item,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Text
} from 'native-base';
import SocketIOClient from 'socket.io-client';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffc400'
    },
    headerTitleStyle: {
      fontWeight: 'bold'
    },

    title: 'Stations'
  };

  state = {
    density: undefined,
    direction: undefined
  };

  componentWillMount() {
    this.socket = SocketIOClient('https://6f61d02f.ngrok.io/');
  }

  componentDidMount() {
    this.socket.on('density', density => {
      this.setState({ density });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    return (
      <Container>
        <Form>
          <Item picker>
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              placeholder="Direction"
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
            >
              <Picker.Item
                label="North bound (Baclaran to Roosevelt)"
                value="southbound"
              />
              <Picker.Item
                label="South bound (Roosevelt to Baclaran)"
                value="northbound"
              />
            </Picker>
          </Item>
        </Form>
        <List>
          <ListItem
            onPress={() => {
              console.log(true);
            }}
          >
            <Left>
              <Badge danger style={styles.statusBadge}>
                <Text>H</Text>
              </Badge>
            </Left>
            <Body>
              <Text>Station 1</Text>
            </Body>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusBadge: {
    justifyContent: 'center'
  }
});
