<template>
<v-card>
    <v-card-title>
        User list
    </v-card-title>
    <v-container>
        <v-data-table :headers="headers" :items="userList">
        </v-data-table>
    </v-container>
</v-card>
</template>

<script src="../../services/user/user_list.js">
</script>

