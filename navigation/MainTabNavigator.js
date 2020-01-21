import React from 'react';
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text
} from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ContactScreen from '../screens/ContactScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHouse, faBookReader, faPhoneRotary } from '@fortawesome/pro-regular-svg-icons'


const config = Platform.select({
  default: {
      defaultNavigationOptions: {
          headerStyle: {
              backgroundColor: '#2D2D2D',
              shadowColor: 'transparent',
              elevation: 0,
              borderBottomColor:'transparent',
              borderBottomWidth: 0
          },
      },
  },
});

const HomeStack = createStackNavigator(
    {
    Home: HomeScreen,
  },
    config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>
  /*
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  */),
    tabBarOptions: {
        style: {
            backgroundColor: '#2D2D2D',//color you want to change
        }
    }
};

HomeStack.path = '';

const LeadsStack = createStackNavigator(
  {
    Leads: LinksScreen,
  },
  config
);

LeadsStack.navigationOptions = {
  tabBarLabel: 'Leads',
  tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faBookReader} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>),
    tabBarOptions: {
        style: {
            backgroundColor: '#2D2D2D',//color you want to change
        }
    }
};

LeadsStack.path = '';

const ContactStack = createStackNavigator(
  {
    Contact: ContactScreen,
  },
  config
);

ContactStack.navigationOptions = {
    tabBarLabel: 'Contact',
    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faPhoneRotary} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>),
    tabBarOptions: {
        style: {
            backgroundColor: '#2D2D2D',//color you want to change
        }
    }
};

ContactStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    LeadsStack,
    ContactStack,
}, {
    initialRouteName: 'HomeStack',
});

tabNavigator.path = '';

const styles = StyleSheet.create({
    burgerButton: {
        marginRight: 25,
        marginBottom: 15,
    },
    burgerButtonIcon: {
        color: "#fff",
    }
});

export default tabNavigator;
