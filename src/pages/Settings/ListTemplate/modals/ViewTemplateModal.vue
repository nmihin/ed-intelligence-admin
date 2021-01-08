<template>
  <md-dialog :md-active.sync="viewEmailTemplate" class="modal-window">
    <h2 class="modal-title">View Email Template</h2>
    <div class="modal-content">
      <div>
        This is an auto-generated email by the system to notify that attendance for the followiing dates by the teacher, class by {teacher_name}, have not been entered into the system yet. {non_attended_table} Auto generated email from Ed-Intelligence.
      </div>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="viewEmailTemplate = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "list-template-view-template",
    components: {
    },
    // DATA
    data: () => ({
      viewEmailTemplate: false
    }),
    props: {
        viewEmailTemplateParent: Boolean
    },
    watch: {
       viewEmailTemplateParent: function(){
            this.viewEmailTemplate = true;
       }
    },
    methods: {
        openModal(){
          this.viewEmailTemplate = true;
        }
    }
  }

</script>
