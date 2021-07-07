<template>
  <div>
    <div class="question-list" v-if="questionListVisible">
      <h1 class="title">{{ qstGroup }} >> {{ qstType }}</h1>
      <v-card>
        <v-card-title class="table-title">
          {{ questionInfoList[0].description }}
          <span class="duration"
            >Duration:{{ questionInfoList[0].duration }} min</span
          >
        </v-card-title>
        <v-container>
          <v-data-table
            :headers="headers"
            :items="questionInfoList"
            @dblclick:row="showQuestionDetail"
          >
          <template v-slot:[`item.answer_choice.choice1`]="{ item }">
              <img v-if="isImageChoice(item) && item.answer_choice.choice1" v-bind:src="getPath(item.answer_choice.choice1)">
              <span v-else> {{ item.answer_choice.choice1 }} </span>
           </template>
           <template v-slot:[`item.answer_choice.choice2`]="{ item }">
              <img v-if="isImageChoice(item) && item.answer_choice.choice2" v-bind:src="getPath(item.answer_choice.choice2)">
              <span v-else> {{ item.answer_choice.choice2 }} </span>
           </template>
           <template v-slot:[`item.answer_choice.choice3`]="{ item }">
              <img v-if="isImageChoice(item) && item.answer_choice.choice3" v-bind:src="getPath(item.answer_choice.choice3)">
              <span v-else> {{ item.answer_choice.choice3 }} </span>
           </template>
           <template v-slot:[`item.answer_choice.choice4`]="{ item }">
              <img v-if="isImageChoice(item) && item.answer_choice.choice4" v-bind:src="getPath(item.answer_choice.choice4)">
              <span v-else> {{ item.answer_choice.choice4 }} </span>
           </template>
           <template v-slot:[`item.answer_choice.choice5`]="{ item }">
              <img v-if="isImageChoice(item) && item.answer_choice.choice5" v-bind:src="getPath(item.answer_choice.choice5)">
              <span v-else> {{ item.answer_choice.choice5 }} </span>
           </template>
            <template v-slot:[`item.action`]="{ item }">
              <v-btn color="error" @click="deleteButtonClicked(item)"
                >Delete</v-btn
              >
            </template>
          </v-data-table>
        </v-container>
      </v-card>
      <QuestionDetail
        :visible="detailPopupVisible"
        :questionDetail="questionDetail"
        @click="closeButtonClick"
      ></QuestionDetail>
      <QuestionDeleteAlert
        :visible="alertPopupVisible"
        :questionDetail="questionDetail"
        @click="closeDeleteAlert"
      ></QuestionDeleteAlert>
      <v-btn class="createBtn" @click="goToQuestionCreate"
        >Create Question</v-btn
      >
    </div>
  </div>
</template>
<script src="../../services/question/question_list.js">
</script>
<style scoped src="../../assets/css/pages/question/question-list.css">
</style>