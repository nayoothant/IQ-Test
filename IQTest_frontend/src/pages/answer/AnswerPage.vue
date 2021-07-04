<template>
  <v-card class="mx-auto" width="80%">
    <v-card-title>
      <span class="title font-weight-light">Question</span>
    </v-card-title>
    <div v-for="(itemByType, typeIdx) in questionGroup" :key="typeIdx">
        <v-container fluid v-if="isDescriptionVisiable">
          <v-textarea
            name="question"
            filled
            auto-grow
            :value="`${description[typeIdx]}`"
          ></v-textarea>
          <v-btn
            small
            color="primary"
            @click.prevent="startAnswer(itemByType, typeIdx)"
            >Start</v-btn
          >
        </v-container>
      </div>
    <v-form ref="form" v-model="valid" @submit.prevent="storeAnswer">
      <div v-if="isQuestionVisiable">
        <v-row justify="center">
          <v-banner elevation="15"><span id="time">00:00 </span> minutes!</v-banner>
        </v-row>
        <v-card-text>
          <div v-for="(item, idx) in question" :key="idx">
            <v-container fluid>
              <v-textarea
                name="question"
                filled
                auto-grow
                :value="`${item.questionNo} . ${item.question_text}`"
              ></v-textarea>
            </v-container>
            <v-radio-group v-model="$data.userChoice[item.id]" row>
              <v-radio
                v-for="(answer, index) in item.answer_choice"
                :key="index"
                :value="`${index}`"
                :label="`${answer}`"
              ></v-radio>
            </v-radio-group>
            <hr />
          </div>
        </v-card-text>

        <v-card-actions>
          <div>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              :disabled="!valid"
              large
              color="primary"
              id="thebutton"
              >Submit</v-btn
            >
          </div>
        </v-card-actions>
      </div>
    </v-form>
  </v-card>
</template>

<script src="../../services/answer/answer.js"></script>
