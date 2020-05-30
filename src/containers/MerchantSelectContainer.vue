<template>
    <merchant-select
        :merchants="merchants"
        v-on:selected="handleMerchantSelect"
    ></merchant-select>
</template>

<script>
    import React from 'react';
    import  store  from "../store";

    import MerchantSelectScreen from '../screens/MerchantSelectScreen'

    const MerchantSelect = MerchantSelectScreen;

    export default {
        name: "MerchantSelectContainer",
        components: {
            MerchantSelect
        },
        props: {
            navigation: Object
        },
        data() {
            return {
                merchants: {}
            };
        },
        computed: {
            getUsersMerchants() {
                let merchs = store.state.user_merchant_uuid_list;
                console.log('Acquired Merchants List -', merchs);
                return store.state.user_merchant_uuid_list;

            }
        },
        methods: {
            handleMerchantSelect(uuid) {
                let payload = {
                    uuid: uuid,
                    nav: this.navigation
                };

                store.dispatch('setMerchantState', payload);
            }
        },
        created() {
            //console.log(store.state);
        },
        mounted() {
            console.log('MerchantSelectContainer mounted() - Restoring the State', this.navigation.state.params);
            store.dispatch("setstate", this.navigation.state.params);

            this.merchants = this.getUsersMerchants
        }
    }
</script>

<style scoped>

</style>
