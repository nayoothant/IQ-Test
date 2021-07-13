<template>
<v-dialog v-model='isVisible' @click:outside="closeDeleteAlert()" v-if="isVisible" width="50%">
    <!-- Modal content -->
    <div class="modal-header">
      <span class="close" @click="closeDeleteAlert()">&times;</span>
      <h3>Delete Question</h3>
    </div>
    <div class="modal-content">
      <p>Are you Sure?</p>
    </div>
    <div class="modal-footer">
      <v-btn color="success" class="mr-3" @click="closeDeleteAlert()">cancel</v-btn>
      <v-btn color="error" @click="deleteQuestion()">Delete</v-btn>
    </div>
</v-dialog>
</template>
<script src="../../services/question/question_delete.js">
</script>
<style scoped src="../../assets/css/pages/question/modal-popup.css">
</style>
