<template>
  <div class='sidenav' color="primary">
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
<script src="../services/components/sidebar.js">

</script>
<style scoped src="../assets/css/components/sidebar.css">
</style>
