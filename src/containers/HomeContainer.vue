<template>
    <home
        :username="user.name"
        :merchant-name="getInitialMerchantData"
    ></home>
</template>

<script>
    import React from 'react';
    import  store  from "../store";

    import HomeScreen from '../screens/HomeScreen';
    const Home = HomeScreen;
    export default {
        name: "HomeContainer",
        components: {
            Home
        },
        props: {
            navigation: Object
        },
        data() {
            return {
                user: {},
                merchantName: '',
            };
        },
        computed: {
            getInitialMerchantData() {
                let active_merchant = store.getters.activeMerchantUUID;
                console.log('Active Merchant -'+ active_merchant);
                return store.state.user_merchant_uuid_list[active_merchant];
            }
        },
        methods: {
            getUserData() {
                this.user = store.state.user;
                console.log('Imported User Data', this.user);
            },

        },
        created() {
            console.log('HomeContainer - created() - ');
        },
        mounted() {
            console.log('HomeContainer mounted() - Restoring the State', this.navigation.state.params);
            store.dispatch("setstate", this.navigation.state.params);
            this.getUserData();
            this.merchantName = this.getInitialMerchantData;
        }
    }
</script>

<style scoped>

</style>
