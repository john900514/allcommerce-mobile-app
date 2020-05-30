<template>
    <scroll-view class="container" :content-container-style="containerStyles">
        <animated-loader :visible="getLoading"  overlay-color="rgba(6,54,158,0.8)"  :animation-style="lottieSize"  :speed="1"  :source="lottiefile" />
        <view class="inner-wrapper">
            <view class="silly-text">
                <text class="silly-text-text">ACCOUNT ACCESS</text>
            </view>
            <view v-for="(val, key) in fields" class="input-view">
                <text-input
                    class="input-text"
                    :placeholder-text-color="'#fff'"
                    v-model="fields[key]"
                    :auto-capitalize="'none'"
                    :keyboard-type="key === 'email' ? 'email-address' : 'default'"
                    :secureTextEntry="key !== 'email'"
                    :placeholder="key"
                ></text-input>
            </view>

            <view class="inner-wrapper">
                <touchable-highlight
                        class="login-button"
                        @press="dispatchSignIn()"
                        :underlay-color="'#2D2D2D'"
                        :active-opacity="0"
                >
                    <text class="login-text">SIGN IN!</text>
                </touchable-highlight>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    import getENVFunctions from "../../config/env";
    const envVars = getENVFunctions();
    const { apiUrl } = envVars.getEnvVars;

    import AnimatedLoader from 'react-native-animated-loader';
    import { TouchableHighlight } from 'react-native';

    import  store  from "../store";

    export default {
        name: "SignInScreen",
        components: {
            AnimatedLoader,
            TouchableHighlight
        },
        props: {
            navigation: {
                type: Object
            }
        },
        computed: {
            lottieSize() {
                return {
                    width: 100,height: 100
                }
            },
            containerStyles() {
                return {
                    flex: 1,
                    backgroundColor: '#2D2D2D',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                }
            },
            getLoading() {
                return store.state.loading;
            }
        },
        data() {
            return {
                lottiefile: '',
                fields: {
                    email: '',
                    password: '',
                },
            };
        },
        methods: {
            async dispatchSignIn() {
                let payload = {
                    email: this.fields.email,
                    password: this.fields.password,
                    nav: this.navigation
                };
                await store.dispatch('signin', payload)
            },
        },
        mounted() {
            this.lottiefile = Platform.OS  === 'ios' ? require("../../assets/loading/loading.json") : require('react-native-animated-loader/src/loader.json');
            console.log('SignInScreen mounted.')
        }
    }
</script>

<style scoped>
    .inner-wrapper {
        width: 100%;
        align-items: center;
    }

    .silly-text {
        margin-top: 0;
        margin-bottom: 25;
        margin-left: 20;
        margin-right: 20;
        text-align: center;
    }

    .silly-text-text {
        font-size: 40;
        font-family: simplicitapro-bold;
        color: #fff;
        text-align: center;
    }

    .input-view {
        width: 80%;
        background-color: #06369e;
        border-radius:25;
        height:50;
        margin-bottom:20;
        justify-content: center;
        padding: 20;
    }
    .input-text {
        height:50;
        color:#fff;
    }

    .login-button {
        width:60%;
        border-radius:25;
        height:50;
        align-items:center;
        justify-content:center;
        margin-top:40;
        margin-bottom:10;
        background-color: #06369e;
    }

    .login-text {
        font-family: simplicitapro-bold;
        color:#fff;
    }
</style>
