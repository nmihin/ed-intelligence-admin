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
      <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
        <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
        <el-table-column sortable property="code" width="80" label="Code"></el-table-column>
        <el-table-column sortable property="category" width="120" label="Category"></el-table-column>
        <el-table-column sortable property="codename" label="Codename"></el-table-column>
        <el-table-column sortable property="usageguidelines" label="Usage Guidelines"></el-table-column>
        <el-table-column sortable property="additionalguidelines" label="Additional Guidelines"></el-table-column>
        <el-table-column width="140" property="action" label="Action">
          <div slot-scope="scope">
            <div @click="editSelectedCode(scope.row.sn);" class="element-edit">
              <i class="icon icon-edit"></i>
            </div>
            <div @click="deleteSelectedCode(scope.row.sn);" class="element-delete">
              <i class="icon icon-delete"></i>
            </div>
          </div>
        </el-table-column>
      </el-table>
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
      totalSize: 0
    }),
    methods: {
      searchFilter(searchName) {
        this.searchFilterParent(searchName);
      },
      loadMore() {
        const codeBookStorage = localStorage.getItem("codeBookStorageJSONData")
        this.posts = [];

        if (codeBookStorage) {
          this.totalSize = this.parentData[1].exit.length;

          const append = this.parentData[1].exit.slice(
            this.posts.length,
            this.posts.length + this.pageSize
          );

          this.posts = append;
        } else {
          setTimeout(() => {
            this.totalSize = this.parentData[1].exit.length;

            const append = this.parentData[1].exit.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;
          }, 1000)
        }
      },
      // LOCALSTORAGE
      loadCodeBookStorage() {
        return JSON.parse(localStorage.getItem("codeBookStorageJSONData"));
      },
    },
    created() {
      this.loadMore();
    }
  }

</script>
