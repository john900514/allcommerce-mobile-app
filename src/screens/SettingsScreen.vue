<template>
    <scroll-view class="outer-scroll-view">
        <view class="container">
            <view class="view-style-one">
                <view class="style-twenty-five"></view>
            </view>

            <view class="allcommerce-links" v-if="allcommerce">
                <view  class="view-style-two">
                    <touchable-opacity :active-opacity="0.5" @press="$emit('merchants')">
                        <text class="text-style-two">Merchants</text>
                    </touchable-opacity>
                </view>
            </view>
            <view class="merchant-links" v-if="merchantMode">
                <view class="view-style-two">
                    <touchable-opacity :active-opacity="0.5" @press="$emit('inventory')">
                        <text class="text-style-two">Inventory</text>
                    </touchable-opacity>
                </view>
            </view>

            <view class="view-style-two">
                <touchable-opacity @press="$emit('logout')">
                    <text class="text-style-two">Logout</text>
                </touchable-opacity>
            </view>
            <view class="view-style-one">
                <view class="style-twenty-five"></view>
            </view>

            <view class="fine-print">
                <view class="inner-fine-print">
                    <text class="fine-print-text"> v {{version}} ({{build}})</text>
            </view>
            <text class="fine-print-text">
                <font-awesome-icon :icon="copyright_icon" class="fp-copy-right"/> 2020.THE Athletic Club. All Rights Reserved.
            </text>
        </view>
        </view>
    </scroll-view>
</template>

<script>
    import React from 'react';
    import {
        ScrollView,
        TouchableOpacity,
        View
    } from 'react-native';
    import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
    import { faCopyright } from '@fortawesome/pro-regular-svg-icons';

    export default {
        name: "SettingsScreen",
        props: ['allcommerce', 'merchantMode', 'version', 'build'],
        components: {
            FontAwesomeIcon,
            ScrollView,
            TouchableOpacity,
            View
        },
        data() {
            return {
                copyright_icon: faCopyright
            };
        },
        methods: {

        },
    }
</script>

<style scoped>
    .outer-scroll-view {
        background-color: #2D2D2D;
        padding: 0;
    }

    .container {
        flex: 1;
        padding: 0;
    }

    .view-style-one {
        background-color: #2D2D2D;
        border-color: transparent;
        border-width: .5;
        flex-grow: 1;
        padding-left: 10;
        padding-bottom: 10;
    }

    .style-twenty-five {
        padding: 25;
    }

    .view-style-two {
        background-color: #2D2D2D;
        border-color: transparent;
        border-width: .5;
        flex-grow: 1;
        font-size: 22;
    }

    .text-style-two {
        font-family: simplicitapro-bold;
        padding: 10;
        padding-left: 15;
        color: #ffffff;
        font-size: 20;
    }

    .fine-print {
        padding-left: 15;
        align-items:flex-start;
        margin-bottom: 30;
    }

    .inner-fine-print {
        flex-direction: row;
    }

    .fine-print-text {
        color: #fff;
        font-size: 12;
        margin-bottom: 12;
        font-family: simplicitapro-bold;
        margin-left: 1%;
        margin-right: 1%;
    }

    .fp-copy-right {
        color: #fff;
        font-weight: 100;
        font-size: 8;
    }
</style>
