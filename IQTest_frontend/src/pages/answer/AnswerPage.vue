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
        :value="`${question[0].description}`"
      ></v-textarea>
      <v-btn
        small
        color="primary"
        @click='startAnswer'
        >Start</v-btn
      >
    </v-container>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="create"
      v-if="questVisiable"
    >
      <v-card-text>
        <div v-for="item in question" :key="item.id">
          <v-container fluid>
            <v-textarea
              name="question"
              filled
              auto-grow
              :value="`${item.questionNo} . ${item.question_text}`"
            ></v-textarea>
          </v-container>
          <v-radio-group :v-model="`${item.id}`" row>
            <div v-if="item.choice_one">
              <v-radio
                id="one"
                :name="`${item.id}`"
                :value="`${item.choice_one}`"
                :label="`${item.choice_one}`"
              ></v-radio>
            </div>
            <div v-if="item.choice_two">
              <v-radio
                id="one"
                :name="`${item.id}`"
                :value="`${item.choice_two}`"
                :label="`${item.choice_two}`"
              ></v-radio>
            </div>
            <div v-if="item.choice_three">
              <v-radio
                id="one"
                :name="`${item.id}`"
                :value="`${item.choice_three}`"
                :label="`${item.choice_three}`"
              ></v-radio>
            </div>
            <div v-if="item.choice_four">
              <v-radio
                id="one"
                :name="`${item.id}`"
                :value="`${item.choice_four}`"
                :label="`${item.choice_four}`"
              ></v-radio>
            </div>
            <div v-if="item.choice_five">
              <v-radio
                id="one"
                :name="`${item.id}`"
                :value="`${item.choice_five}`"
                :label="`${item.choice_five}`"
              ></v-radio>
            </div>
          </v-radio-group>
          <hr />
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
</template>

<script src="../../services/answer/answer.js"></script>
