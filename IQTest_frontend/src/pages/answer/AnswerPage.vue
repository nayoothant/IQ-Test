<template>
  <v-card class="mx-auto" width="80%">
    <v-card-title>
      <span class="title font-weight-light">Question</span>
    </v-card-title>
    <v-container fluid v-if="desVisiable">
      <v-textarea
        name="question"
        filled
        auto-grow
        :value="`${description}`"
      ></v-textarea>
      <v-btn small color="primary" @click="startAnswer">Start</v-btn>
    </v-container>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="storeAnswer"
      v-if="questVisiable"
    >

      <div v-for="(item_by_type, qtype) in question" :key="qtype">
        <v-card-text>
          <div v-for="(item, idx) in item_by_type" :key="idx">
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
      </div>
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
</template>

<script src="../../services/answer/answer.js"></script>
