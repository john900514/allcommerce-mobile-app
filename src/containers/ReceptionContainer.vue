<template>
    <reception
        :loading="getLoadingState"
        :lottiefile="lottiefile"
        :lottiesize="getLoadingSize"
        :route="getIntendedRoute"
    ></reception>
</template>

<script>
    import ReceptionScreen from '../screens/ReceptionScreen';
    import { AsyncStorage } from 'react-native';
    import  store  from "../store";
    const reception = ReceptionScreen;

    export default {
        name: "ReceptionContainer",
        components: {
            reception
        },
        props: {
            navigation: Object
        },
        watch: {
            getIntendedRoute(route) {
                console.log('Sending to route '+ route);
                this.navigation.navigate(route, store.state);
            }
        },
        computed: {
            getLoadingState() {
                return store.state.loading;
            },
            getLoadingSize() {
                return store.getters.loadingScreenSize;
            },
            getIntendedRoute() {
                return store.getters.intended_route;
            }
        },
        data() {
            return {
                lottiefile: '',
                intendedRoute: ''
            };
        },
        methods: {
            async goFindMe () {
                let _this = this;
                await store.dispatch('findme', this.navigation).then(function () {
                    console.log('The Route is now set to - '+_this.getIntendedRoute);
                });
            }
        },
        created() {
            this.lottiefile = Platform.OS  === 'ios' ? require("../../assets/loading/loading.json") : require('react-native-animated-loader/src/loader.json');
            console.log('ReceptionContainer created() - Restoring the State', this.navigation.state.params);
            store.dispatch("setstate", this.navigation.state.params);
            //console.log(store.state);
        },
        mounted() {
            console.log('ReceptionContainer mounted() - Mounted & Locating User Data..');
            this.goFindMe();
        }
    }
</script>

<style scoped>

</style>
