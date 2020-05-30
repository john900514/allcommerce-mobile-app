<template>
    <view>
        <text>Inventory, duh.</text>
    </view>
</template>

<script>
    import React from 'react';
    import  store  from "../store";

    import SettingsScreen from '../screens/SettingsScreen'

    const Settings = SettingsScreen;
    export default {
        name: "InventoryContainer",
        props: {
            navigation: Object
        },
        created() {
            //console.log(store.state);
        },
        mounted() {
            console.log('InventoryContainer mounted() - Restoring the State', this.navigation.state.params);
            store.dispatch("setstate", this.navigation.state.params);
        }
    }
</script>

<style scoped>

</style>
