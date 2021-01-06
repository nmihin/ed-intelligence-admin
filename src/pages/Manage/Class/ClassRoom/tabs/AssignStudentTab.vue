<template>
  <div>
    <!-- STUDENT LIST -->
    <div class="ed_tabs">
      <el-tabs @tab-click="handleTabClick">
        <el-tab-pane v-for="item in selectedGrades" :key="item" :label="item" :value="item">
          <div class="row">
            <!-- UPDATE PAGINATION -->
            <div class="col-8 col-sm-6 col-md-4">
              <div class="records-select">
                <el-select @change="updatePagination(value,item)" v-model="value" placeholder="Records">
                  <el-option v-for="item in recordsOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <span class="records">Records</span>
              </div>
            </div>
            <!-- SEARCH -->
            <div class="col-12 col-sm-12 offset-md-4 col-md-4">
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
          <!-- PAGINATION -->
          <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :currentTab="item" :page-size="pageSize" :total="totalSize">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
        <el-button @click="resetActions()" class="button medium ed-btn__tertiary right">Reset Changes</el-button>
        <el-button @click="assignStudents()" class="button medium ed-btn__primary right" style="margin-right:10px !important;">Assign Students</el-button>
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
      searchName: "",
      currentTab: "",
      value: 10,
      page: 1,
      pageSize: 10,
      totalSize: 0,
      recordsOptions: [{
        value: 5,
        label: '5'
      }, {
        value: 10,
        label: '10'
      }, {
        value: 25,
        label: '25'
      }, {
        value: 50,
        label: '50'
      }, {
        value: 100,
        label: '100'
      }]
    }),
    props: {
      parentData: Array,
      selectedGradesParent: Array,
      removeTabParent: Function
    },
    watch: {
      parentData: function() {
        this.posts = this.parentData;
      },
      selectedGradesParent: function() {
        this.selectedGrades = this.selectedGradesParent;
      }
    },
    methods: {
      updateClassDays(sn, day) {
        const studentListStorage = this.loadStudentListStorage();

        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        if (this.parentData[idx].classdays.includes(day)) {
          this.parentData[idx].classdays.splice((this.parentData[idx].classdays.indexOf(day)), 1);
        } else {
          if (day === "Monday")
            this.parentData[idx].classdays.splice(0, 0, "Monday");
          if (day === "Tuesday")
            this.parentData[idx].classdays.splice(1, 0, "Tuesday");
          if (day === "Wednsday")
            this.parentData[idx].classdays.splice(2, 0, "Wednsday");
          if (day === "Thursday")
            this.parentData[idx].classdays.splice(3, 0, "Thursday");
          if (day === "Friday")
            this.parentData[idx].classdays.splice(4, 0, "Friday");
        }

        studentListStorage[idx].classdays = this.parentData[idx].classdays;

        localStorage.setItem("studentListStorageJSONData", JSON.stringify(studentListStorage));
      },
      // LOCALSTORAGE
      loadStudentListStorage() {
        return JSON.parse(localStorage.getItem("studentListStorageJSONData"));
      },
      handleTabClick() {
        this.posts = [];

        const groupedData = this.groupBy(this.parentData, "grade")

        this.posts = groupedData;

        const totalData = JSON.parse(JSON.stringify(this.posts));
        if (typeof this.selectedGradesParent !== 'undefined') {
          this.activeTab = JSON.parse(JSON.stringify(this.selectedGradesParent[0]));

          this.totalSize = totalData[this.activeTab].length;

          this.selectedGrades = this.selectedGradesParent;
        }

        this.searchName = "";
      },
      updatePagination(value, item) {
        this.pageSize = value;

        const groupedData = this.groupBy(this.parentData, "grade")

        this.posts[item] = [];

        const append = groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.posts[item] = append;
      },
      handleCurrentChange(val) {
        this.page = val;

        const groupedData = this.groupBy(this.parentData, "grade")

        this.posts[this.activeTab] = [];

        const append = groupedData[this.activeTab].slice(
          (this.page - 1) * this.pageSize,
          ((this.page - 1) * this.pageSize) + this.pageSize
        );

        this.posts[this.activeTab] = append;
      },
      searchFilter(value, grade) {
        const groupedData = this.groupBy(this.parentData, "grade")

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
      removeTab(tab) {
        const filterData = this.selectedGrades.filter(function(item) {
          return item !== tab;
        });

        this.selectedGrades = filterData;

        this.removeTabParent(filterData)
      },
      loadMore() {
        this.posts = [];

        const groupedData = this.groupBy(this.parentData, "grade")

        this.posts = groupedData;

        //this.totalSize = groupedData[0].length

        const totalData = JSON.parse(JSON.stringify(this.posts));
        this.activeTab = JSON.parse(JSON.stringify(this.selectedGradesParent[0]));

        this.totalSize = totalData[this.activeTab].length;

        this.selectedGrades = this.selectedGradesParent;
      },
    },
    created() {
      this.loadMore();
    }
  }

</script>
