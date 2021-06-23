<template>
<div>
  <div class="question-list" v-if='questionListVisible'>
    <h1 class="title">{{ qstGroup }} >> {{ qstType }}</h1>
    <v-card>
      <v-card-title class="table-title">
          {{ questionInfoList[0].description }}
          <span class="duration">Duration:{{ questionInfoList[0].duration }} min</span>
      </v-card-title>
      <v-container>
          <v-data-table :headers="headers" :items="questionInfoList" @click:row="showQuestionDetail">
          <template v-slot:item.created_at="{ item }">
            <span>{{ moment(item.created_at).format("MMMM DD YYYY") }}</span>
          </template>
          </v-data-table>
      </v-container>
    </v-card>    
      <QuestionDetail 
        :visible="detailPopupVisible"
        :questionDetail="questionDetail"
        @click="closeButtonClick"
      ></QuestionDetail>
      <v-btn class='createBtn' @click="goToQuestionCreate">Create Question</v-btn>
  </div>
</div>
</template>
<style>
.test {
  margin-left: 200px;
  font-size: 20px;
  padding: 0px 10px;
}
.question-list {
  margin-left: 200px;
  padding: 0px 20px;
}
.title {
  padding: 10px 10px 20px 10px;
  margin-bottom: 30px;
  border-bottom: 3px solid red;
}
.table-title {
  display: block;
}
.duration {
  float: right;
  color: red;
}
.createBtn {
  margin-top: 20px;
}
</style>
<script src="../../services/question/question_list.js">

</script>