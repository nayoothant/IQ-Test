<template>
<div>
    <div class='question-create'>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
        <v-simple-table class='form-table'>
        <tbody>
        <tr>
            <td :rowspan='2'>Question Group</td>
            <td>        <v-text-field
                v-model="qstGroup"
                label="New Question Group"
                v-on:blur="setQstGroup($event.target.value)"
                required
            ></v-text-field>
            </td>
        </tr> 
        <tr>
            <td>        
            <v-select
                v-model="select"
                :items="qstGroupList"
                label="Old Question Group"
                required
            ></v-select> 
            </td>
        </tr>
        <tr v-if='descriptionVisible'>
        <td>Description</td>
        <td>        <v-text-field
            v-model="description"
            required
      ></v-text-field></td>
      </tr>
        <tr>
        <td>Question Text</td>
        <td>        <v-text-field
            v-model="qstText"
            required
      ></v-text-field></td>
      </tr>
      <tr>
        <td>Choose Choice Count</td>
        <td>        
            <v-select
                v-model="select"
                :items="choiceCount"
                v-on:change="setChoiceCount"
            ></v-select> 
        </td>
      </tr>
      <tr v-if='choiceOneVisible'>
        <td>Question Choice One</td>
        <td>        <v-text-field
            v-model="choiceOne"
            v-on:blur="setChoiceOne($event.target.value)"
      ></v-text-field></td>
      </tr>
      <tr v-if='choiceTwoVisible'>
        <td>Question Choice Two</td>
        <td>        <v-text-field
            v-model="choiceTwo"
            v-on:blur="setChoiceTwo($event.target.value)"
      ></v-text-field></td>
      </tr>
      <tr v-if='choiceThreeVisible'>
        <td>Question Choice Three</td>
        <td>        <v-text-field
            v-model="choiceThree"
            v-on:blur="setChoiceThree($event.target.value)"
      ></v-text-field></td>
      </tr>
      <tr v-if='choiceFourVisible'>
        <td>Question Choice Four</td>
        <td>        <v-text-field
            v-model="choiceFour"
            v-on:blur="setChoiceFour($event.target.value)"
      ></v-text-field></td>
      </tr>
      <tr v-if='choiceFiveVisible'>
        <td>Question Choice Five</td>
        <td>        <v-text-field
            v-model="choiceFive"
            v-on:blur="setChoiceFive($event.target.value)"
      ></v-text-field></td>
      </tr>
      <tr v-if='rightAnswerVisible'>
        <td>Right Answer</td>
        <td>        
            <v-select
                v-model="ans"
                :items="choiceList"
            ></v-select> 
        </td>
      </tr>
        </tbody>
        </v-simple-table>
      <v-btn color='success'>
        Create
      </v-btn>
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

<script src="../../services/question/question_create.js">

</script>