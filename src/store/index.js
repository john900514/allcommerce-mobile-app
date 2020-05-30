import Vue from "vue-native-core";
import Vuex from 'vuex'

import getENVFunctions from "../../config/env";
const envVars = getENVFunctions();
const { apiUrl } = envVars.getEnvVars;
Vue.use(Vuex);
import axios from 'react-native-axios';
import { AsyncStorage } from 'react-native';

const store = new Vuex.Store({
    state: {
        loading: false,
        jwt_access_token: '',
        is_allcommerce_user: false,
        capeandbay_uuid: '',
        user_merchant_uuid_list: {},
        user_merchant_access_total: 0,
        active_merchant_uuid: '',
        user: {},
        intended_route: '',
        loadingScreenSize: {
            width: 100,
            height: 100
        }
    },
    getters: {
        jwtAccessToken(state) {
            return state.jwt_access_token;
        },
        loadingScreenSize(state) {
            return state.loadingScreenSize;
        },
        activeMerchantUUID(state) {
            return state.active_merchant_uuid;
        },
        getIntendedRoute(state) {
            return state.intended_route;
        }
    },
    mutations: {
        updateJWTToken (state, token) {
            state.jwt_access_token = token;
        },
        loading(state, flag) {
            state.loading = flag;
        },
        isAllCommerceUser(state, flag) {
            state.is_allcommerce_user = flag;
        },
        capeandbayUUID(state, uuid) {
            state.capeandbay_uuid = uuid;
        },
        commitFindMeNormalMerchantData(state, payload) {
            state.user_merchant_uuid_list = payload.user_merchant_uuid_list;
            state.active_merchant_uuid = payload.active_merchant_uuid;
            state.user = payload.user;
            state.user_merchant_access_total = payload.user_merchant_access_total;
        },
        setIntendedRoute(state, route) {
            state.intended_route = route;
        },
        setSelectedMerchant(state, uuid) {
            state.active_merchant_uuid = uuid;
        },

        setState(state, myState) {
            state = myState;
        },
    },
    actions: {
        /* Asynchornous Methods & API Calls */
        async signin({ commit, state }, creds) {
            let deets = {
                email: creds.email,
                password: creds.password
            };

            // console.log('signin deets', deets);

            let headers = {
                'Accept': 'vnd.allcommerce.v1+json',
                'Content-Type': 'application/json',
            };

            commit('loading', true);

            await axios.post(`${apiUrl}/login`,
                JSON.stringify(deets), {
                    headers: headers
                })
                .then(async function(response){
                    response = response.data;
                    if('token' in response) {
                        await AsyncStorage.setItem('jwt_api_token', response.token, function() {
                            console.log('Setting AllCommerce user API token');
                            commit('updateJWTToken', response.token);
                            commit('loading', false);
                            creds.nav.navigate('MembersArea', state);
                        });

                        //console.log('Response from AllCommerce...', response);
                    }
                    else {
                        if('error' in response) {
                            alert('Sorry. '+response['error']+' Please try again.');
                        }
                        else {
                            alert('Your login is invalid. Please try again')
                        }
                    }
                })
                .catch(function(e){
                    console.log('FAILURE!!', e);
                    commit('loading', false);
                    setTimeout(() => {alert('Something went wrong, please try again')},200);
                });
        },
        async findme({ commit, dispatch, state }, nav) {
            // Acquire the token
            let token = state.jwt_access_token;

            if(token !== '') {
                // call /me
                let header_load = {
                    'Accept': 'vnd.allcommerce.v1+json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                let headers = {headers: header_load};

                console.log('HeaderLoad -', headers);

                commit('loading', true);

                await axios.post(`${apiUrl}/me`, {}, headers)
                    .then(async function (response) {
                        response = response.data;
                        //console.log('/me Response From AllCommerce - ', response);

                        let stuff = {
                            response: response,
                            nav: nav
                        };

                        await dispatch('processMe', stuff);
                    })
                    .catch(async function(e){
                        // If failed, alert the user that session has expired, and redirect to login
                        await AsyncStorage.removeItem('jwt_api_token', function() {
                            console.log('Removing AllCommerce user API token because', e);
                            commit('updateJWTToken', '');
                            commit('loading', false);
                            nav.navigate('SignIn');
                        });
                        setTimeout(() => {alert('Your session has expired, please login again')},200);
                    });
            }
            else {
                token = await AsyncStorage.getItem('jwt_api_token',  function() {});

                // Try Again one time by checking for the token in async storage
                if(token !== undefined) {
                    console.log('Located Token in Async Storage '+token+', trying again...');
                    state.jwt_access_token = token;

                    await this.dispatch('findme', nav);
                }
                else {
                    //If empty, alert the user there was an error, and redirect to login
                    await AsyncStorage.removeItem('jwt_api_token', function() {
                        console.log('Removing AllCommerce user API token');
                        commit('updateJWTToken', '');
                        commit('loading', false);
                        nav.navigate('SignIn');
                    });
                    setTimeout(() => {alert('There was an error with your account, please try again')},200);
                }
            }
        },
        async processMe({ commit, dispatch, state }, stuff) {
            let response = stuff.response;
            let nav = stuff.nav;
            // Process the data to the state and check for Allcommerce staff status.
            if('is_allcommerce' in response) {
                console.log('This user is an AllCommerce user. Updating the state');
                commit('isAllCommerceUser', response['is_allcommerce']);
                commit('capeandbayUUID', response['capeandbay_uuid'])
            }
            else {
                commit('isAllCommerceUser', '');
                commit('capeandbayUUID', '')
            }

            // Determine if user has access to multiple merchants
            let numMerchants = 0;
            let merchantArray = [];

            for(let uuid in response['merchants']) {
                numMerchants++;
            }

            for(let uuid in response['merchants']) {
                merchantArray.push({
                    id: uuid,
                    name: response['merchants'][uuid]
                });
            }

            let params = {
                user_merchant_uuid_list: response['merchants'],
                curated_merchant_list: merchantArray,
                active_merchant_uuid: merchantArray[0]['id'],
                user: response['user'],
                user_merchant_access_total: numMerchants
            };

            if(numMerchants === 1) {
                // If no, toggle the active merchant and send to Dashboard along with Nav Obj

                 commit('commitFindMeNormalMerchantData', params);
                 commit('commitFindMeNormalMerchantData', params);
                 commit('setIntendedRoute', 'HomeGroup');

                console.log('Navigating over to the HomeGroup', state);
                nav.navigate('Home', state)

            }
            else {
                // If yes, redirect to merchant select along with nav obj
                console.log('Navigating over to Merchant Select');
                //params.active_merchant_uuid = merchantArray[1]['id'];
                commit('commitFindMeNormalMerchantData', params);
                //nav.navigate('MerchantSelect', state);
                //nav.navigate('Home', state)
                let uuid = await AsyncStorage.getItem('active_merchant_uuid');

                if(uuid) {
                    console.log('Restoring Selected Merchant to - '+uuid);
                    commit('setSelectedMerchant', uuid);
                    if(uuid === state.capeandbay_uuid) {
                        console.log('Sending CapeandBay user to AdminHome');
                        nav.navigate('AdminHome', state);
                    }
                    else {
                        nav.navigate('Home', state);
                    }

                }
                else {
                    dispatch('unsetMerchantState', nav);
                }
            }
            commit('loading', false);
        },
        async logout({commit, state}, nav) {
            await AsyncStorage.removeItem('jwt_api_token', function() {
                console.log('Removing AllCommerce user API token because they are logging out.');
                commit('updateJWTToken', '');
                commit('loading', false);
                nav.navigate('SignIn');
            });
        },

        async setMerchantState({commit, state}, stuff) {
            let uuid = stuff.uuid;
            let nav = stuff.nav;

            console.log('Setting selected merchant to -'+uuid);
            if(state.user_merchant_access_total > 1) {
                commit('setSelectedMerchant', uuid);
                await AsyncStorage.setItem('active_merchant_uuid', uuid, function () {
                    if(uuid === state.capeandbay_uuid) {
                        console.log('Sending CapeandBay user to AdminHome');
                        nav.navigate('AdminHome', state);
                    }
                    else {
                        nav.navigate('Home', state);
                    }

                });
            }
        },
        async unsetMerchantState({commit, state}, nav) {
            if(state.user_merchant_access_total > 1) {
                commit('setSelectedMerchant', '');

                await AsyncStorage.removeItem('active_merchant_uuid', function () {
                    nav.navigate('MerchantSelect', state);
                });
            }
        },

        /* Wierd Dumb Shit that needs to be here */
        setstate({ commit, state }, mystate) {
            console.log('New Page, Same State');
            commit('setState', mystate);
        }
    }
});

export default store;
