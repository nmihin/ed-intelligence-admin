<template>
  <!-- Main Content START -->
  <div class="main-content ">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 col-sm-3 col-md-3">
          <div class="element">
            <el-select @change="filterList(classPeriod)" v-model="classPeriod" placeholder="Class Period">
              <el-option v-for="item in periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </div>
        </div>
        <div class="col-6 col-sm-3 col-md-3">
          <div class="element">
            <el-select @change="filterList(classRoom)" v-model="classRoom" :disabled="isDisabledClassRoom" placeholder="Class Room">
              <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
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
              <div class="card-content">
                <div class="row">
                    <div class="col-8 col-sm-6 col-md-4">
                        <RecordsComponent :updatePaginationParent="updatePagination" />
                    </div>
                    <div class="col-12 col-sm-12 offset-md-4 col-md-4">
                        <SearchContentComponent :searchFilterParent="searchFilter" />
                    </div>
                </div>
                <!-- STUDENT LIST -->
                <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
                  <el-table-column sortable property="name" label="Name"></el-table-column>
                  <el-table-column sortable property="surname" label="Surname"></el-table-column>
                  <el-table-column sortable property="usi" label="USI"></el-table-column>
                  <el-table-column sortable property="grade" label="Grade"></el-table-column>
                  <el-table-column property="classdays" label="Class Days">
                    <div slot-scope="scope">
                            <el-checkbox :checked="scope.row.classdays.includes('Monday')"><span>Monday</span></el-checkbox>
                            <el-checkbox :checked="scope.row.classdays.includes('Tuesday')"><span>Tuesday</span></el-checkbox>
                            <el-checkbox :checked="scope.row.classdays.includes('Wednesday')"><span>Wednesday</span></el-checkbox>
                            <el-checkbox :checked="scope.row.classdays.includes('Thursday')"><span>Thursday</span></el-checkbox>
                            <el-checkbox :checked="scope.row.classdays.includes('Friday')"><span>Friday</span></el-checkbox>
                    </div>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- PAGINATION -->
      <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="totalSize">
      </el-pagination>
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
    name: "assign-student",
    components: {
      RecordsComponent,
      SearchContentComponent
    },
    // DATA
    data: () => ({
      sn: 0,
      busy: false,
      page: 1,
      pageSize: 10,
      totalSize: 0,
      searchName:"",
      posts: [],
      studentData: [],
      classPeriod: "",
      classRoom: "",
      weekDays: ["Monday","Tuesday","Wednsday","Thursday","Friday"],
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
      loadMore() {
        this.busy = true;
        this.sn = parseInt(this.$route.params.id);

        const classPeriodStorage = this.loadclassPeriodStorage();

        if (classPeriodStorage) {
          const idx = classPeriodStorage.map((el) => el.sn).indexOf(this.sn);

          this.studentData = [];
          this.studentData = classPeriodStorage[idx];

          this.totalSize = classPeriodStorage.length;

          this.busy = false;
        } else {
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/class-period.json").then((response) => {
            
            this.totalSize = response.data.length;

            const idx = response.data.map((el) => el.sn).indexOf(this.sn);

            this.studentData = [];
            this.studentData = response.data[idx];

            this.current_page= response.current_page;
            this.per_page = response.per_page;
            this.total = response.total;
            this.next_page_url = response.next_page_url;

            sessionStorage.setItem("codeBookStorageJSONData",JSON.stringify(response.data));

            this.busy = false;
          }).catch((error) => error.response.data)
        }
      },
      updatePagination(value) {

        this.pageSize = value;

        const studentListStorage = this.loadStudentlistStorage();

        this.posts = [];
        const append = studentListStorage.slice(
            this.posts.length,
            this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      handleCurrentChange(val) {
          this.busy = true;
          const studentListStorage = this.loadStudentlistStorage();
        
          this.page = val;

          // CHECK IF SEARCH EMPTY
          if(this.searchName === ''){
            this.totalSize = studentListStorage.length;

            const append = studentListStorage.slice(
              (this.page - 1)*this.pageSize,
              ((this.page - 1)*this.pageSize)+this.pageSize
            );

            this.posts = append;
          }
          else {
            this.posts = studentListStorage.filter(data => data.name.toLowerCase().includes(this.searchName.toLowerCase()));

            this.totalSize = this.posts.length;

            const append = this.posts.slice(
              (this.page - 1)*this.pageSize,
              ((this.page - 1)*this.pageSize)+this.pageSize
            );

            this.posts = append;
          }

          this.busy = false;
      },
      filterList() {
          this.classPeriod ? this.isDisabledClassRoom = false : this.isDisabledClassRoom = true;

          if(this.classRoom){
            this.busy = true;

            this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-teacher__deploy/master/student-list.json").then((response) => {

                this.totalSize = response.data.length;
                this.posts = [];

                const append = response.data.slice(
                this.posts.length,
                this.posts.length + this.pageSize
                );

                this.posts = append;

                this.current_page = response.current_page;
                this.per_page = response.per_page;
                this.total = response.total;
                this.next_page_url = response.next_page_url;

                this.busy = false;
            }).catch((error) => error.response.data)
          }
      },
      searchFilter(value) {
        this.busy = true;

        const studentlistStorage = this.loadStudentlistStorage();

        this.posts = studentlistStorage.filter((data) =>
          data.name.toLowerCase().includes(value.toLowerCase()) ||
          data.surname.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = this.posts.length;

        this.busy = false;
        return studentlistStorage;
      },
      // LOCALSTORAGE
      loadclassPeriodStorage() {
        return JSON.parse(localStorage.getItem("classPeriodStorageJSONData"));
      },
      // LOCALSTORAGE
      loadStudentlistStorage() {
        return JSON.parse(localStorage.getItem("studentListStorageJSONData"));
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>

