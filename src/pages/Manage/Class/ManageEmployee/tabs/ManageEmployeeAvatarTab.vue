<template>
<div class="row search-results">
    <div v-for="(item, index) in posts" :key="index" class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-4 ed_card-boxes">
      <div class="card-box">
        <div class="card-title">
          <h2>{{ item.name }} {{ item.surname }}</h2>
        </div>
        <div class="card-content">
          <figure>
            <img v-if="!item.avatar" class="card-picture" src="../../../../../assets/images/avatar-aux.png" />
            <img v-if="item.avatar" class="card-picture" :src="item.avatar" />
            <figcaption>
              <ul>
                <li class="attendance-list-avatar">
                  <h3>SN:{{item.sn}}</h3>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Name: {{item.name}}</h3>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Surname: {{item.surname}}</h3>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Email: {{item.email}}</h3>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Status: {{item.status}}</h3>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Agreement Type: {{item.agreementType}}</h3>
                </li>
                <li>
                    <div class="element" @click="entrySelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Leave Entry" placement="top">
                            <i class="icon icon-entry"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="profileSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="View Profile" placement="top">
                            <i class="icon icon-profile"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="addEditEmployeeAction(item.sn,'Edit')">
                        <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="deleteSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Delete Profile" placement="top">
                            <i class="icon icon-delete"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="createSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Create Account" placement="top">
                            <i class="icon icon-add"></i>
                        </el-tooltip>
                    </div>
                </li>
              </ul>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
</div>
</template>

<script>
  export default {
    name: "manage-employee-avatar",
    components: {

    },
    data() {
      return {
          posts:[]
      }
    },
    props: {
      parentData: Array
    },
    watch: {
      parentData: function() {
        this.posts = this.parentData;
      }
    },
    methods: {
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
       editSelectedAction(sn){
         this.$router.push({path:'/profile/employee/edit/'+sn})
       },
      loadMore() {

      }
    },
    created() {
      this.loadMore();
    },
  };

</script>
