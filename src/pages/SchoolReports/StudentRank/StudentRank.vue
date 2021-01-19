<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-6">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-3 col-sm-2 col-md-2">
            <div class="element right">
              <el-tooltip class="item" effect="dark" content="Download Excel" placement="top">
                <download-excel :data="studentData" :fields="jsonFields" worksheet="Report Data" :name="fileName">
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
        <div class="col-9 col-sm-4 col-md-4">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="usi" min-width="120" label="USI"></el-table-column>
            <el-table-column sortable property="name" min-width="160" label="Name"></el-table-column>
            <el-table-column sortable property="surname" min-width="120" label="Surname"></el-table-column>
            <el-table-column sortable property="grade" min-width="90" label="Grade"></el-table-column>
            <el-table-column sortable property="elaSGPRank" min-width="80" label="ELA SGP Rank"></el-table-column>
            <el-table-column sortable property="mathSGPRank" min-width="90" label="Math SGP Rank"></el-table-column>
            <el-table-column sortable property="elaScaledScoreRank" min-width="120" label="ELA Scaled Score Rank"></el-table-column>
            <el-table-column sortable property="mathScaledScoreRank" min-width="120" label="Math Scaled Score Rank"></el-table-column>
            <el-table-column sortable property="elaLevel3" min-width="90" label="ELA (level 3+)"></el-table-column>
            <el-table-column sortable property="mathLevel3" min-width="95" label="Math (level 3+)"></el-table-column>
            <el-table-column sortable property="elaLevel4" min-width="90" label="ELA (level 4+)"></el-table-column>
            <el-table-column sortable property="mathLevel4" min-width="95" label="Math (level 4+)"></el-table-column>
            <el-table-column sortable property="reEnrolled" min-width="80" label="Re-Enrolled"></el-table-column>
            <el-table-column sortable property="inSeatAttendanceRank" min-width="90" label="In-Seat Attendance Rank"></el-table-column>
            <el-table-column sortable property="finalRank" min-width="120" label="Final Rank"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" :total="totalSize">
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
  import Vue from "vue";
  import RecordsComponent from '../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../components/search/SearchContentComponent.vue'
  
  import JsonExcel from "vue-json-excel";

  Vue.component("downloadExcel", JsonExcel);

  export default {
    name: "student-rank",
    components: {
      RecordsComponent,
      SearchContentComponent,
      JsonExcel
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      studentData:[],
      totalSize:0,
      jsonFields:{
        "SN":"sn",
        "USI":"usi",
        "Name":"name",
        "Surname":"surname",
        "Grade":"grade",
        "ELA SGP Rank":"elaSGPRank",
        "Math SGP Rank":"mathSGPRank",
        "ELA Scaled Score Rank":"elaScaledScoreRank",
        "Math Scaled Core Rank":"mathScaledScoreRank",
        "ELA (level 3+)":"elaLevel3",
        "Math (level 3+)":"mathLevel3",
        "ELA (level 4+)":"elaLevel4",
        "Math (level 4+)":"mathLevel4",
        "Re-Enrolled":"reEnrolled",
        "In-Seat Attendance Rank":"inSeatAttendanceRank",
        "Final Rank":"finalRank"
    }}),
    methods: {
      loadMore() {
        this.busy = true;
        this.fileName = "Student_Rank_List.xls"

        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/student-rank.json").then((response) => {
          this.totalSize = response.data.length;
          this.studentData = response.data;

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

        const studentRankStorage = this.studentData;

        this.posts = [];
        const append = studentRankStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const studentRankStorage = this.studentData;

        this.posts = studentRankStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = studentRankStorage.length;

        this.busy = false;
        return studentRankStorage;
      },
      handleCurrentChange(val) {
        this.busy = true;
        const studentRankStorage = this.studentData;
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = studentRankStorage.length;

          const append = studentRankStorage.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = studentRankStorage.filter((data) =>
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
