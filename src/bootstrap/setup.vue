<template>
    <view class="container">
        <app-loading v-if="!isAppReady"> </app-loading>
        <app v-if="isAppReady"></app>
    </view>
</template>

<script>
    import React from 'react';
    import Vue from "vue-native-core";
    import { VueNativeBase } from "native-base";
    import { AppLoading } from "expo";
    import * as Font from "expo-font";
    import { Ionicons } from '@expo/vector-icons';
    import App from "../App.vue";
    Vue.use(VueNativeBase);
    import  store  from "../store";

    export default {
        store: store,
        components: { App, AppLoading },
        data() {
            return {
                isAppReady: false
            };
        },
        created() {
            this.loadFonts();
        },
        methods: {
            async loadFonts() {
                try {
                    this.isAppReady = false;

                    let loaded = await Font.loadAsync({
                        'simplicitapro': require('../../assets/fonts/semplicitapro.otf'),
                        'simplicitapro-bold': require('../../assets/fonts/semplicitapro-bold.otf'),
                        // This is the font that we are using for our tab bar
                        ...Ionicons.font,
                    });
                    console.log('BS'+loaded);
                    this.isAppReady = true;
                } catch (error) {
                    console.log("some error occurred", error);
                    this.isAppReady = true;
                }
            }
        }
    };
</script>

<style scoped>
    .container {
        flex: 1;
    }
</style>
