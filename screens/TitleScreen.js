import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPortalEnter } from '@fortawesome/pro-regular-svg-icons'
import { faCopyright } from '@fortawesome/pro-regular-svg-icons'

import getENVFunctions from "../config/env";
const envVars = getENVFunctions();
const { build } = envVars.getEnvVars;
const version = envVars.getBuildVersion;

export default class TitleScreen extends React.Component {
    constructor(props) {
        super(props);
        console.log('TitleScreen props - ', props);
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.logoSegment}>
                    <Image style={styles.logo} source={require('../assets/images/anchor-icon.png')} />
                    <Text style={styles.titleText}>AllCommerce</Text>
                </View>
                <View style={styles.buttonBox}>
                    <TouchableHighlight onPress={() => navigate('SignIn')}
                                        underlayColor={'#DFF200'}
                                        underlayColor={'#DFF200'}
                                        style={styles.loginButton}>
                        <Text style={styles.loginText}>
                            <FontAwesomeIcon icon={ faPortalEnter } color={'#fff'}/> LOGIN
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.finePrint}>
                    <Text style={styles.finePrintText}>
                        <Text style={styles.textLink}>Privacy</Text> and <Text style={styles.textLink}>Terms</Text> | v {version} ({build})
                    </Text>
                    <Text style={styles.finePrintText}>
                        <FontAwesomeIcon icon={ faCopyright } style={styles.fpCopyRight}/> 2020. Cape & Bay, LLC
                    </Text>
                </View>
            </View>
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
    logoSegment: {
        width: '100%',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150
    },
    titleText: {
        color: '#fff',
        fontSize: 45,
        fontFamily: 'simplicitapro-bold'
    },
    buttonBox: {
        marginTop: 75,
        width: '100%',
        alignItems:"center",
    },
    loginButton: {
        width:"80%",
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
        color: '#fff'
    },
    finePrint: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems:"center",
        marginBottom: 30
    },
    finePrintText : {
        color: '#fff',
        fontSize: 12,
        marginBottom: 12,
        fontFamily: 'simplicitapro-bold'
    },
    fpCopyRight: {
        color: '#fff',
        fontWeight: "100",
        fontSize: 8,
    },
    textLink: {
        textDecorationLine: 'underline'
    }
});
