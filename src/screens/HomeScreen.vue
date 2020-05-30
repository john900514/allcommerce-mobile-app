<template>
    <view>
        <view>
            <text>{{ username }}'s Dashboard</text>
            <text>Merchant: {{merchantName}}</text>
            <text>You are logged in!</text>
        </view>
    </view>
</template>

<script>
    export default {
        name: "HomeScreen",
        props: ['username', 'merchantName']
    }
</script>

<style scoped>

</style>
