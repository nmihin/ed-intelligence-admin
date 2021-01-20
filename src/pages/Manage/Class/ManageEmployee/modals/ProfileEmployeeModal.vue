<template>
  <md-dialog :md-active.sync="profileEmployeeModal" class="modal-window manage-menu">
    <h2 class="modal-title">Profile Employee</h2>
    <div class="modal-content">
        CONTENT
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__primary" @click="profileEmployeeModal = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "profile-employee",
    components: {},
    // DATA
    data: () => ({
        sn:0,
        profileEmployeeModal : false
    }),
    props: {
        profileEmployeeModalParent: Boolean
    },
    watch: {
        profileEmployeeModalParent: function(){
            this.profileEmployeeModal = true;
        }
    },
    methods: {
      openModal(sn){
        this.sn = sn;
        this.profileEmployeeModal = true;
      }
    }
  }

</script>
