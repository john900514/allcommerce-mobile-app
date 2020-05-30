<template>
    <view>
        <view v-for="(name, uuid) in merchants">
            <button :title="name" @press="$emit('selected', uuid)"></button>
        </view>
    </view>
</template>

<script>
    export default {
        name: "MerchantSelectScreen",
        props: ['merchants'],
        mounted() {}
    }
</script>

<style scoped>

</style>
