<template>
  <div>
    <div class="question-create">
      <h1 class="title">Create Question</h1>
      <div>
        <v-alert v-model="result" color="success" dismissible>
          Question is created successfully
        </v-alert>
      </div>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-simple-table class="form-table">
          <tbody>
            <tr>
              <td :rowspan="2">Question Group</td>
              <td>
                <v-text-field
                  v-model="qstGroup"
                  label="New Question Group"
                  :disabled="newGroupDisable"
                  :rules="questionGroupRule"
                  v-on:blur="setQstGroup($event.target.value)"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>
                <v-select
                  v-model="selectGroup"
                  :items="qstGroupList"
                  :disabled="oldGroupDisable"
                  :rules="questionGroupRule"
                  label="Old Question Group"
                  :clearable="true"
                  v-on:change="getQstType"
                  required
                ></v-select>
              </td>
            </tr>
            <tr>
              <td :rowspan="2">Question Type</td>
              <td>
                <v-text-field
                  v-model="qstType"
                  label="New Question Type"
                  :disabled="newTypeDisable"
                  :rules="questionTypeRule"
                  v-on:blur="setNewType($event.target.value)"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr>
              <td>
                <v-select
                  v-model="selectType"
                  :items="qstTypeList"
                  :disabled="oldTypeDisable"
                  :rules="questionTypeRule"
                  label="Old Question Type"
                  v-on:change="setOldType"
                  :clearable="true"
                  required
                ></v-select>
              </td>
            </tr>
            <tr v-if="descriptionVisible">
              <td>Description</td>
              <td>
                <v-text-field
                  v-model="description"
                  :rules="descriptionRule"
                  required
                ></v-text-field>
              </td>
            </tr>
            <tr v-if="durationVisible">
              <td>Duration</td>
              <td>
                <v-text-field
                  v-model="duration"
                  type="number"
                  min="0"
                  max="60"
                  @blur="updateDuration"
                  :rules="durationRule"
                  required
                />
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
                <v-radio-group v-model="choiceType" row>
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
            <tr v-for="i in selectChoiceCount" :key="i+'photo'" colspan="2">
              <td v-if="choiceTypePhoto">Question Choice {{ i }}</td>
              <td v-if="choiceTypePhoto">
                <v-file-input
                  accept=".jpg"
                  label="Click here to select a .jpg file"
                  :rules="questionChoiceRule"
                  v-model="answerChoice['choice' + i]"
                  v-on:change="showImage($event, i)"
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
        <v-btn color="success" @click="createQuestion"> Create </v-btn>
      </v-form>
    </div>
  </div>
</template>

<script src="../../services/question/question_create.js">
</script>
<style scoped src="../../assets/css/pages/question/question-create.css">
</style>