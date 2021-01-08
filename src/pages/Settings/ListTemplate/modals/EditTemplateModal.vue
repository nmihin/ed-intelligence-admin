<template>
  <md-dialog :md-active.sync="editEmailTemplate" class="modal-window edit-email-template">
    <h2 class="modal-title">Edit Email Template</h2>
    <div class="modal-content">
      <div class="row">
        <div class="col-12">
          <h2>Template</h2>
          <vue-editor v-model="content"></vue-editor>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>Include Email</h2>
          <el-tag class="tags button medium ed-btn__primary" @close="handleClose(tag)" :key="tag" v-for="tag in emailList" closable :disable-transitions="false">
            <span>{{tag}}</span>  
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else @click="showInput" class="tags button medium ed-btn__secondary">
              <i class="icon icon-add"></i>
              <span>Add a tag</span>
          </el-button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>Short Codes</h2>
          <ul>
            <li>Student name : {student_name}</li>
            <li>Student USI : {student_usi}</li>
            <li>Parent name : {parent_name}</li>
            <li>Parent contact : {parent_contact}</li>
            <li>Absent dates : {absent_date}</li>
            <li>Principle Name: {school_principle}</li>
            <li>None Recorded Dates : {non_recorded_date}</li>
            <li>event Date : {today}</li>
          </ul>
        </div>
      </div>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="editEmailTemplate = false">Close</button>
      <button class="button medium ed-btn__secondary" @click="editEmailConfirm(sn,emailList)">Edit</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import {
    VueEditor,
    Quill
  } from "vue2-editor";

  export default {
    name: "list-template-edit-template",
    components: {
      VueEditor,
      Quill
    },
    // DATA
    data: () => ({
      editEmailTemplate: false,
      content: "",
      inputVisible: false,
      inputValue: '',
      sn: 0,
      emailList: []
    }),
    props: {
      editEmailConfirmParent: Function
    },
    methods: {
      editEmailConfirm(sn,emailList){
        this.editEmailConfirmParent(sn,emailList);
        this.editEmailTemplate = false
      },
      handleClose(tag) {
        this.emailList.splice(this.emailList.indexOf(tag), 1);
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.emailList.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      openModal(sn,emailIncluded) {
        this.sn = sn;
        this.emailList = JSON.parse(JSON.stringify(emailIncluded));
        this.editEmailTemplate = true;
        this.content = "This is an auto-generated email by the system to notify that attendance for the followiing dates by the teacher, class by {teacher_name}, have not been entered into the system yet. {non_attended_table} Auto generated email from Ed-Intelligence."
      }
    }
  }

</script>
