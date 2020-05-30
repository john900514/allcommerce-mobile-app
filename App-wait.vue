<template>
    <view class="container">
        <view class="app-loading" v-if="!fontLoaded">
            <app-loading
                    :start-async="() => loadResourcesAsync"
                    :on-finish="toggleLoading"
                    :on-error="console.warn"
            ></app-loading>
            <text class="text-color-primary">Hang on a Sec...</text>
        </view>
        <view class="app" v-else>
            <status-bar v-if="platform === 'ios'"></status-bar>
            <app-navigator></app-navigator>
        </view>
    </view>
</template>

<script>
    import Vue from "vue-native-core";
    import { VueNativeBase } from "native-base";
    import { Asset } from 'expo-asset';
    import * as Font from 'expo-font';
    import { Ionicons } from '@expo/vector-icons';
    import { AppLoading } from 'expo';
    import AppNavigator from './src/navigators/AppNavigatorComponent';

    Vue.use(VueNativeBase);

    export default {
        components: {
            AppLoading,
            AppNavigator
        },
        data() {
            return {
                fontLoaded: false,
                platform: Platform.OS
            };
        },
        computed: {},
        methods: {
            toggleLoading(sup) {
                console.log('Loaded...', sup);
                this.fontLoaded = true
            },
            loadResourcesAsync() {
                Promise.all([
                    Asset.loadAsync([
                        require('./assets/images/robot-dev.png'),
                        require('./assets/images/robot-prod.png'),
                    ]),
                    Font.loadAsync({
                        // This is the font that we are using for our tab bar
                        ...Ionicons.font,
                        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
                        // remove this if you are not using it in your app
                        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                        'simplicitapro': require('./assets/fonts/semplicitapro.otf'),
                        'simplicitapro-bold': require('./assets/fonts/semplicitapro-bold.otf'),
                    }),
                    console.log('fonts loaded')
                ])
            }
        },
        mounted() {
            //this.loadResourcesAsync();
        }
    }
</script>

<style>
    .container {
        background-color: white;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        flex: 1;
        font-family: 'simplicitapro-bold'
    }

    .inner-container {
        width: 100%;
        height: 100%;
    }

    .app {
        width: 100%;
        height: 100%;
    }

    .text-color-primary {
        color: blue;
    }
</style>
