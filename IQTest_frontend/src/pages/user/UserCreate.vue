<template>
  <v-app>
    <v-card color="lighten-4" flat height="200px" tile>
      <v-toolbar dark color="primary" tile>
        <v-container>
          <v-row>
            <v-toolbar-title class="title">
              <span>{{ title }}</span>
            </v-toolbar-title>
            <div class="route-links"></div>
            <v-spacer></v-spacer>
            <div class="route-links">
              <router-link class="route-link" :to="{ name: 'login' }"
                >Login</router-link
              >
            </div>
          </v-row>
        </v-container>
      </v-toolbar>
      <v-container>
        <v-card class="mx-auto" width="600">
          <v-card-title>
            <span class="title font-weight-light">Register Form</span>
          </v-card-title>
          <v-form ref="form" v-model="valid" @submit.prevent="create">
            <v-card-text>
              <div class="create-error">{{ error }}</div>
              <div>
                <v-text-field
                  v-model="email"
                  type="text"
                  label="Email"
                  :rules="emailRules"
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  v-model="name"
                  type="name"
                  label="name"
                  :rules="nameRules"
                  hide-details="auto"
                ></v-text-field>
              </div>
              <div>
                <v-text-field
                  v-model="phone"
                  type="phone"
                  label="phone"
                  :rules="phoneRules"
                  hide-details="auto"
                ></v-text-field>
              </div>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-spacer></v-spacer>
                <v-btn type="submit" :disabled="!valid" large color="primary"
                  >Submit</v-btn
                >
              </div>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-container>
    </v-card>
  </v-app>
</template>

<script src="../../services/user/create_user.js">
</script>

<style scoped src="../../assets/css/pages/user/create-user.css">
</style>
