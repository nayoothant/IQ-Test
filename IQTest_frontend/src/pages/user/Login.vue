<template>
<v-card class="mx-auto" width="600">
    <v-card-title class="login-title">
        <span class="title font-weight-light">Login</span>
    </v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-card-text>
            <div class="login-error">{{error}}</div>
            <div class="login-input">
                <v-text-field v-model="username" type="text" :rules="nameRules" label="Username" hide-details="auto"></v-text-field>
            </div>
            <div class="login-input">
                <v-text-field v-model="password" type="password" label="Password" :rules="pwdRules" hide-details="auto"></v-text-field>
            </div>
        </v-card-text>
        <v-card-actions>

            <div class="login-action">
                <v-spacer></v-spacer>
                <v-btn type="submit" :disabled="!valid" large color="primary">Login</v-btn>
            </div>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script src="../../services/user/login.js">
</script>

<style scoped src="../../assets/css/pages/user/login.css">

</style>
