<template>
  <!-- Main Content START -->
  <div class="main-content">
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
    <!-- CREATE ACCOUNT CODE START -->
    <CreateEmployeeModal 
        ref="CreateTemplateModal"
    />
    <!-- CREATE ACCOUNT CODE END -->
    <div class="container-fluid manage-employee">
      <div class="row">
          <div class="col-8 col-sm-6 col-md-6">
            <button href="#" class="left button medium ed-btn__primary add-custom-standard" @click="addEditEmployeeAction(0,'Add')">
              <i class="icon icon-add"></i><span>Add Employee</span>
            </button>
          </div>
          <div class="col-4 col-sm-6 col-md-6">
            <div class="element right">
              <el-tooltip class="item" effect="dark" content="Print Table" placement="top">
                  <span class="icon icon-download-pdf-document" @click="print">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                    <span class="path6"></span>
                  </span>
              </el-tooltip>
            </div>
            <div class="element right">
              <el-tooltip class="item" effect="dark" content="Download Excel" placement="top">
                <download-excel :data="posts" :fields="jsonFields" worksheet="Report Data" :name="fileName">
                  <span class="icon icon-download-excel right">
                    <span class="path1"></span>
                    <span class="path2"></span><span class="path3"></span>
                    <span class="path4"></span><span class="path5"></span>
                    <span class="path6"></span><span class="path7"></span>
                    <span class="path8"></span><span class="path9"></span>
                  </span>
                </download-excel>
              </el-tooltip>
          </div>
          </div>
      </div>
      <div class="row">
        <div class="col-6 col-sm-4 col-md-4">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-6 col-sm-4 col-md-4">
            <button class="right change-view button medium ed-btn__primary" style="margin-left:15px !important;">
              <i class="icon icon-manage"></i>
            </button>
            <button class="right change-view menu-list button medium ed-btn__primary">
              <i class="icon icon-menu-list"></i>
            </button>
        </div>
        <div class="col-12 col-sm-4 col-md-4">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-table id="printTable" ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
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
                    <div class="element" @click="addEditEmployeeAction(scope.row.sn,'Edit')">
                        <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="deleteSelectedAction(scope.row.sn)">
                        <el-tooltip class="item" effect="dark" content="Delete Profile" placement="top">
                            <i class="icon icon-delete"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="createSelectedAction(scope.row.sn)">
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
  import CreateEmployeeModal from './modals/CreateEmployeeModal.vue';
  import AddEditEmployeeModal from './modals/AddEditEmployeeModal.vue';

  import VueHtmlToPaper from 'vue-html-to-paper';

  import Vue from 'vue';
  const printOptions = {
  name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
      'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
    ]
  }
  Vue.use(VueHtmlToPaper,printOptions);

  export default {
    name: "manage-employee",
    components: {
      RecordsComponent,
      SearchContentComponent,
      DeleteEmployeeModal,
      ProfileEmployeeModal,
      LeaveEntryModal,
      CreateEmployeeModal,
      VueHtmlToPaper,
      AddEditEmployeeModal
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
      busy: false,
      jsonFields:{
        "SN":"sn",
        "Name":"name",
        "Surname":"surname",
        "Email":"email",
        "Status":"status",
        "agreementType":"Agreement Type"
      }
    }),
    methods: {
       print () {
        this.$htmlToPaper('printTable');
       },
       deleteCodeConfirm(idx){
          const employeeStorage = this.loadedData;

          const codeDeleted = employeeStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;
          this.loadedData = codeDeleted;
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
         this.fileName = "Employee_List.xls"

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
