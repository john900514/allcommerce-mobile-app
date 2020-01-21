import React from 'react';
import {
    AsyncStorage,
    Button,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight,
    View
} from 'react-native';

import getENVFunctions from "../config/env";
const envVars = getENVFunctions();
const { apiUrl } = envVars.getEnvVars;

import AnimatedLoader from 'react-native-animated-loader';


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        headerLeft: null
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('Getting '+__DEV__+' Props - ', props);
        //console.log('This is the state of things - ', state);

        return state;
    }

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    _signInAsync = async () => {
        // @todo - take an axios obj and make the call to lb
        this.setState({isLoading: true});
        let _this = this;
        let password = this.state.password;
        let email = this.state.email;

        if (password.length === 0 || email.length === 0) {
            alert('You must fill in all fields');
            return;
        }

        if (this.validateEmail(email) === false) {
            alert('You must use a valid email address');
            return;
        }

        let deets = {
            email: email,
            password: password
        };
        let url = `${apiUrl}/login`;
        console.log('Login URL -'+url)
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'vnd.leadbinder.v1+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deets)
        }).then(response => response.json());

        console.log('Response from LeadBinder - ', response);

        if('token' in response) {
            await AsyncStorage.setItem('jwt_api_token', response.token, function() {
                console.log('Setting LeadBinder user API token');
                _this.props.navigation.navigate('App', {screen:'Main'});
            });
        }
        else {
            if('error' in response) {
                alert('Sorry. '+response['error']+' Please try again.');
            }
            else {
                alert('Your login is invalid. Please try again')
            }

            this.setState({isLoading: false});
        }
    };

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <AnimatedLoader  visible={this.state.isLoading}  overlayColor="rgba(6,54,158,0.8)"  animationStyle={styles.lottie}  speed={1}  source={require("../assets/loading/loading.json")} />
                <View style={styles.innerWrapper}>
                    <View style={styles.sillyText}>
                        <Text style={styles.sillyTextText}>ACCOUNT ACCESS</Text>
                    </View>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholderTextColor="#fff"
                            onChangeText={text => this.setState({ email: text })}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="Email"
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholderTextColor="#fff"
                            autoCapitalize="none"
                            onChangeText={text => this.setState({ password: text })}
                            secureTextEntry={true}
                            placeholder="Password"
                        />
                    </View>

                    <View style={styles.innerWrapper}>
                        <TouchableHighlight onPress={this._signInAsync}
                                            underlayColor={'#2D2D2D'}
                                            activeOpacity={0}
                                            style={styles.loginButton}>
                            <Text style={styles.loginText}>SIGN IN!</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2D2D2D',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    sillyText:{
        marginTop: 0,
        marginBottom: 25,
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center'
    },
    sillyTextText:{
        fontSize: 40,
        fontFamily: 'simplicitapro-bold',
        color: '#fff',
        textAlign: 'center'
    },
    innerWrapper: {
        width: '100%',
        alignItems: 'center',
    },
    innerIconWrapper: {
        alignItems: 'center',
        margin: 40,
        padding: 35,
        borderRadius:100,
        borderWidth: 1,
        borderColor: '#DFF200',
    },
    topText: {
        width: '100%'
    },
    topTextIcon: {
        color: '#DFF200'
    },
    inputView:{
        width:"80%",
        backgroundColor:"#06369e",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"#fff"
    },
    loginButton: {
        width:"60%",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10,
        backgroundColor: '#06369e'
    },
    loginText: {
        fontFamily: 'simplicitapro-bold',
        color:"#fff"
    },
    lottie: {
        width: 100,
        height: 100,
    },
});

// More code like OtherScreen omitted for brevity
