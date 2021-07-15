<template>
<div class="user-list">
<v-card>
    <v-card-title>
        User list
    </v-card-title>
    <v-container>
        <v-data-table :headers="headers" :items="userList">
        </v-data-table>
    </v-container>
</v-card>
</div>
</template>

<script src="../../services/user/user_list.js">
</script>
<style scoped src="../../assets/css/pages/user/user-list.css">
</style>