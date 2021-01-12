<template>
  <!-- Main Content START -->
  <div class="main-content pmf-report">
    <!-- START VIEW MODAL -->
    <PmfReportModal
        ref="PmfReportModal"
    />
    <!-- END VIEW MODAL -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-6 col-sm-6 col-md-6">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="year" width="80" label="Year"></el-table-column>
            <el-table-column sortable label="PARCC Report">
                <template v-slot="scope">
                      <span class="left download-text">{{scope.row.parccReport}}</span>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Download the PARCC Report" placement="top">
                              <i class="icon icon-download"></i>
                          </el-tooltip>
                      </div>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Import PARCC file. Import file must follow naming convention: PARCC with Year. It must contain sheet named student_PARCCs" placement="top">
                              <i class="icon icon-upload"></i>
                          </el-tooltip>
                      </div>
                </template>
            </el-table-column>
            <el-table-column sortable label="SGP Report">
                <template v-slot="scope">
                      <span class="left download-text">{{scope.row.sgpReport}}</span>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Download the SGP Report" placement="top">
                              <i class="icon icon-download"></i>
                          </el-tooltip>
                      </div>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Import SGP file. Import file must follow naming convention: PARCC with Year. It must contain sheet named student_PARCCs" placement="top">
                              <i class="icon icon-upload"></i>
                          </el-tooltip>
                      </div>
                </template>
            </el-table-column>
            <el-table-column label="Action" width="200">
                <template v-slot="scope">
                  <button @click="viewSelectedAction(scope.row.year);" class="button medium ed-btn__primary">
                    <span>{{scope.row.action}}</span>
                  </button>
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
  <!-- Main Content END -->
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../components/search/SearchContentComponent.vue';

  import PmfReportModal from './modals/PmfReportModal.vue'

  export default {
    name: "pmf-import-export-component",
    components: {
      RecordsComponent,
      SearchContentComponent,
      PmfReportModal
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
      viewSelectedAction(year){
        this.$refs.PmfReportModal.openModal(year);
      },
       loadMore() {
         this.busy = true;
         const pmfData = this.loadPmfDataStorage();

         if (pmfData) {
            this.totalSize = pmfData.length;

            const append = pmfData.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;

           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/pmf-data.json").then((response) => {
            this.totalSize = response.data.length;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             localStorage.setItem("pmfDataJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
      updatePagination(value) {
        this.pageSize = value;

        this.currentPage = 1;

        const pmfData = this.loadPmfDataStorage();

        this.posts = [];
        const append = pmfData.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const pmfData = this.loadPmfDataStorage();

        this.posts = pmfData.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = pmfData.length;

        this.busy = false;
        return pmfData;
      },
      handleCurrentChange(val) {
        this.busy = true;
        const pmfData = this.loadPmfDataStorage();
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = pmfData.length;

          const append = pmfData.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = pmfData.filter((data) =>
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
       loadPmfDataStorage() {
         return JSON.parse(localStorage.getItem("pmfDataJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
