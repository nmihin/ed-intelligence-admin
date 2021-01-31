<template>
  <!-- Main Content START -->
  <div class="main-content ">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="element-select" style="margin-right:25px;">
            <el-select @change="filterList(classPeriod)" v-model="classPeriod" placeholder="Class Period">
              <el-option v-for="item in periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </div>
          <div class="element-select">
            <el-select @change="filterList(classRoom)" v-model="classRoom" :disabled="isDisabledClassRoom" placeholder="Class Room">
              <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12">
          <div v-if="classRoom" class="assign-other-grades">
            <span class="records">List students from other grades</span>
            <div class="element-select assign-select left">
              <el-select v-model="gradeValue" placeholder="Select Grade">
                <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
              <i class="icon icon-arrow"></i>
            </div>
            <button @click="appendGrades()" class="button medium ed-btn__primary assign-view left">
                <i class="icon icon-eye"></i>
                <span>View</span>
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card-boxes assign-student">
            <div class="card-box">
              <div class="card-title">
                <h2>Assign Student for {{studentData.subjectName}} of Grade {{studentData.grade}}, ({{studentData.teacher}})</h2>
              </div>
              <div v-if="classRoom" class="card-content">
                    <AssignStudentTab
                    :parentData="postsTab" 
                    :selectedGradesParent="selectedGrades"
                    :removeTabParent="removeTab"
                    :gradeOptionsParent="gradeOptions"
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="busy" class="preloader">
        <span v-if="classRoom"><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../../components/search/SearchContentComponent.vue';
  
  import AssignStudentTab from './tabs/AssignStudentTab.vue'

  export default {
    name: "assign-student",
    components: {
      RecordsComponent,
      SearchContentComponent,
      AssignStudentTab
    },
    // DATA
    data: () => ({
      sn: 0,
      grade:"",
      busy: false,
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName: "",
      gradeValue:"",
      posts: [],
      postsTab: [],
      daysOfWeek: ["Monday", "Tuesday", "Wednsday", "Thursday", "Friday"],
      selectedGrades: [],
      gradeOptions: [],
      studentData: [],
      classPeriod: "",
      loadedData:[],
      classRoom: "",
      isDisabledClassRoom: true,
      periodOptions: [{
          value: "1st Period",
          label: "1st Period"
        },
        {
          value: "2st Period",
          label: "2st Period"
        },
        {
          value: "3st Period",
          label: "3st Period"
        },
        {
          value: "4st Period",
          label: "4st Period"
        },
        {
          value: "5st Period",
          label: "5st Period"
        }
      ],
      roomOptions: [{
          value: "1st Room",
          label: "1st Room"
        },
        {
          value: "2st Room",
          label: "2st Room"
        },
        {
          value: "3st Room",
          label: "3st Room"
        }
      ]
    }),
    methods: {
      removeTab(value){
          this.selectedGrades = value;
      },
      loadMore() {
        this.busy = true;
        this.sn = parseInt(this.$route.params.id);

          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/class-period.json").then((response) => {
            this.loadedData = response.data;
            const idx = response.data.map((el) => el.sn).indexOf(this.sn);

            this.totalSize = response.data.length;

            this.studentData = [];
            this.studentData = response.data[idx];
            this.selectedGrades.push(this.studentData.grade);

            this.current_page = response.current_page;
            this.per_page = response.per_page;
            this.total = response.total;
            this.next_page_url = response.next_page_url;

            this.busy = false;
          }).catch((error) => error.response.data)
      },
      checkAll(sn, days) {
        const studentListStorage = this.loadedData;

        const idx = studentListStorage.map((el) => el.sn).indexOf(sn);

        if (days.length !== 5)
          studentListStorage[idx].classdays = this.daysOfWeek;
        else
          studentListStorage[idx].classdays = [];

        this.posts[idx].classdays = studentListStorage[idx].classdays;
      },
      appendGrades(){
        if(!this.selectedGrades.includes(this.gradeValue) && this.gradeValue !== ""){
          this.selectedGrades.push(this.gradeValue)

          return this.selectedGrades;
        }
      },
      filterList() {
        this.classPeriod ? this.isDisabledClassRoom = false : this.isDisabledClassRoom = true;
        this.busy = true;

          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/student-list.json").then((response) => {

            this.totalSize = response.data.length;
            this.posts = [];

            this.postsTab = response.data;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );
            
            this.posts = append;

            this.current_page = response.current_page;
            this.per_page = response.per_page;
            this.total = response.total;
            this.next_page_url = response.next_page_url;

            const mapGrade = response.data.map(el => el.grade);

            this.gradeOptions = [...new Set(mapGrade)]; 

            this.busy = false;
          }).catch((error) => error.response.data)
      },
      searchFilter(value) {
        this.busy = true;

        const studentListStorage = this.loadedData;

        this.posts = studentListStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data.surname.toLowerCase().includes(value.toLowerCase()) ||
          data.usi.toString().toLowerCase().includes(value.toLowerCase()) ||
          data.grade.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = this.posts.length;

        this.busy = false;
        //return studentListStorage;

        this.postsTab = this.posts;
        return this.postsTab;
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
