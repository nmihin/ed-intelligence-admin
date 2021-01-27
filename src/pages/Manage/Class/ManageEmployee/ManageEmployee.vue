<template>
  <!-- Main Content START -->
  <div class="main-content">
    <!-- ADD/EDIT EMPLOYEE CODE START -->
    <AddEditEmployeeModal 
        ref="AddEditTemplateModal"
    />
    <!-- ADD/EDIT EMPLOYEE CODE END -->
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
            <button @click="viewTypeSelect('avatar')" class="right change-view button medium ed-btn__primary" style="margin-left:15px !important;">
              <i class="icon icon-manage"></i>
            </button>
            <button @click="viewTypeSelect('list')" class="right change-view menu-list button medium ed-btn__primary">
              <i class="icon icon-menu-list"></i>
            </button>
        </div>
        <div class="col-12 col-sm-4 col-md-4">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
            <!-- LIST VIEW -->
            <section  v-show="viewType === 'list'">
            <ManageEmployeeListTab 
            :parentData="posts"
            :deleteCodeConfirmRoot="updatePosts"
            />
            </section>
            <!-- AVATAR VIEW -->
            <section  v-show="viewType === 'avatar'">
            <ManageEmployeeAvatarTab 
            :parentData="posts"
            :deleteCodeConfirmRoot="updatePosts"
            />
            </section>
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

  import ManageEmployeeListTab from './tabs/ManageEmployeeListTab.vue';
  import ManageEmployeeAvatarTab from './tabs/ManageEmployeeAvatarTab.vue';

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
      VueHtmlToPaper,
      AddEditEmployeeModal,
      ManageEmployeeListTab,
      ManageEmployeeAvatarTab
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName: "",
      loadedData:[],
       idx:0,
      currentPage: 1,
      viewType: "list",
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
       updatePosts(idx){
          const codeDeleted = this.posts.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;
       },
       addEditEmployeeAction(sn,type){
          this.$refs.AddEditTemplateModal.openModal(sn,type);
       },
        viewTypeSelect(type) {
          switch(type) {
            case "list":
                this.viewType = "list";
              break;
            case "avatar":
                this.viewType = "avatar";
              break;
            default:
              break;
          }
       },
       print () {
        this.$htmlToPaper('printTable');
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
