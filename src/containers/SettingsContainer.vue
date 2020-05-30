<template>
    <settings
        v-on:logout="handleLogout()"
        v-on:merchants="handleMerchants"
        v-on:inventory="handleInventory"
        :allcommerce="isAllCommerceUser"
        :merchant-mode="isInMerchantMode"
        :version="version"
        :build="build"
    ></settings>
</template>

<script>
    import React from 'react';
    import  store  from "../store";
    import SettingsScreen from '../screens/SettingsScreen'

    import getENVFunctions from "../../config/env";
    const config = getENVFunctions();
    const { build } = config.getEnvVars;
    const version = config.getBuildVersion;

    const Settings = SettingsScreen;

    export default {
        name: "SettingsContainer",
        components: {
            Settings
        },
        props: {
            navigation: Object
        },
        computed: {
            isAllCommerceUser() {
                return store.state.is_allcommerce_user;
            },
            isInMerchantMode() {
                let allcommerce_uuid = store.state.capeandbay_uuid;
                let active_merchant_uuid = store.state.active_merchant_uuid;

                return (allcommerce_uuid !== active_merchant_uuid);
            }
        },
        data() {
            return {
                version: version,
                build: build
            };
        },
        methods: {
            handleLogout() {
                store.dispatch('logout', this.navigation);
            },
            handleMerchants() {
                store.dispatch('unsetMerchantState', this.navigation);
            },
            handleInventory() {
                this.navigation.navigate('Inventory', store.state);
            }
        },
        created() {
            //console.log(store.state);
        },
        mounted() {
            console.log('SettingsContainer mounted() - Restoring the State', this.navigation.state.params);
            store.dispatch("setstate", this.navigation.state.params);
        }
    }
</script>

<style scoped>

</style>
