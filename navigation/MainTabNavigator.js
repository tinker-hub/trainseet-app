import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StationsScreen from '../screens/StationsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const StationsStack = createStackNavigator({
  Stations: StationsScreen
});

StationsStack.navigationOptions = {
  tabBarLabel: 'Stations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-train'} />
  )
};

const NotificationsStack = createStackNavigator({
  Notifications: NotificationsScreen
});

NotificationsStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-notifications-outline'} />
  )
};

const AnalyticsStack = createStackNavigator({
  Analytics: AnalyticsScreen
});

AnalyticsStack.navigationOptions = {
  tabBarLabel: 'Analytics',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'md-analytics'} />
  )
};

export default createBottomTabNavigator({
  StationsStack,
});
