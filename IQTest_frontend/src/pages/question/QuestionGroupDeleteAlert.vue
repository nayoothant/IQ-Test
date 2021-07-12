<template>
  <div id="myModal" class="modal" v-if="isVisible">
    <!-- Modal content -->
    <div class="modal-header">
      <span class="close" @click="closeDeleteAlert()">&times;</span>
      <h3>Delete Group</h3>
    </div>
    <div class="modal-content">
      <p>Are you Sure?</p>
    </div>
    <div class="modal-footer">
      <v-btn color="success" class="mr-3" @click="closeDeleteAlert()">cancel</v-btn>
      <v-btn color="error" @click="deleteGroup()">Delete</v-btn>
    </div>
  </div>
</template>
<script src="../../services/question/question_group_delete.js">
</script>
<style scoped src="../../assets/css/pages/question/delete-alert.css">
</style>
