import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Text, Body } from 'native-base';
import SocketIOClient from 'socket.io-client';
import moment from 'moment';
import { BASE_URL } from '../api';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffc400',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },

    title: 'Notifications',
  };

  state = {
    notifications: [],
  };

  componentWillMount() {
    this.socket = SocketIOClient(BASE_URL);
  }

  componentDidMount() {
    this.socket.on('tweet', ({ data }) => {
      const { notifications } = this.state;

      this.setState({
        notifications: [data, ...notifications],
      });
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  render() {
    const { notifications } = this.state;
    return (
      <Container>
        <Content>
          {notifications.map(({ created_at, user: { screen_name }, text }) => (
            <Card key={created_at}>
              <CardItem header>
                <Text>{`@${screen_name}`}</Text>
                <Text style={styles.date}>
                  {' '}
                  - ${created_at.replace('@officialLRT1', '')}
                </Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{text}</Text>
                </Body>
              </CardItem>
            </Card>
          ))}
          <Card>
            <CardItem header>
              <Text>Text</Text>
              <Text style={styles.date}>
                {' '}
                -
                {' ' +
                  moment('Sat Jul 14 23:00:48 +0000 2018')
                    .startOf('hour')
                    .fromNow()}
              </Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Body</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  date: { color: '#808080' },
});
