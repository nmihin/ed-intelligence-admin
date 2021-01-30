<template>
  <div>
    <!-- STUDENT LIST -->
    <div class="ed_tabs">
      <el-tabs v-model="editableTabsValue" type="card" @tab-click="handleTabClick">
        <el-tab-pane v-for="(item, index) in selectedGrades" :id="item" :key="item" :label="item" :value="item" :name="item">
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
              <div class="search-select">
                <el-input @input="searchFilter(searchName,item)" placeholder="Search..." v-model="searchName"></el-input>
              </div>
            </div>
          </div>
          <div class="assign-student-wrapper">
            <!-- TABLE SELECT ACTIONS -->
            <div class="assign-student-table-header">
              <div class="assign-student-all-students">
                <el-checkbox @change="selectAllStudents()"></el-checkbox>
              </div>
              <div class="assign-student-all-days">
                <el-checkbox @change="selectAllDays()" label="Check All"></el-checkbox>
              </div>
              <div class="assign-student-single-day">
                <el-checkbox label="Monday" @change="selectSingleDay('Monday')"></el-checkbox>
                <el-checkbox label="Tuesday" @change="selectSingleDay('Tuesday')"></el-checkbox>
                <el-checkbox label="Wednesday" @change="selectSingleDay('Wednesday')"></el-checkbox>
                <el-checkbox class="assign-thursday" label="Thursday" @change="selectSingleDay('Thursday')"></el-checkbox>
                <el-checkbox class="assign-friday" label="Friday" @change="selectSingleDay('Friday')"></el-checkbox>
              </div>
            </div>
            <!-- TABLE DATA -->
            <el-table ref="singleTable" :key="componentKey" v-if="selectedGrades.includes(item)" stripe :data="posts[item]" highlight-current-row style="width: 100%">
              <el-table-column width="80">
                <template slot-scope="scope">
                  <el-checkbox @change="assignStudent(scope.row.sn,scope.row.assigned)" :checked="scope.row.assigned"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column sortable width="120" property="name" label="Name"></el-table-column>
              <el-table-column sortable width="120" property="surname" label="Surname"></el-table-column>
              <el-table-column sortable width="120" property="usi" label="USI"></el-table-column>
              <el-table-column sortable width="60" property="grade" label="Grade"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-checkbox @change="checkAll(scope.row.sn)" :checked="scope.row.classdays.length === 5"><span>Check All</span></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column property="classdays" width="600">
                <template slot-scope="scope">
                  <span v-for="(day, idx) in daysOfWeek" :key="idx">
                    <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-if="scope.row.classdays.includes(day)" checked><span>{{day}}</span></el-checkbox>
                    <el-checkbox @change="updateClassDays(scope.row.sn,day)" v-else><span>{{day}}</span></el-checkbox>
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <span slot="label"><i class="icon icon-close" @click="removeTab(item)"></i>{{item}}</span>
        </el-tab-pane>
          <!-- PAGINATION -->
          <el-pagination background layout="prev, pager, next" 
          @current-change="handleCurrentChange" 
          :current-page.sync="currentPage" 
          :currentTab="item" 
          :page-size="pageSize" 
          :total="totalSize">
          </el-pagination>
      </el-tabs>
    </div>
    <el-button @click="resetActions()" class="button medium ed-btn__tertiary right">Reset Changes</el-button>
    <el-button @click="assignStudentsSave()" class="button medium ed-btn__primary right" style="margin-right:10px !important;">Assign Students</el-button>
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
      editableTabsValue: "PK3",
      selectedGrades: [],
      groupedData: [],
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      searchName: "",
      currentTab: "",
      value: 10,
      page: 1,
      polling: null,
      pageSize: 10,
      totalSize: 0,
      currentPage: 1,
      loadedData: [],
      item:"",
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
      }],
      allStudentsSelected: false,
      allDaysSelested: false,
      allSingleDaysSelected: false,
      checkedModay: false,
      checkedTuesday: false,
      checkedWednesday: false,
      checkedThursday: false,
      checkedFriday: false,
      componentKey: 0,
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
        const lastElement = this.selectedGradesParent.slice(-1)[0];
        this.editableTabsValue = lastElement
        setTimeout(function() {
          document.getElementById("tab-" + lastElement).click();
        }, 100);
      }
    },
    methods: {
      checkFields(posts, item, day, dayOfWeek) {
        //CREATE WEEKDAYS
        this.posts[item].forEach(element => {
          if (!element.classdays.includes(day)) {
            element.classdays.push(day)
          }
        })
        //SORT WEEKDAYS
        this.posts[item].forEach(element => {
          element.classdays = element.classdays.slice(dayOfWeek).concat(element.classdays.slice(0, dayOfWeek));
        })

        return posts;
      },
      uncheckFields(posts, item, day) {
        this.posts[item].forEach(element => {
          element.classdays = element.classdays.filter(itm => itm!==day)
        })

        return posts;
      },
      selectSingleDay(day) {
        const item = this.editableTabsValue;
        const dayOfWeek = new Date().getDay();

        if (day === "Monday") {
          this.checkedModay ? this.checkedModay = false : this.checkedModay = true;
          this.checkedModay ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Tuesday") {
          this.checkedTuesday ? this.checkedTuesday = false : this.checkedTuesday = true;
          this.checkedTuesday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Wednesday") {
          this.checkedWednesday ? this.checkedWednesday = false : this.checkedWednesday = true;
          this.checkedWednesday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Thursday") {
          this.checkedThursday ? this.checkedThursday = false : this.checkedThursday = true;
          this.checkedThursday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Friday") {
          this.checkedFriday ? this.checkedFriday = false : this.checkedFriday = true;
          this.checkedFriday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }

        this.componentKey += 1;

      },
      selectAllDays() {
        const item = this.editableTabsValue;
        this.allDaysSelected ? this.allDaysSelected = false : this.allDaysSelected = true;

        if (this.allDaysSelected) {
          this.posts[item].forEach(element => {
            element.classdays = this.daysOfWeek;
          });
        } else {
          this.posts[item].forEach(element => {
            element.classdays = [];
          });
        }


        this.componentKey += 1;

      },
      selectAllStudents() {
        const item = this.editableTabsValue;
        this.allStudentsSelected ? this.allStudentsSelected = false : this.allStudentsSelected = true;

        this.posts[item].forEach(element => {
          if(this.allStudentsSelected)
            element.assigned = true;
          else
          element.assigned = false;
        });

        this.componentKey += 1;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      checkAll(sn) {
        const idx = this.loadedData.map((el) => el.sn).indexOf(sn);
    
        this.loadedData[idx].classdays.length === 0 ? this.loadedData[idx].classdays = this.daysOfWeek : this.loadedData[idx].classdays = [];
        
        const item = this.editableTabsValue;

        this.posts[item] = [];

        this.groupedData = this.groupBy(this.loadedData, "grade")

        const append = this.groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.posts[item] = append;

        this.componentKey += 1;
      },
      resetActions() {
        const item = this.editableTabsValue;

        this.groupedData = this.groupBy(this.parentData, "grade")

        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.posts[item] = append;
      },
      assignStudent(sn, assigned) {
        const idx = this.loadedData.map((el) => el.sn).indexOf(sn);

        assigned ? this.loadedData[idx].assigned = false : this.loadedData[idx].assigned = true;
      },
      assignStudentsSave() {
        // save students this.loadedData
      },
      updateClassDays(sn, day) {
        const studentListStorage = this.loadedData;

        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        if (this.parentData[idx].classdays.includes(day)) {
          this.parentData[idx].classdays.splice((this.parentData[idx].classdays.indexOf(day)), 1);
        } else {
          if (day === "Monday")
            this.parentData[idx].classdays.splice(0, 0, "Monday");
          if (day === "Tuesday")
            this.parentData[idx].classdays.splice(1, 0, "Tuesday");
          if (day === "Wednesday")
            this.parentData[idx].classdays.splice(2, 0, "Wednesday");
          if (day === "Thursday")
            this.parentData[idx].classdays.splice(3, 0, "Thursday");
          if (day === "Friday")
            this.parentData[idx].classdays.splice(4, 0, "Friday");
        }

        this.loadedData[idx].classdays = this.parentData[idx].classdays;

        this.componentKey += 1;
      },
      handleTabClick() {
        this.posts = [];

        this.currentPage = 1;
        this.pageSize = 10;
        this.totalSize = 0;
        this.value = 10;

        this.groupedData = this.groupBy(this.parentData, "grade")

        this.posts = this.groupedData;

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

        this.currentPage = 1;

        this.groupedData = this.groupBy(this.parentData, "grade")

        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.posts[item] = append;
      },
      handleCurrentChange(val) {
        this.page = val;
        const item = this.editableTabsValue;

        this.groupedData = this.groupBy(this.parentData, "grade")

        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          (this.page - 1) * this.pageSize,
          ((this.page - 1) * this.pageSize) + this.pageSize
        );

        this.posts[item] = append;
      },
      searchFilter(value, grade) {
        this.groupedData = this.groupBy(this.parentData, "grade")

        this.posts[grade] = this.groupedData[grade].filter(data =>
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

        this.removeTabParent(filterData);
      },
      loadMore() {
        this.loadedData = JSON.parse(JSON.stringify(this.parentData));

        this.polling = setInterval(() => {

          this.posts = [];
          this.groupedData = this.groupBy(this.parentData, "grade");

          this.posts = this.groupedData;

          const totalData = JSON.parse(JSON.stringify(this.posts));
          this.activeTab = JSON.parse(JSON.stringify(this.selectedGradesParent[0]));

          this.totalSize = totalData[this.activeTab].length;

          this.selectedGrades = this.selectedGradesParent;

          clearInterval(this.polling)
        }, 250)
      },
    },
    beforeDestroy() {
      clearInterval(this.polling)
    },
    created() {
      this.loadMore();
    }
  }

</script>
