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
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="usi" width="80" label="USI"></el-table-column>
            <el-table-column sortable property="name" width="120" label="Name"></el-table-column>
            <el-table-column sortable property="surname" label="Surname"></el-table-column>
            <el-table-column sortable property="grade" label="Grade"></el-table-column>
            <el-table-column sortable property="elaSGPRank" label="ELA SGP Rank"></el-table-column>
            <el-table-column sortable property="mathSGPRank" label="Math SGP Rank"></el-table-column>
            <el-table-column sortable property="elaScaledScoreRank" label="ELA Scaled Score Ranke"></el-table-column>
            <el-table-column sortable property="mathScaledScoreRank" label="Math Scaled Score Ranke"></el-table-column>
            <el-table-column sortable property="elaLevel3" label="ELA (level 3+)"></el-table-column>
            <el-table-column sortable property="mathLevel3" label="Math (level 3+)"></el-table-column>
            <el-table-column sortable property="elaLevel4" label="ELA (level 4+)"></el-table-column>
            <el-table-column sortable property="mathLevel4" label="Math (level 4+)"></el-table-column>
            <el-table-column sortable property="reEnrolled" label="Re-Enrolled"></el-table-column>
            <el-table-column sortable property="inSeatAttendanceRank" label="In-Seat Attendance Rank"></el-table-column>
            <el-table-column sortable property="finalRank" label="Final Rank"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalSize">
          </el-pagination>
        </div>
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  import RecordsComponent from '../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../components/search/SearchContentComponent.vue'

  export default {
    name: "student-rank",
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
      busy: false
    }),
    methods: {
       loadMore() {
         this.busy = true;
         const studentRankStorage = this.loadStudentRankStorage();

         if (studentRankStorage) {
            this.totalSize = studentRankStorage.length;

            const append = studentRankStorage.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;

           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/student-rank.json").then((response) => {
            this.totalSize = response.data.length;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             localStorage.setItem("studentRankStorageJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
      updatePagination(value) {
        this.pageSize = value;

        const studentRankStorage = this.loadStudentRankStorage();

        this.posts = [];
        const append = studentRankStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const studentRankStorage = this.loadStudentRankStorage();

        this.posts = studentRankStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = studentRankStorage.length;

        this.busy = false;
        return studentRankStorage;
      },
       handleCurrentChange(val) {
        this.busy = true;
        const studentRankStorage = this.loadStudentRankStorage();
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
       },
       // LOCALSTORAGE
       loadStudentRankStorage() {
         return JSON.parse(localStorage.getItem("studentRankStorageJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
