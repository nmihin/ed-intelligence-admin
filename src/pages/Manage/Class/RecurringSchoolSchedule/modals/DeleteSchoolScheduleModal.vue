<template>
  <md-dialog :md-active.sync="deleteSchoolScheduleModal" class="modal-window manage-menu">
    <h2 class="modal-title">Delete Class Period</h2>
    <div class="modal-content">
      <p>
        You are about to class period with SN <span style="color:var(--primary)">"{{sn}}"</span>. Are you sure you want to do this?
      </p>
    </div>
    <md-dialog-actions>
      <el-button class="button medium ed-btn__tertiary" @click="deleteSchoolScheduleConfirm(sn)">Delete</el-button>
      <el-button class="button medium ed-btn__primary" @click="deleteSchoolScheduleModal = false">Cancel</el-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "delete-school-schedule",
    components: {},
    // DATA
    data: () => ({
        sn:0,
        deleteSchoolScheduleModal : false,
        classPeriodSelectedToDelete: 0,
    }),
    props: {
        deleteSchoolScheduleModalParent: Boolean,
        classPeriodSelectedToDeleteParent: Number,
        deleteSchoolScheduleConfirmParent: Function
    },
    watch: {
        deleteSchoolScheduleModalParent: function(){
            this.deleteSchoolScheduleModal = true;
        },
        classPeriodSelectedToDeleteParent: function(){
          this.classPeriodSelectedToDelete = this.classPeriodSelectedToDeleteParent;
        }
    },
    methods: {
      openModal(sn){
        this.sn = sn;
        this.deleteSchoolScheduleModal = true;
      },
      deleteSchoolScheduleConfirm(sn){
        this.deleteSchoolScheduleConfirmParent(sn);
        this.deleteSchoolScheduleModal = false;
      }
    }
  }

</script>
