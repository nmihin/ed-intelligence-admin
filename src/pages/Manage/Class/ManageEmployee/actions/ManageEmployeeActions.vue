<template>
  <div>
    <!-- CREATE ACCOUNT CODE START -->
    <CreateEmployeeModal 
        ref="CreateTemplateModal"
    />
    <!-- CREATE ACCOUNT CODE END -->
    <!-- ADD/EDIT EMPLOYEE CODE START -->
    <AddEditEmployeeModal 
        ref="AddEditTemplateModal"
    />
    <!-- ADD/EDIT EMPLOYEE CODE END -->
    <!-- LEAVE ENTRY CODE START -->
    <LeaveEntryModal 
        ref="LeaveEntryTemplateModal"
    />
    <!-- LEAVE ENTRY CODE END -->
    <!-- DELETE CODE START -->
    <DeleteEmployeeModal 
        ref="DeleteTemplateModal"
        :deleteEmployeeConfirmParent ="deleteCodeConfirm"
    />
    <!-- DELETE CODE END -->
    <!-- PROFILE CODE START -->
    <ProfileEmployeeModal 
        ref="ProfileTemplateModal"
    />
    <!-- PROFILE CODE END -->
    <div class="element" @click="entrySelectedAction(sn)">
      <el-tooltip class="item" effect="dark" content="Leave Entry" placement="top">
        <i class="icon icon-entry"></i>
      </el-tooltip>
    </div>
    <div class="element" @click="profileSelectedAction(sn)">
      <el-tooltip class="item" effect="dark" content="View Profile" placement="top">
        <i class="icon icon-profile"></i>
      </el-tooltip>
    </div>
    <div class="element" @click="addEditEmployeeAction(sn,'Edit')">
      <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
        <i class="icon icon-edit"></i>
      </el-tooltip>
    </div>
    <div class="element" @click="deleteSelectedAction(sn)">
      <el-tooltip class="item" effect="dark" content="Delete Profile" placement="top">
        <i class="icon icon-delete"></i>
      </el-tooltip>
    </div>
    <div class="element" @click="createSelectedAction(sn)">
      <el-tooltip class="item" effect="dark" content="Create Account" placement="top">
        <i class="icon icon-add"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// COMPONENTS
  import ProfileEmployeeModal from '../modals/ProfileEmployeeModal.vue';
  import DeleteEmployeeModal from '../modals/DeleteEmployeeModal.vue';
  import LeaveEntryModal from '../modals/LeaveEntryModal.vue';
  import CreateEmployeeModal from '../modals/CreateEmployeeModal.vue';
  import AddEditEmployeeModal from '../modals/AddEditEmployeeModal.vue';

  export default {
    name: "manage-employee-actions",
    components: {
      ProfileEmployeeModal,
      LeaveEntryModal,
      CreateEmployeeModal,
      AddEditEmployeeModal,
      DeleteEmployeeModal
    },
    data() {
      return {
          sn:0,
          idx:0,
          posts:[]
      }
    },
    props: {
      parentDataTab: Array,
      parentDataTabSN: Number,
      deleteCodeConfirmParent: Function
    },
    watch: {
      parentDataTab: function() {
        this.posts = this.parentDataTab;
      },
      parentDataTabSN: function() {
        this.sn = this.parentDataTabSN;
      }
    },
    methods: {
       deleteCodeConfirm(idx){
          this.deleteCodeConfirmParent(idx);
       },
       addEditEmployeeAction(sn,type){
          this.$refs.AddEditTemplateModal.openModal(sn,type);
       },
       profileSelectedAction(sn){
          this.$refs.ProfileTemplateModal.openModal(sn);
       },
       entrySelectedAction(sn){
          this.$refs.LeaveEntryTemplateModal.openModal(sn);
       },
       deleteSelectedAction(sn){
          this.$refs.DeleteTemplateModal.openModal(sn);
       },
       createSelectedAction(sn){
          this.$refs.CreateTemplateModal.openModal(sn);
       },
      loadMore() {
        this.posts = this.parentDataTab;
        this.sn = this.parentDataTabSN;
      }
    },
    created() {
      this.loadMore();
    },
  };

</script>
