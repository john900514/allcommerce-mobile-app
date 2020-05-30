<template>
    <view>
        <animated-loader :visible="loading"  overlay-color="rgba(6,54,158,0.8)"  :animation-style="lottiesize"  :speed="1"  :source="lottiefile" />
    </view>
</template>

<script>
    import AnimatedLoader from 'react-native-animated-loader';
    export default {
        name: "ReceptionScreen",
        components: {
            AnimatedLoader
        },
        props: ['lottiefile', 'loading', 'lottiesize', 'route'],
        created () {

        },
        methods: {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
