<template>
  <!-- Main Content START -->
  <div class="main-content pmf-report">
    <!-- START VIEW MODAL -->
    <PmfReportModal
        ref="PmfReportModal"
    />
    <!-- END VIEW MODAL -->
    <!-- START DOWNLOAD MODAL -->
    <DownloadPmfReportModal
        ref="DownloadPmfReportModal"
    />
    <!-- END DOWNLOAD MODAL -->
    <div class="container-fluid">
      <div class="row" v-if="!busy">
        <div class="col-6 col-sm-6 col-md-6">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-6 col-sm-6 col-md-4 offset-md-2">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row" v-if="!busy">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="id" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="parcc_year" width="80" label="Year"></el-table-column>
            <el-table-column sortable min-width="360" label="PARCC Report">
                <template v-slot="scope">
                      <span class="left download-text">{{scope.row.parcc_file_name}}</span>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Download the PARCC Report" placement="top">
                              <i @click="downloadSelectedAction(scope.row.id,scope.row.parcc_year,'parcc',scope.row)" class="icon icon-download"></i>
                          </el-tooltip>
                      </div>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Import PARCC file. Import file must follow naming convention: PARCC with Year. It must contain sheet named student_PARCCs" placement="top">
                                <el-upload
                                  action="https://devapp.iteg.com.np/api/v1/reports/pmf/upload"
                                  ref="upload"
                                  :on-success="showSuccesMessage"
                                  :on-error="showErrorMessage"
                                  :headers=" {
                                      'Content-Type': 'application/vnd.ms-excel'
                                  }"
                                  :show-file-list="false"
                                  :limit="1"
                                  :multiple= "false"
                                  >                            
                                  <i class="icon icon-upload"></i>                             
                                </el-upload>
                          </el-tooltip>
                      </div>
                </template>
            </el-table-column>
            <el-table-column sortable min-width="360" label="SGP Report">
                <template v-slot="scope">
                      <span class="left download-text">{{scope.row.sgp_file_name}}</span>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Download the SGP Report" placement="top">
                              <i @click="downloadSelectedAction(scope.row.id,scope.row.sgp_year,'sgp',scope.row)" class="icon icon-download"></i>
                          </el-tooltip>
                      </div>
                      <div class="element">
                          <el-tooltip class="item" effect="dark" content="Import SGP file. Import file must follow naming convention: PARCC with Year. It must contain sheet named student_PARCCs" placement="top">              
                                <el-upload
                                  action="https://devapp.iteg.com.np/api/v1/reports/pmf/upload"
                                  :on-success="showSuccesMessage"
                                  :on-error="showErrorMessage"
                                  ref="upload"
                                  :headers=" {
                                      'Content-Type': 'application/vnd.ms-excel'
                                  }"
                                  :show-file-list="false"
                                  :limit="1"
                                  :multiple= "false"
                                  >                              
                                  <i class="icon icon-upload"></i>                                
                                </el-upload>
                          </el-tooltip>
                      </div>
                </template>
            </el-table-column>
            <el-table-column label="Action" width="200">
                <template v-slot="scope">
                  <button @click="viewSelectedAction(scope.row.sn,scope.row.parcc_year);" class="button medium ed-btn__primary">
                    <span>PMF Report</span>
                  </button>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row" v-if="!busy">
        <div class="col-12">
          <el-pagination background layout="prev, pager, next" 
          @current-change="handleCurrentChange" 
          :current-page.sync="currentPage"
          :on-success="showSuccesMessage"
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
  import DownloadPmfReportModal from './modals/DownloadPmfReportModal.vue'

  export default {
    name: "pmf-import-export-component",
    components: {
      RecordsComponent,
      SearchContentComponent,
      PmfReportModal,
      DownloadPmfReportModal
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName: "",
      currentPage: 1,
      loadedData:[],
      busy: false,
      fileList: []
    }),
    methods: {
      showSuccesMessage(){
        this.$message.success(`File succesfuly uploaded!`);
      },
      showErrorMessage(){
        this.$message.error(`File upload failed!`);
      },
      downloadSelectedAction(sn,year,type,data){
        this.$refs.DownloadPmfReportModal.openModal(sn,year,type,data);
      },
      viewSelectedAction(sn,year){
        this.$refs.PmfReportModal.openModal(sn,year);
      },
       loadMore() {
        this.busy = true;

        this.axios.get("https://devapp.iteg.com.np/api/v1/reports/pmf/list").then((response) => {  
            this.loadedData = response.data;
            this.totalSize = response.data.length;

            const append =  response.data.slice(
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

        const pmfData = this.loadedData;

        this.posts = [];
        const append = pmfData.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const pmfData = this.loadedData;

        this.posts = pmfData.filter((data) =>
          data.parcc_year.toLowerCase().includes(value.toLowerCase()) ||
          data.parcc_file_name.toLowerCase().includes(value.toLowerCase()) ||
          data.sgp_file_name.toLowerCase().includes(value.toLowerCase()) 
        );

        this.totalSize = pmfData.length;

        this.busy = false;
        return pmfData;
      },
      handleCurrentChange(val) {
        this.busy = true;
        const pmfData = this.loadedData;
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
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
