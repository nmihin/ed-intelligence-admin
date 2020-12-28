<template>
  <md-dialog :md-active.sync="deleteClassPeriodModal" class="modal-window manage-menu">
    <h2 class="modal-title">Delete Class Period</h2>
    <div class="modal-content">
      <p>
        You are about to class period with SN <span style="color:var(--primary)">"{{classPeriodSelectedToDelete}}"</span>. Are you sure you want to do this?
      </p>
    </div>
    <md-dialog-actions>
      <md-button class="button medium ed-btn__tertiary" @click="
            deleteClassPeriodConfirm(classPeriodSelectedToDelete);
          ">Delete</md-button>
      <md-button class="button medium ed-btn__primary" @click="deleteClassPeriodModal = false">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "delete-class-period",
    components: {},
    // DATA
    data: () => ({
        deleteClassPeriodModal : false,
        classPeriodSelectedToDelete: 0,
    }),
    props: {
        deleteClassPeriodModalParent: Boolean,
        classPeriodSelectedToDeleteParent: Number,
        deleteClassPeriodConfirmParent: Function
    },
    watch: {
        deleteClassPeriodModalParent: function(){
            this.deleteClassPeriodModal = true;
        },
        classPeriodSelectedToDeleteParent: function(){
          this.classPeriodSelectedToDelete = this.classPeriodSelectedToDeleteParent;
        }
    },
    methods: {
      openModal(){
        this.deleteClassPeriodModal = true;
      },
      deleteClassPeriodConfirm(sn){
        this.deleteClassPeriodConfirmParent(sn);
        this.deleteClassPeriodModal = false;
      }
    }
  }

</script>
