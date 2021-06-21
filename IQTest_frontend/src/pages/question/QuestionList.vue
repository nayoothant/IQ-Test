<template>
<div>
  <div class='sidenav'>
    <div v-for="item in questionList" :key="item.id">
      <button class="dropdown-btn"> 
        {{ item.qstGroup }}
      </button>
      <div class="dropdown-container" >
      <a v-for="question in item.questionTypeList" :key="question.id" @click="getQuestionInfo(question)"> 
        {{ question.question_type }}
      </a>
      </div>
    </div>
  </div>
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
  </div>
</div>
</template>
<style>
.sidenav{
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #BEBEBE;
  overflow-x: hidden;
  padding-top: 20px;
  color: #818181;
}
.sidenav a, .dropdown-btn {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 20px;
  color: #818181;
  display: block;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  outline: none;
}
.sidenav a:hover, .dropdown-btn:hover {
  color: #f1f1f1;
}
.dropdown-container {
  display: none;
  background-color: #BEBEBE;
  padding-left: 8px;
}
.active {
  background-color: green;
  color: white;
}
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
</style>
<script src="../../services/question/question_list.js">

</script>