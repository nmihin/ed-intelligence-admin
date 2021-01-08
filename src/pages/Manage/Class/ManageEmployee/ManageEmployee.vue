<template>
  <!-- Main Content START -->
  <div class="main-content">
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
            <el-table-column sortable property="action" label="Action" width="250">
                <template v-slot="scope">
                    <div class="element">
                        <el-tooltip class="item" effect="dark" content="Leave Entry" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element">
                        <el-tooltip class="item" effect="dark" content="View Profile" placement="top">
                            <i class="icon icon-profile"></i>
                        </el-tooltip>
                    </div>
                    <div class="element">
                        <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element">
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

  export default {
    name: "reccuring-school-schedule",
    components: {
      RecordsComponent,
      SearchContentComponent
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName: "",
      currentPage: 1,
      busy: false
    }),
    methods: {
       deleteSelectedAction(sn){
          this.$refs.DeleteTemplateModal.openModal(sn);
       },
       editSelectedAction(data){
          this.$refs.EditTemplateModal.openModal(data);
       },
       deleteEmployee(idx){
          const employeeStorage = this.loadEmployeeStorage();

          const codeDeleted = employeeStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;

          localStorage.setItem("employeeStorageStorageJSONData",JSON.stringify(codeDeleted));
       },
       loadMore() {
         this.busy = true;
         const employeeStorage = this.loadEmployeeStorage();

         if (employeeStorage) {
            this.totalSize = employeeStorage.length;
            this.posts = [];

            const append = employeeStorage.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

           this.posts = append;
           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/employee-list.json").then((response) => {
            this.totalSize = response.data.length;
            this.posts = [];

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             localStorage.setItem("employeeStorageStorageJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
      updatePagination(value) {
        this.pageSize = value;

        this.currentPage = 1;

        const employeeStorage = this.loadEmployeeStorage();

        this.posts = [];
        const append = employeeStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const employeeStorage = this.loadEmployeeStorage();

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
        const employeeStorage = this.loadEmployeeStorage();
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
       },
       // LOCALSTORAGE
       loadEmployeeStorage() {
         return JSON.parse(localStorage.getItem("employeeStorageStorageJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
