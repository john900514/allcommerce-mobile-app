<template>
    <view class="container">
        <view class="logo-segment">
            <view class="logo-Segment">
                <image class="logo" :source="require('../../assets/images/anchor-icon.png')" />
                <text class="titleText">AllCommerce</text>
            </view>
        </view>

        <view class="button-box">
            <touchable-highlight
                    :on-press="() => navigation.navigate('SignIn')"
                    :underlay-color="'#DFF200'"
                    class="loginButton"
            >
                <text class="loginText">
                    <font-awesome-icon :icon="portal" color="#fff"/> LOGIN
                </text>
            </touchable-highlight>
        </view>
        <view class="fine-Print">
            <text class="finePrintText">
                <text>Privacy</text> and <text class="textLink">Terms</text> | v {{version}} ({{build}})
            </text>
            <text class="finePrintText">
                <FontAwesomeIcon :icon="copyright" class="fpCopyRight"/> 2020. Cape & Bay, LLC
            </text>
        </view>
    </view>
</template>

<script>
    import { AsyncStorage, TouchableHighlight } from 'react-native'
    import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    import { faPortalEnter } from '@fortawesome/pro-regular-svg-icons'
    import { faCopyright } from '@fortawesome/pro-regular-svg-icons'

    import getENVFunctions from "../../config/env";
    const envVars = getENVFunctions();
    const { build } = envVars.getEnvVars;
    const version = envVars.getBuildVersion;
    import  store  from "../store";

    export default {
        name: "TitleScreen",
        components: {
            FontAwesomeIcon,
            TouchableHighlight
        },
        props: {
            navigation: {
                type: Object
            }
        },
        watch: {
            jwt(token) {
                store.dispatch('findme', this.navigation);
            }
        },
        data() {
            return {
                portal: faPortalEnter,
                copyright: faCopyright,
                version: version,
                build: build,
                jwt: '',
            };
        },
        methods: {
            async getJwtToken() {
                let token = await AsyncStorage.getItem('jwt_api_token', () => {});

                if(token) {
                    console.log("Restoring session... ", token);
                    this.jwt = token;
                }
                else {
                    console.log('New Session starting..')
                }
            }
        },
        created() {
            console.log('TitleScreen Created - checking for previous session...');
            this.getJwtToken()
        },
        mounted() {
            console.log('TitleScreen Mounted')

        }
    }
</script>

<style scoped>
    .container {
        flex: 1;
        background-color: #2D2D2D;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .logo-segment {
        width: 100%;
        align-items: center;
    }

    .logo {
        width: 150;
        height: 150;
        margin-left: 75;
    }

    .titleText {
        color: #fff;
        font-size: 45;
        font-family: simplicitapro-bold;
    }
    .button-box {
        margin-top: 35;
        width: 100%;
        align-items: center;
    }
    .loginButton {
        width:80%;
        border-radius:25;
        height:50;
        align-items:center;
        justify-content:center;
        background-color: #06369e;
    }
    .loginText {
        font-family: simplicitapro-bold;
        color: #fff;
    }
    .fine-Print {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        align-items:center;
        margin-bottom: 30;
    }
    .finePrintText  {
        color: #fff;
        font-size: 12;
        margin-bottom: 12;
        font-family: simplicitapro-bold;

    }
    .fpCopyRight {
        color: #fff;
        font-weight: 100;
        font-size: 8;
    }
    .textLink {
        text-decoration-line: underline;
    }
</style>
