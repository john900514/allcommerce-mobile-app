<template>
    <app-container></app-container>
</template>

<script>
    import React from 'react';
    import  store  from "../store";
    import { createAppContainer, createSwitchNavigator } from 'react-navigation';
    import { createStackNavigator  } from 'react-navigation-stack';
    import { createBottomTabNavigator } from 'react-navigation-tabs';
    import {fromBottom, fromLeft, fromRight, fromTop} from 'react-navigation-transitions';

    import TitleScreen from '../screens/TitleScreen';
    import SignInScreen from '../screens/SignInScreen';

    import HomeContainer from '../containers/HomeContainer';
    import SettingsContainer from '../containers/SettingsContainer';
    import InventoryContainer from '../containers/InventoryContainer';
    import ReceptionContainer from '../containers/ReceptionContainer';
    import MerchantSelectContainer from '../containers/MerchantSelectContainer';

    import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    import { faHouse, faBookReader, faPhoneRotary } from '@fortawesome/pro-regular-svg-icons'
    import {faHandPointLeft} from "@fortawesome/pro-duotone-svg-icons";
    import {faBars} from "@fortawesome/pro-solid-svg-icons";
    import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

    const styles = StyleSheet.create({
        burgerButton: {
            marginRight: 25,
            marginLeft: 25,
            marginBottom: 10,
        },
        burgerButtonIcon: {
            color: "#fff",
        }
    });
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
    const getDashTabNavOptions = (nav) => {
        let route = nav.navigation.state.routeName;
        console.log('Inside getDashTabNavOptions for route - '+route, nav);

        let navState = nav.navigation.state;
        //let navState = store.state;
        let title = '';
        switch(route) {
            case 'Inventory':
                console.log('Inside getDashTabNavOptions for route - '+route+' Looking at the store directly', store.state);
                title = 'Inventory';
                break;

            default:
                if(('params' in navState) && ('user_merchant_uuid_list' in navState.params)) {
                    title = nav.navigation.state.params.user_merchant_uuid_list[nav.navigation.state.params.active_merchant_uuid]
                    //title = nav.navigation.state.params.user_merchant_uuid_list[store.getters.activeMerchantUUID];
                }
                else {
                    title = route;
                }

        }

        let payload = {
            title: title,
            headerMode: 'screen',
            headerLeft: () => (<View></View>),
            headerRight: () => {
                return (
                    <TouchableOpacity
                        style={styles.burgerButton}
                        onPress={() => nav.navigation.navigate('Settings', nav)}
                    ><FontAwesomeIcon icon={ faBars } style={styles.burgerButtonIcon} size={22}/></TouchableOpacity>
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
            }
        };

        switch(route) {
            case 'Home':
            case 'AdminHome':
                payload['tabBarLabel'] = 'Home';
                //payload['tabBarIcon'] = ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>);
                break;

            case 'Inventory':
                payload['tabBarLabel'] = 'Home';
                payload['tabBarIcon'] = ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>);
                break;

            default:
                payload['tabBarLabel'] = 'Other';
                payload['tabBarIcon'] = ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>);

        }

        return payload
    };
    const isAllCommerceActive = (nav) => {
        let results = false;

        console.log('Checking for AllCommerce Status right quick...');

        if(nav.navigation.state.params.capeandbay_uuid !== '') {
            results = nav.navigation.state.params.active_merchant_uuid === nav.navigation.state.params.capeandbay_uuid
        }

        return results;
    };
    const getNavOptions = (nav) => {
        let route = nav.navigation.state.routeName;

        switch(route) {
            case 'Derp':
                return {
                    headerMode: 'screen',
                    headerLeft: () => (<View></View>),
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
                break;

            default:
                //console.log('Getting nav options - ',nav);
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
    };

    const HomeGroup = createStackNavigator(
        {
            Home: {
                screen: HomeContainer,
            }
        },
        {
            initialRouteName: 'Home',
            defaultNavigationOptions: (nav) => getDashTabNavOptions(nav),
            navigationOptions: (nav) => {
                return {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>),
                    tabBarOptions: {
                        style: {
                            backgroundColor: '#2D2D2D',//color you want to change
                            fontColor: '#fff'
                        }
                    },
                    tabBarVisible: true
                };
            },
            path: ''
        }
    );

    const AdminHomeGroup = createStackNavigator(
        {
            AdminHome: {
                screen: HomeContainer,
            }
        },
        {
            initialRouteName: 'AdminHome',
            defaultNavigationOptions: (nav) => getDashTabNavOptions(nav),
            navigationOptions: (nav) => {
                return {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>),
                    tabBarOptions: {
                        style: {
                            backgroundColor: '#2D2D2D',//color you want to change
                            fontColor: '#fff'
                        }
                    },
                    tabBarVisible: true
                };
            },
            path: ''
        }
    );

    const InventoryGroup = createStackNavigator(
        {
            Inventory: {
                screen: InventoryContainer
            }
        },
        {
            initialRouteName: 'Inventory',
            defaultNavigationOptions: (nav) => getDashTabNavOptions(nav),
            navigationOptions: (nav) => {
                return {
                    tabBarLabel:  'Inventory',
                    tabBarIcon: ({ focused }) => (<FontAwesomeIcon icon={faHouse} style={focused ? {color:'#7398E8'} : {color: '#fff'}}/>),
                    tabBarOptions: {
                        style: {
                            backgroundColor: '#2D2D2D',//color you want to change
                            fontColor: '#fff'
                        },
                    },
                    //tabBarButton: props => <TouchableOpacity {...props} onPress={ alert('Yo!') }/>,
                };
            },

            path: ''
        }
    );

    const DashboardTabStack = createBottomTabNavigator({
            HomeGroup,
            InventoryGroup,
        },
        {
            initialRouteName: 'HomeGroup',
        }
    );

    const AllCommerceTabStack = createBottomTabNavigator(
        {
            AdminHomeGroup
        },
        {
            initialRouteName: 'AdminHomeGroup',
        }
    );

    const MembersAreaStack = createStackNavigator(
        {
            Reception: {
                screen: ReceptionContainer
            },
            Dashboard: { screen: DashboardTabStack },
            Settings:  {
                screen: SettingsContainer,
                transitionConfig: fromRight(),
            },
            MerchantSelect: {
                screen: MerchantSelectContainer,
                transitionConfig: fromTop(),
            },
            AllCommerce: { screen: AllCommerceTabStack }
        },
        {
            initialRouteName: 'Reception',
            defaultNavigationOptions: (nav) => {
                let options = {};
                let route = nav.navigation.state.routeName;

                switch(route) {
                    case 'Settings':
                        options = {
                            title: 'Personal Settings',
                            headerMode: 'screen',
                            headerLeft: () => {
                                return (
                                    <TouchableOpacity
                                        style={styles.burgerButton}
                                        onPress={() => nav.navigation.goBack()}
                                    ><FontAwesomeIcon icon={faHandPointLeft} style={styles.burgerButtonIcon}
                                                      size={22}/></TouchableOpacity>
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
                                borderBottomColor: 'transparent',
                                borderBottomWidth: 0
                            }
                        };
                        break;

                    case 'MerchantSelect':
                        options = {
                            title: 'Select A Merchant To Continue',
                            headerMode: 'screen',
                            headerLeft: () => {return (<View></View>);},
                            headerTitleStyle: {
                                fontFamily: 'simplicitapro-bold',
                                color: '#fff'
                            },
                            headerStyle: {
                                backgroundColor: '#2D2D2D',
                                shadowColor: 'transparent',
                                elevation: 0,
                                borderBottomColor: 'transparent',
                                borderBottomWidth: 0
                            }
                        };
                        break;

                    default:
                        options =  {
                            header: null,
                            headerMode: 'none'
                        };
                }

                return options;
            },
        }
    );

    const GuestAreaStack = createStackNavigator(
        {
            Title: {
                screen: TitleScreen
            },
            SignIn: {
                screen: SignInScreen
            },
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

    const switchStack = createSwitchNavigator(
        {
            GuestArea: GuestAreaStack,
            MembersArea: MembersAreaStack,
        }, {initialRouteName: 'GuestArea'});

    const AppContainer = createAppContainer(switchStack);

    export default {
        name: "AppNavigator",
        components: { AppContainer },
        mounted() {
            console.log('App Navigator Mounted. All Routes Loaded.');
        }
    }
</script>

<style scoped>

</style>
