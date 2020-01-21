import React from 'react';
import {StyleSheet, TouchableOpacity} from "react-native";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator,  } from 'react-navigation-stack';
import {fromBottom, fromLeft, fromRight} from 'react-navigation-transitions';

import {
    AuthLoadingScreen,
    SignInScreen,
    TitleScreen,
    SettingsScreen
} from "../screens";

import MainTabNavigator from './MainTabNavigator.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHandPointLeft } from "@fortawesome/pro-duotone-svg-icons";

const getTransition = (screen) => {
    let route = screen.navigation.state;

    let liveRoute = route.routeName;

    let res = fromBottom();
    switch(route)
    {
        case 'Main':
             res = fromLeft();
            break;
        case 'Setting':
            res = fromRight();
    }

    return res;
};

const styles = StyleSheet.create({
    burgerButton: {
        marginLeft: 25,
        marginBottom: 10,
    },
    burgerButtonIcon: {
        color: "#fff",
    }
});

const getNavOptions = (nav) => {
    console.log('Checking nav state - ',nav.navigation.state);
    let route = nav.navigation.state.routeName;//.routes[nav.navigation.state.index].routeName;
    switch(route)
    {
        case 'Main':
        case 'HomeStack':
        case 'LeadsStack':
        case 'ContactStack':
            return {
                header: null,
                headerMode: 'none',
                headerStyle: {
                    backgroundColor: '#2D2D2D',
                    shadowColor: 'transparent',
                    elevation: 0,
                    borderBottomColor:'transparent',
                    borderBottomWidth: 0
                },
            };

        default:
            console.log('Getting nav options - ',nav);
            return {
                headerMode: 'screen',
                headerLeft: () => {
                    return (
                        <TouchableOpacity
                            style={styles.burgerButton}
                            onPress={() => nav.navigation.goBack()}
                        ><FontAwesomeIcon icon={faHandPointLeft} style={styles.burgerButtonIcon} size={22}/></TouchableOpacity>
                    );
                },
                headerTitleStyle: {
                    fontFamily: 'simplicitapro-bold',
                    color: '#fff'
                },
                headerStyle: {
                    backgroundColor: '#2D2D2D',
                    shadowColor: 'transparent',
                    elevation: 0,
                    borderBottomColor:'transparent',
                    borderBottomWidth: 0
                },
            };
    }
}

const AuthStack = createStackNavigator(
    {
    Title: {
        screen: TitleScreen
    },
    SignIn: {
        screen: SignInScreen

    }
},
    {
    initialRouteName: 'Title',
    transitionConfig: (nav) => getTransition(nav),
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#2D2D2D',
            shadowColor: 'transparent',
            elevation: 0,
            borderBottomColor:'transparent',
            borderBottomWidth: 0
        },
    }
}
);

const AppStack = createStackNavigator({
    Main: {
        screen: MainTabNavigator
    },
    Settings: {
        screen: SettingsScreen
    },
},{
    initialRouteName: 'Main',
    transitionConfig: (nav) => getTransition(nav),
    defaultNavigationOptions: (nav) => getNavOptions(nav),
});

export default createAppContainer(
  createSwitchNavigator({
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
  }, {
      initialRouteName: 'AuthLoading'
  })
);
