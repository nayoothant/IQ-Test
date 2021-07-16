<template>
      <v-card color="lighten-4" flat tile class="navbar">
<v-toolbar dark color="primary" tile>
            <v-container>
                <v-row>
                    <v-toolbar-title class="title">
                        <span>IQ TEST</span>
                    </v-toolbar-title>
                    <div class="route-links">
                      <router-link class="route-link" :to="{ name: 'user-list' }">User List</router-link>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="route-links">
                        <router-link class="route-link" :to="{ name: 'login' }">Log Out</router-link>
                    </div>
                </v-row>
            </v-container>
        </v-toolbar>
        
  </v-card>
</template>
<style scoped src="../assets/css/components/navbar.css">
</style>