<template>
  <md-dialog :md-active.sync="editEmailTemplate" class="modal-window">
    <h2 class="modal-title">Edit Email Template</h2>
    <div class="modal-content">
        <vue-editor v-model="content"></vue-editor>
    </div>
    <md-dialog-actions>
      <md-button class="button medium ed-btn__tertiary" @click="editEmailTemplate = false">Close</md-button>
      <md-button class="button medium ed-btn__secondary" @click="editEmailTemplate = false">Edit</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import { VueEditor, Quill } from "vue2-editor";

  export default {
    name: "list-template-edit-template",
    components: {
      VueEditor,
      Quill
    },
    // DATA
    data: () => ({
      editEmailTemplate: false,
      content: ""
    }),
    props: {
        editEmailTemplateParent: Boolean
    },
    watch: {
       editEmailTemplateParent: function(){
            this.editEmailTemplate = true;
       }
    },
    methods: {
        openModal(){
          this.editEmailTemplate = true;
          this.content ="This is an auto-generated email by the system to notify that attendance for the followiing dates by the teacher, class by {teacher_name}, have not been entered into the system yet. {non_attended_table} Auto generated email from Ed-Intelligence."
        }
    }
  }

</script>
