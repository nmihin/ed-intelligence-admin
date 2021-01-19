<template>
  <!-- Main Content START -->
  <div class="main-content">
    <!-- START VIEW MODAL -->
    <ViewTemplateModal
        ref="ViewTemplateModal"
    />
    <!-- END VIEW MODAL -->
    <!-- START EDIT MODAL -->
    <EditTemplateModal
        ref="EditTemplateModal"
        :editEmailConfirmParent="editEmailConfirm"
    />
    <!-- END EDIT MODAL -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-12 col-sm-6 col-md-4 offset-md-2">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="category" label="Category"></el-table-column>
            <el-table-column sortable property="notifyCase" label="Notify Case"></el-table-column>
            <el-table-column sortable property="type" label="Type" width="120"></el-table-column>
            <el-table-column sortable property="emailIncluded" label="Email Included">
                <template v-slot="scope">
                    <button v-for="(post, idx) in scope.row.emailIncluded" :key="idx" class="tags button medium ed-btn__primary">
                        <span>{{post}}</span>
                    </button> 
                </template>
            </el-table-column>
            <el-table-column sortable property="action" label="Action" width="150">
                <template v-slot="scope">
                    <div @click="viewSelectedAction(scope.row.sn);" class="element">
                        <el-tooltip class="item" effect="dark" content="View" placement="top">
                            <i class="icon icon-eye"></i>
                        </el-tooltip>
                    </div>
                    <div @click="editSelectedAction(scope.row.sn,scope.row.emailIncluded);" class="element">
                        <el-tooltip class="item" effect="dark" content="Edit" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-pagination 
          background layout="prev, pager, next" 
          @current-change="handleCurrentChange" 
          :current-page.sync="currentPage"
          :page-size="pageSize" 
          :total="totalSize">
          </el-pagination>
        </div>
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../components/search/SearchContentComponent.vue';

  // MODALS
  import ViewTemplateModal from './modals/ViewTemplateModal.vue';
  import EditTemplateModal from './modals/EditTemplateModal.vue';

  export default {
    name: "list-template",
    components: {
      RecordsComponent,
      SearchContentComponent,
      ViewTemplateModal,
      EditTemplateModal
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      totalSize: 0,
      searchName: "",
      busy: false
    }),
    methods: {
      editEmailConfirm(sn,emailList){
        // FIND STUDENT INDEX
        const idx = this.posts.map((el) => el.sn).indexOf(sn);
        this.posts[idx].emailIncluded = emailList;
      },
       viewSelectedAction(sn){
            this.$refs.ViewTemplateModal.openModal(sn);
       },
       editSelectedAction(sn,emailIncluded){
            this.$refs.EditTemplateModal.openModal(sn,emailIncluded);
       },
       loadMore() {
         this.busy = true;
         const listTemplateStorage = this.loadListTemplateStorage();

         if (listTemplateStorage) {
            this.totalSize = listTemplateStorage.length;

            const append = listTemplateStorage.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;

           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/list-template.json").then((response) => {
            this.totalSize = response.data.length;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             localStorage.setItem("listTemplateStorageJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
      updatePagination(value) {
        this.pageSize = value;
        this.currentPage = 1;

        const listTemplateStorage = this.loadListTemplateStorage();

        this.posts = [];
        const append = listTemplateStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const listTemplateStorage = this.loadListTemplateStorage();

        this.posts = listTemplateStorage.filter((data) =>
          data.category.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = listTemplateStorage.length;

        this.busy = false;
        return listTemplateStorage;
      },
       handleCurrentChange(val) {
        this.busy = true;
        const listTemplateStorage = this.loadListTemplateStorage();
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = listTemplateStorage.length;

          const append = listTemplateStorage.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = listTemplateStorage.filter((data) =>
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
       loadListTemplateStorage() {
         return JSON.parse(localStorage.getItem("listTemplateStorageJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
