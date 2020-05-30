<template>
    <root>
        <app-navigator></app-navigator>
    </root>
</template>

<script>

    import { Root } from "native-base";

    import AppNavigator from './navigators/AppNavigatorComponent';

    export default {
        name: "App",
        components: { Root, AppNavigator }
    }
</script>

<style scoped>

</style>
