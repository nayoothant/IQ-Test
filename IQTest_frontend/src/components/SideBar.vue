<template>
  <v-card color="lighten-4" flat tile>
<v-toolbar dark color="primary" tile>
            <v-container>
                <v-row>
                    <v-toolbar-title class="title">
                        <span>{{ title }}</span>
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
  <div class='sidenav' color="primary">
    <div v-for="item in questionList" :key="item.id">
      <button class="dropdown-btn"> 
        {{ item.qstGroup }}
      </button>
      <div class="dropdown-container" >
      <a v-for="question in item.questionTypeList" :key="question.id" @click="setQuestionInfo(question)"> 
        {{ question.question_type }}
      </a>
      </div>
    </div>
  </div>
  </v-card>
</template>
<script src="../services/components/sidebar.js">

</script>
<style scoped src="../assets/css/components/sidebar.css">
</style>
