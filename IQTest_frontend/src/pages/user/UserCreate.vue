<template>
    <v-card class="mx-auto" max-width="344">
    <v-card-title>
        <span class="title font-weight-light">Form</span>
    </v-card-title>
    <v-form ref="form" v-model="valid" @submit.prevent="create">
        <v-card-text>
            <div>{{error}}</div>
            <div>
                <v-text-field v-model="email" type="text" label="Email" :rules="emailRules" hide-details="auto"></v-text-field>
            </div>
            <div>
                <v-text-field v-model="name" type="name" label="name" hide-details="auto"></v-text-field>
            </div>
            <div>
                <v-text-field v-model="phone" type="phone" label="phone" hide-details="auto"></v-text-field>
            </div>
        </v-card-text>
        <v-card-actions>
            <div>
                <v-spacer></v-spacer>
                <v-btn type="submit" :disabled="!valid" large color="primary">Submit</v-btn>
            </div>
        </v-card-actions>
    </v-form>
</v-card>
</template>

<script src="../../services/user/create_user.js">
</script>

<style>

</style>