<template>
  <div class='sidenav'>
    <div v-for="item in questionList" :key="item.id">
      <button class="dropdown-btn"> 
        {{ item.qstGroup }}
      </button>
      <div class="dropdown-container" >
      <a v-for="question in item.questionTypeList" :key="question.id" @click="setQuestionInfo(question)"> 
        {{ question.question_type }}
      </a>
      </div>
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
</style>
<script src="../services/components/sidebar.js">

</script>
