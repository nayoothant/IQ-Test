<template>
  <div class="question-group-edit">
    <h1 class="title">{{ groupDisp }} >> {{ typeDisp }}</h1>
    <div>
      <v-alert v-model="alertVisible" color="error" dismissible>
        {{ message }}
      </v-alert>
    </div>
    <v-form ref="form" lazy-validation>
      <v-simple-table class="form-table">
        <tbody>
          <tr>
            <td>Question Group</td>
            <td>
              <v-text-field
                v-model="qstGroup"
                label="Question Group"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <td>Question Type</td>
            <td>
              <v-text-field
                v-model="qstType"
                label="Question Type"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <td>Description</td>
            <td>
              <v-text-field
                v-model="description"
                label="Description"
              ></v-text-field>
            </td>
          </tr>
          <tr>
            <td>Duration</td>
            <td>
              <v-text-field
                type="number"
                min="0"
                max="60"
                v-model="duration"
                @blur="updateDuration"
                label="Duration"
                required
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn color="success" @click="updateGroup"> Update </v-btn>
    </v-form>
  </div>
</template>
<script src="../../services/question/question_group_edit.js">
</script>
<style scoped src="../../assets/css/pages/question/question-group-edit.css">
</style>