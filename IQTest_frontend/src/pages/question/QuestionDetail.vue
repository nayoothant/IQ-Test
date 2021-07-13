<template>
<v-dialog v-model='isVisible' @click:outside="closeButtonClick()" v-if="isVisible" width="50%">

  <!-- Modal content -->
  <div class="modal-header">
    <span class="close" @click='closeButtonClick()'>&times;</span>
    <h3>Question Detail</h3>
  </div>
  <div class="modal-content">
    <p>{{ questionDetail.question_text }}</p>
    <v-radio-group row v-model="isRightAnswer">
      <div v-for="(item,index) in questionDetail.answer_choice" :key="index">
        <v-radio
        v-if="item"
        :key="index"
        :value="index"
        :disabled="true">
            <template v-if="isImageChoice" slot="label"><img  v-bind:src="getImage(item)"></template>
            <template  v-else slot="label">{{ item }}</template>
        </v-radio>
      </div>
    </v-radio-group>
  </div>
  <div class="modal-footer">
    <v-btn @click="goToUpdatePage">Edit</v-btn>
  </div>

</v-dialog>
</template>
<script src="../../services/question/question_detail.js">
</script>
<style scoped src="../../assets/css/pages/question/modal-popup.css">
</style>
