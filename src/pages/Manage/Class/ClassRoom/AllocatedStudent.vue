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
            <el-table-column sortable property="name" label="Name"></el-table-column>
            <el-table-column sortable property="surname" label="Surname"></el-table-column>
            <el-table-column sortable property="usi" label="USI"></el-table-column>
            <el-table-column sortable property="grade" label="Grade"></el-table-column>
            <el-table-column sortable property="room" label="Room"></el-table-column>
            <el-table-column sortable property="weekDays" label="Week Days">
              <template v-slot="scope">
                <button v-for="(post, idx) in scope.row.weekDays" :key="idx" class="tags button medium ed-btn__secondary">
                  <span>{{post}}</span>
                </button>
              </template>
            </el-table-column>
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
    name: "allocated-student",
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

        const allocatedStudentStorage = this.loadAllocatedStudentStorage();

        if (allocatedStudentStorage) {
          this.totalSize = allocatedStudentStorage.length;

          const append = allocatedStudentStorage.slice(
            this.posts.length,
            this.posts.length + this.pageSize
          );

          this.posts = append;

          this.busy = false;
        } else {
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/list-class-student.json").then((response) => {
            this.totalSize = response.data.length;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;

            localStorage.setItem("allocatedStudentStorageJSONData", JSON.stringify(response.data));
            this.busy = false;
          }).catch((error) => error.response.data)
        }

      },
      updatePagination(value) {
        this.pageSize = value;

        const allocatedStudentStorage = this.loadAllocatedStudentStorage();

        this.posts = [];
        const append = allocatedStudentStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const allocatedStudentStorage = this.loadAllocatedStudentStorage();

        this.posts = allocatedStudentStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data.surname.toLowerCase().includes(value.toLowerCase()) ||
          data.usi.toLowerCase().includes(value.toLowerCase()) ||
          data.grade.toLowerCase().includes(value.toLowerCase()) ||
          data.room.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = allocatedStudentStorage.length;

        this.busy = false;
        return allocatedStudentStorage;
      },
      handleCurrentChange(val) {
        this.busy = true;
        const allocatedStudentStorage = this.loadAllocatedStudentStorage();
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = allocatedStudentStorage.length;

          const append = allocatedStudentStorage.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = allocatedStudentStorage.filter((data) =>
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
      loadAllocatedStudentStorage() {
        return JSON.parse(localStorage.getItem("allocatedStudentStorageJSONData"));
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
