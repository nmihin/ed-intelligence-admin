<template>
  <md-dialog :md-active.sync="deleteEmployeeModal" class="modal-window manage-menu">
    <h2 class="modal-title">Delete Employee</h2>
    <div class="modal-content">
      <p>
        You are about to delete employee <span style="color:var(--primary)">"{{sn}}"</span>. Are you sure you want to do this?
      </p>
    </div>
    <md-dialog-actions>
      <md-button class="button medium ed-btn__tertiary" @click="
            deleteEmployeeConfirm(sn);
          ">Delete</md-button>
      <md-button class="button medium ed-btn__primary" @click="deleteEmployeeModal = false">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "delete-employee",
    components: {},
    // DATA
    data: () => ({
        sn:0,
        deleteEmployeeModal : false,
        employeeSelectedToDelete: 0,
    }),
    props: {
        deleteEmployeeModalParent: Boolean,
        employeeSelectedToDeleteParent: Number,
        deleteEmployeeConfirmParent: Function
    },
    watch: {
        deleteEmployeeModalParent: function(){
            this.deleteEmployeeModal = true;
        },
        employeeSelectedToDeleteParent: function(){
          this.employeeSelectedToDelete = this.employeeSelectedToDeleteParent;
        }
    },
    methods: {
      openModal(sn){
        this.sn = sn;
        this.deleteEmployeeModal = true;
      },
      deleteEmployeeConfirm(sn){
        this.deleteEmployeeConfirmParent(sn);
        this.deleteEmployeeModal = false;
      }
    }
  }

</script>
