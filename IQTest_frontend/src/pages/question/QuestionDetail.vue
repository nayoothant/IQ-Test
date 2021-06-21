<template>
<div id="myModal" class="modal" v-if='isVisible'>

  <!-- Modal content -->
  <div class="modal-header">
    <span class="close" @click='closeButtonClick()'>&times;</span>
    <h3>Question Detail</h3>
  </div>
  <div class="modal-content">
    <p>{{ questionDetail.question_text }}</p>
    <v-radio-group v-model="isRightAnswer">
        <v-radio v-if='isChoiceOneExist'
        :key="1"
        :value="1"
        :disabled="true">
            <template slot="label">{{ questionDetail.choice_one }}</template>
        </v-radio>
        <v-radio v-if='isChoiceTwoExist'
        :key="2"
        :value="2"
        :disabled="true">
            <template slot="label">{{ questionDetail.choice_two }}</template>
        </v-radio>
        <v-radio v-if='isChoiceThreeExist'
        :key="3"
        :value="3"
        :disabled="true">
            <template slot="label">{{ questionDetail.choice_three }}</template>
        </v-radio> 
        <v-radio v-if='isChoiceFourExist'
        :key="4"
        :value="4"
        :disabled="true">
            <template slot="label">{{ questionDetail.choice_four }}</template>
        </v-radio> 
        <v-radio v-if='isChoiceFiveExist'
        :key="2"
        :value="2"
        :disabled="true">
            <template slot="label">{{ questionDetail.choice_five }}</template>
        </v-radio>  
    </v-radio-group>
  </div>
  <div class="modal-footer">
    <v-btn>Edit</v-btn>
  </div>

</div>
</template>
<style>
.modal { /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 200px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

.modal-header {
  background-color: #BEBEBE;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
.modal-footer {
  background-color: #BEBEBE;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}
/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
<script src="../../services/question/question_detail.js">

</script>
