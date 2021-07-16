<template>
    <v-app>
    <NavBar v-if="isLoggedIn" />
    <SideBar v-if="isLoggedIn" />
        <router-view></router-view>
    </v-app>

</template>

<script src="../services/components/layout.js">

</script>

