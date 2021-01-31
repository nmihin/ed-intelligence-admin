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
            <div class="assign-student-table-header" :key="componentKeyGrade">
              <div class="assign-student-all-students">
                <el-checkbox :checked="gradeOptions[item][0].allStudentsSelected" @change="selectAllStudents()"></el-checkbox>
              </div>
              <div class="assign-student-all-days">
                <el-checkbox :checked="gradeOptions[item][0].allDaysSelested" @change="selectAllDays()" label="Check All"></el-checkbox>
              </div>
              <div class="assign-student-single-day">
                <el-checkbox label="Monday" :checked="gradeOptions[item][0].checkedModay" @change="selectSingleDay('Monday')"></el-checkbox>
                <el-checkbox label="Tuesday" :checked="gradeOptions[item][0].checkedTuesday" @change="selectSingleDay('Tuesday')"></el-checkbox>
                <el-checkbox label="Wednesday" :checked="gradeOptions[item][0].checkedWednesday" @change="selectSingleDay('Wednesday')"></el-checkbox>
                <el-checkbox class="assign-thursday" :checked="gradeOptions[item][0].checkedThursday" label="Thursday" @change="selectSingleDay('Thursday')"></el-checkbox>
                <el-checkbox class="assign-friday" :checked="gradeOptions[item][0].checkedFriday" label="Friday" @change="selectSingleDay('Friday')"></el-checkbox> 
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
      clonePosts: [],
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
      gradeOptions :{},
      allSingleDaysSelected: false,
      componentKey: 0,
      componentKeyGrade:10000,
    }),
    props: {
      parentData: Array,
      selectedGradesParent: Array,
      removeTabParent: Function,
      gradeOptionsParent: Array
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
      cloneUpdatedPosts(posts){
        this.clonePosts = JSON.parse(JSON.stringify(posts));

        return this.clonePosts;
      },
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

        this.cloneUpdatedPosts(this.parentData);
        return posts;
      },
      uncheckFields(posts, item, day) {
        this.posts[item].forEach(element => {
          element.classdays = element.classdays.filter(itm => itm!==day)
        })

        this.cloneUpdatedPosts(this.parentData);
        return posts;
      },
      selectSingleDay(day) {
        const item = this.editableTabsValue;
        const dayOfWeek = new Date().getDay();

        if (day === "Monday") {
          this.gradeOptions[item][0].checkedModay ? this.gradeOptions[item][0].checkedModay = false : this.gradeOptions[item][0].checkedModay = true;
          this.gradeOptions[item][0].checkedModay ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Tuesday") {
          this.gradeOptions[item][0].checkedTuesday ? this.gradeOptions[item][0].checkedTuesday = false : this.gradeOptions[item][0].checkedTuesday = true;
          this.gradeOptions[item][0].checkedTuesday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Wednesday") {
          this.gradeOptions[item][0].checkedWednesday ? this.gradeOptions[item][0].checkedWednesday = false : this.gradeOptions[item][0].checkedWednesday = true;
          this.gradeOptions[item][0].checkedWednesday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Thursday") {
          this.gradeOptions[item][0].checkedThursday ? this.gradeOptions[item][0].checkedThursday = false : this.gradeOptions[item][0].checkedThursday = true;
          this.gradeOptions[item][0].checkedThursday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }
        if (day === "Friday") {
          this.gradeOptions[item][0].checkedFriday ? this.gradeOptions[item][0].checkedFriday = false : this.gradeOptions[item][0].checkedFriday = true;
          this.gradeOptions[item][0].checkedFriday ? this.checkFields(this.posts, item, day, dayOfWeek) : this.uncheckFields(this.posts, item, day);
        }

        this.cloneUpdatedPosts(this.parentData);
        this.componentKey += 1;
      },
      selectAllDays() {
        const item = this.editableTabsValue;

        if (this.gradeOptions[item][0].allDaysSelested) {
          this.posts[item].forEach(element => {
            element.classdays = [];
          });
          this.gradeOptions[item][0].allSingleDaysSelected = false;
          this.gradeOptions[item][0].checkedModay = false;
          this.gradeOptions[item][0].checkedTuesday = false;
          this.gradeOptions[item][0].checkedWednesday = false;
          this.gradeOptions[item][0].checkedThursday = false;
          this.gradeOptions[item][0].checkedFriday = false;

        } else {
          this.posts[item].forEach(element => {
            element.classdays = this.daysOfWeek;
          });
          this.gradeOptions[item][0].allSingleDaysSelected = true;
          this.gradeOptions[item][0].checkedModay = true;
          this.gradeOptions[item][0].checkedTuesday = true;
          this.gradeOptions[item][0].checkedWednesday = true;
          this.gradeOptions[item][0].checkedThursday = true;
          this.gradeOptions[item][0].checkedFriday = true;
        }

        this.gradeOptions[item][0].allDaysSelested ? this.gradeOptions[item][0].allDaysSelested = false : this.gradeOptions[item][0].allDaysSelested = true; 

        this.componentKey += 1;
        this.componentKeyGrade += 1;
      },
      selectAllStudents() {
        const item = this.editableTabsValue;

        this.posts[item].forEach(element => {
          if(this.gradeOptions[item][0].allStudentsSelected){
            element.assigned = false;
          }
          else {
            element.assigned = true;
          }
        }); 

        this.gradeOptions[item][0].allStudentsSelected ? this.gradeOptions[item][0].allStudentsSelected = false : this.gradeOptions[item][0].allStudentsSelected = true; 

        this.componentKey += 1;
      },
      handleSelectionChange(val) {
        this.cloneUpdatedPosts(this.posts);
        this.multipleSelection = val;
      },
      checkAll(sn) {
        const item = this.editableTabsValue;
        const studentListStorage = this.posts[item];
        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        this.posts[item][idx].classdays.length > 0 ? this.posts[item][idx].classdays = [] : this.posts[item][idx].classdays = this.daysOfWeek;

        // UPDATED MAIN STORE
        const idxStore = this.parentData.map((el) => el.sn).indexOf(sn);
        this.parentData[idxStore].classdays = this.posts[item][idx].classdays;

        this.componentKey += 1;
      },
      resetActions() {
        const item = this.editableTabsValue;

        this.pageSize = 10;
        this.currentPage = 1;
        
        const postsUpdated = this.cloneUpdatedPosts(this.loadedData);
        this.groupedData = this.groupBy(postsUpdated, "grade")
        
        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.gradeOptionsList();

        this.posts[item] = append;
  
        this.componentKey += 1;
        this.componentKeyGrade += 1;
      },
      assignStudent(sn, assigned) {
        const item = this.editableTabsValue;
        const studentListStorage = this.posts[item];
        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        this.posts[item][idx].assigned ? this.posts[item][idx].assigned = false : this.posts[item][idx].assigned = true;

        // UPDATED MAIN STORE
        const idxStore = this.parentData.map((el) => el.sn).indexOf(sn);
        this.parentData[idxStore].assigned = this.posts[item][idx].assigned;
      },
      assignStudentsSave() {
        // save students this.loadedData
      },
      updateClassDays(sn, day) {
        const item = this.editableTabsValue;
        const studentListStorage = this.posts[item];
        const dayOfWeek = new Date().getDay();
        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        if (this.posts[item][idx].classdays.includes(day)) {
          this.posts[item][idx].classdays = this.posts[item][idx].classdays.filter(itm => itm!==day);
        } else {
          this.posts[item][idx].classdays.push(day);
         
          this.posts[item][idx].classdays.forEach(element => {
            element = element.slice(dayOfWeek).concat(element.slice(0, dayOfWeek));
          })
        }

        // UPDATED MAIN STORE
        const idxStore = this.parentData.map((el) => el.sn).indexOf(sn);
        this.parentData[idxStore].classdays = this.posts[item][idx].classdays;

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
        
        const postsUpdated = this.cloneUpdatedPosts(this.parentData);
        this.groupedData = this.groupBy(postsUpdated, "grade")
        
        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          this.posts[item].length,
          this.posts[item].length + this.pageSize
        );

        this.posts[item] = append;
        this.componentKey += 1;
      },
      handleCurrentChange(val) {
        this.page = val;
        const item = this.editableTabsValue;
        const postsUpdated = this.cloneUpdatedPosts(this.parentData);

        this.groupedData = this.groupBy(postsUpdated, "grade")

        this.posts[item] = [];

        const append = this.groupedData[item].slice(
          (this.page - 1) * this.pageSize,
          ((this.page - 1) * this.pageSize) + this.pageSize
        );

        this.posts[item] = append;
        this.componentKey += 1;
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

        this.cloneUpdatedPosts(this.parentData);
        this.removeTabParent(filterData);
      },
      gradeOptionsList(){
        const propOptionList = [{
          allStudentsSelected : false,
          allDaysSelested : false,
          allSingleDaysSelected : false,
          checkedModay : false,
          checkedTuesday : false,
          checkedWednesday : false,
          checkedThursday : false,
          checkedFriday : false
          }
        ]

        this.gradeOptions = this.gradeOptionsParent.reduce((a,b)=> (a[b]=propOptionList,a),{});

        this.gradeOptions = JSON.parse(JSON.stringify(this.gradeOptions))
      },
      loadMore() {
        this.loadedData = JSON.parse(JSON.stringify(this.parentData));

        this.gradeOptionsList();

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
