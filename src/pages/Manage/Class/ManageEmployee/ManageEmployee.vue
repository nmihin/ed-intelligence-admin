<template>
  <!-- Main Content START -->
  <div class="main-content">
    <!-- LEAVE ENTRY CODE START -->
    <LeaveEntryModal 
        ref="LeaveEntryTemplateModal"
    />
    <!-- LEAVE ENTRY CODE START -->
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
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-12 col-sm-6 col-md-4 offset-md-2">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="name" label="Name"></el-table-column>
            <el-table-column sortable property="surname" label="Surname"></el-table-column>
            <el-table-column sortable property="email" label="Email"></el-table-column>
            <el-table-column sortable property="status" label="Status"></el-table-column>
            <el-table-column sortable property="agreementType" label="Agreement Type"></el-table-column>
            <el-table-column property="action" label="Action" width="250">
                <template v-slot="scope">
                    <div class="element" @click="entrySelectedAction(scope.row.sn)">
                        <el-tooltip class="item" effect="dark" content="Leave Entry" placement="top">
                            <i class="icon icon-entry"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="profileSelectedAction(scope.row.sn)">
                        <el-tooltip class="item" effect="dark" content="View Profile" placement="top">
                            <i class="icon icon-profile"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="editSelectedAction(scope.row.sn)">
                        <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="deleteSelectedAction(scope.row.sn)">
                        <el-tooltip class="item" effect="dark" content="Delete Profile" placement="top">
                            <i class="icon icon-delete"></i>
                        </el-tooltip>
                    </div>
                    <div class="element">
                        <el-tooltip class="item" effect="dark" content="Create Account" placement="top">
                            <i class="icon icon-add"></i>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-pagination background layout="prev, pager, next" 
            @current-change="handleCurrentChange" 
            :current-page.sync="currentPage"
            :currentTab="item" 
            :page-size="pageSize" 
            :total="totalSize">
          </el-pagination>
        </div>
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../../components/search/SearchContentComponent.vue';

  import ProfileEmployeeModal from './modals/ProfileEmployeeModal.vue';
  import DeleteEmployeeModal from './modals/DeleteEmployeeModal.vue';
  import LeaveEntryModal from './modals/LeaveEntryModal.vue';

  export default {
    name: "manage-employee",
    components: {
      RecordsComponent,
      SearchContentComponent,
      DeleteEmployeeModal,
      ProfileEmployeeModal,
      LeaveEntryModal
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName: "",
      loadedData:[],
      currentPage: 1,
      item:"",
      busy: false
    }),
    methods: {
       deleteCodeConfirm(idx){
          const employeeStorage = this.loadedData;

          const codeDeleted = employeeStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;
          this.loadedData = codeDeleted;
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
       editSelectedAction(sn){
         this.$router.push({path:'/profile/employee/edit/'+sn})
       },
       deleteEmployee(idx){
          const employeeStorage = this.loadedData;

          const codeDeleted = employeeStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;
       },
       loadMore() {
         this.busy = true;

         this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/employee-list.json").then((response) => {
            this.totalSize = response.data.length;
            this.loadedData = response.data;
            this.posts = [];

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             this.busy = false;
          }).catch((error) => error.response.data)
       },
      updatePagination(value) {
        this.pageSize = value;

        this.currentPage = 1;

        const employeeStorage = this.loadedData;

        this.posts = [];
        const append = employeeStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const employeeStorage = this.loadedData;

        this.posts = employeeStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data.surname.toLowerCase().includes(value.toLowerCase()) ||
          data.email.toLowerCase().includes(value.toLowerCase()) ||
          data.status.toLowerCase().includes(value.toLowerCase()) ||
          data.agreementType.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = employeeStorage.length;

        this.busy = false;
        return employeeStorage;
      },
       handleCurrentChange(val) {
        this.busy = true;
        const employeeStorage = this.loadedData;
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = employeeStorage.length;

          const append = employeeStorage.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = employeeStorage.filter((data) =>
            data.name.toLowerCase().includes(this.searchName.toLowerCase())
          );

          this.totalSize = this.posts.length;

          const append = this.posts.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        }

        this.busy = false;
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
