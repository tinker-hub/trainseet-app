import React from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import {
  Badge,
  Body,
  Container,
  Content,
  Form,
  Icon,
  Item,
  Left,
  List,
  ListItem,
  Picker,
  Right,
  Text,
} from 'native-base';
import SocketIOClient from 'socket.io-client';
import { BASE_URL, fetchStations, getETA } from '../api';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#ffc400',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    title: 'Stations',
  };

  state = {
    density: 0,
    direction: undefined,
    stations: [],
  };

  componentWillMount() {
    this.socket = SocketIOClient(BASE_URL);
  }

  async componentDidMount() {
    this.socket.on('density', density => {
      this.setState({ density });
    });

    const stations = await fetchStations();

    this.setState({
      stations,
    });
  }

  componentWillUnmount() {
    this.socket.close();
  }

  handleOnPress = async stationId => {
    const ETA = await getETA(stationId);

    const message = `The next train will arive in ${ETA} mins`;
    Alert.alert('Estimated Time of Arrival', message);
  };

  changeDirection = direction => {
    this.setState({
      direction,
    });
  };

  renderStatusIndicator(density) {
    return density ? (
      density <= 10 ? (
        <Badge success style={styles.statusBadge}>
          <Text>L</Text>
        </Badge>
      ) : density <= 20 ? (
        <Badge warning style={styles.statusBadge}>
          <Text>M</Text>
        </Badge>
      ) : (
        <Badge danger style={styles.statusBadge}>
          <Text>H</Text>
        </Badge>
      )
    ) : (
      <ActivityIndicator size="small" color="#0000ff" />
    );
  }

  render() {
    const { density, direction, stations } = this.state;

    return (
      <Container>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                style={{ width: undefined }}
                placeholder="Direction"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                selectedValue={direction}
                onValueChange={this.changeDirection}
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
          <List style={styles.stationList}>
            {stations.map(({ name, _id }, index) => (
              <ListItem key={index} onPress={() => this.handleOnPress(_id)}>
                <Left>{this.renderStatusIndicator(density)}</Left>
                <Body>
                  <Text>{name}</Text>
                </Body>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  statusBadge: {
    justifyContent: 'center',
  },
  stationList: {},
});
