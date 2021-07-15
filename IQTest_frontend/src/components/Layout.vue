<template>
    <v-app>
    <SideBar v-if="isLoggedIn" />
        <router-view></router-view>
    </v-app>

</template>

<script src="../services/components/layout.js">

</script>

