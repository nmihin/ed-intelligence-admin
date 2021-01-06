<template>
  <div>
    <!-- STUDENT LIST -->
    <div class="ed_tabs">
      <el-tabs @tab-click="handleTabChange">
        <el-tab-pane v-for="item in selectedGrades" :key="item" :label="item" :value="item">
          <div class="row">
            <!--  -->
            <div class="col-8 col-sm-6 col-md-4">
              <RecordsComponent :updatePaginationParent="updatePagination" />
            </div>
            <!-- SEARCH -->
            <div class="col-12 col-sm-12 offset-md-4 col-md-4">
                <!-- <SearchContentComponent :searchFilterParent="searchFilter" /> -->
                <el-input @input="searchFilter(searchName,item)" placeholder="Search..." v-model="searchName"></el-input>
            </div>
          </div>
          <!-- TABLE DATA -->
          <el-table v-if="selectedGrades.includes(item)" stripe ref="singleTable" :data="posts[item]" highlight-current-row style="width: 100%">
            <el-table-column sortable property="name" label="Name"></el-table-column>
            <el-table-column sortable property="surname" label="Surname"></el-table-column>
            <el-table-column sortable property="usi" width="120" label="USI"></el-table-column>
            <el-table-column sortable property="grade" label="Grade"></el-table-column>
            <el-table-column width="110" label="Check All">
              <div slot-scope="scope">
                <el-checkbox @change="checkAll(scope.row.sn,scope.row.classdays)" :checked="scope.row.classdays.length === 5"><span>Check All</span></el-checkbox>
              </div>
            </el-table-column>
            <el-table-column property="classdays" width="600" label="Class Days">
              <div slot-scope="scope">
                <span v-for="(day, idx) in daysOfWeek" :key="idx">
                  <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-if="scope.row.classdays.includes(day)" checked><span>{{day}}</span></el-checkbox>
                  <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-else><span>{{day}}</span></el-checkbox>
                </span>
              </div>
            </el-table-column>
          </el-table>
          <span slot="label"><i class="icon icon-close" @click="removeTab(item)"></i>{{item}}</span>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- PAGINATION -->
    <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalSize">
    </el-pagination>
  </div>
</template>

<script>
import RecordsComponent from '../../../../../components/records/RecordsComponent.vue';
import SearchContentComponent from '../../../../../components/search/SearchContentComponent.vue'

export default {
    name: "assign-students",
    components: {
      RecordsComponent,
      SearchContentComponent
    },
    // DATA
    data: () => ({
        posts: [],
        selectedGrades: [],
        daysOfWeek: ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday"],
        searchName:"",
        page: 1,
        pageSize: 10,
        totalSize: 0
    }),
    props: {
        parentData: Array,
        selectedGradesParent: Array
    },
    watch: {     	
        parentData: function() {
            this.posts = this.parentData;
        },
        selectedGradesParent: function(){
          this.selectedGrades = this.selectedGradesParent;
        }
    },
    methods: {
        handleTabChange(){
          this.searchName = "";
        },
        updatePagination(value) {

          this.pageSize = value;

          const studentListStorage = this.loadStudentListStorage();

          const append = studentListStorage.slice(
            this.posts.length,
            this.posts.length + this.pageSize
          );

          this.postsTab = append;
          this.posts = append;
        },
        handleCurrentChange(val) {
          this.busy = true;
          const studentListStorage = this.loadStudentListStorage();

          this.page = val;

          // CHECK IF SEARCH EMPTY
          if (this.searchName === '') {
            this.totalSize = studentListStorage.length;

            const append = studentListStorage.slice(
              (this.page - 1) * this.pageSize,
              ((this.page - 1) * this.pageSize) + this.pageSize
            );

            this.postsTab = append;
            this.posts = append;
          } else {
            this.posts = studentListStorage.filter(data => data.name.toLowerCase().includes(this.searchName.toLowerCase()));

            this.totalSize = this.posts.length;

            const append = this.posts.slice(
              (this.page - 1) * this.pageSize,
              ((this.page - 1) * this.pageSize) + this.pageSize
            );

            this.postsTab = append;
            this.posts = append;
          }

          this.busy = false;
        },
        searchFilter(value,grade){
          const groupedData = this.groupBy(this.parentData,"grade")

          this.posts[grade] = groupedData[grade].filter(data => 
            data.name.toLowerCase().includes(value.toLowerCase()) || 
            data.surname.toLowerCase().includes(value.toLowerCase()) || 
            data.usi.toString().toLowerCase().includes(value.toLowerCase())
          );
          this.totalSize = this.posts[grade].length;

          return this.posts;
        },
        groupBy(objectArray, property) {
          return objectArray.reduce((acc, obj) => {
              const key = obj[property];
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(obj);
              return acc;
          }, {});
        },
        loadMore(){
          this.posts = [];

          const groupedData = this.groupBy(this.parentData,"grade")

          this.posts = groupedData;

          this.selectedGrades = this.selectedGradesParent;
        },
    },
    created(){
        this.loadMore();
    }
}
</script>