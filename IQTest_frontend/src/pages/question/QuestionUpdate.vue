<template>
  <div>
    <div class="question-create">
      <h1 class="title">Update Question</h1>
      <div>
        <v-alert v-model="result" color="success" dismissible>
          Question is created successfully
        </v-alert>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-simple-table class="form-table">
          <tbody>
            <tr>
              <td>Question Group</td>
              <td>
                <v-text-field
                  v-model="qstGroup"
                  label="Question Group"
                  :disabled="true"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Question Type</td>
              <td>
                <v-text-field
                  v-model="qstType"
                  label="Question Type"
                  :disabled="true"
                  v-on:blur="setNewType($event.target.value)"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Question Text</td>
              <td>
                <v-text-field
                  v-model="qstText"
                  :rules="questionTextRule"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>Select Choice Type</td>
              <td>
                <v-radio-group v-model="choiceType" v-on:change="clearAnswerChoice"  row>
                  <v-radio label="Text" value="text"></v-radio>
                  <v-radio label="Image" value="image"></v-radio>
                </v-radio-group>
              </td>
            </tr>
            <tr>
              <td>Select Choice Count</td>
              <td>
                <v-select
                  v-model="selectChoiceCount"
                  :items="choiceCount"
                  :rules="choiceCountRule"
                  v-on:change="setChoiceCount"
                ></v-select>
              </td>
            </tr>
            <tr v-for="i in selectChoiceCount" :key="i">
              <td v-if="choiceTypeText">Question Choice {{ i }}</td>
              <td v-if="choiceTypeText">
                <v-text-field
                  v-model="answerChoice['choice' + i]"
                  :rules="questionChoiceRule"
                ></v-text-field>
              </td>
            </tr>
            <tr v-for="i in selectChoiceCount" :key="i+'photo'">
              <td v-if="choiceTypePhoto">Question Choice {{ i }}</td>
              <td v-if="choiceTypePhoto">
                <v-file-input
                  accept=".jpg"
                  label="Click here to select a .jpg file"
                  :rules="questionChoiceRule"
                  v-on:change="showImage($event, i)"
                  v-model="answerChoice['choice' + i]"
                >
                </v-file-input>
              </td>
              <td v-if="choiceTypePhoto"><img src="" :id="'image'+i"></td>
            </tr>
            <tr v-if="rightAnswerVisible">
              <td>Right Answer</td>
              <td>
                <v-select
                  v-model="rightAns"
                  :items="choiceList"
                  :rules="rightAnswerRule"
                ></v-select>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-btn color="success" @click="updateQuestion()"> Update </v-btn>
      </v-form>
    </div>
  </div>
</template>
<style>
.question-create {
  margin-left: 200px;
  padding: 10px;
}
.form-table {
  width: 80%;
}
</style>

<script src="../../services/question/question_update.js">
</script>
<style scoped src="../../assets/css/pages/question/question-update.css">
</style>