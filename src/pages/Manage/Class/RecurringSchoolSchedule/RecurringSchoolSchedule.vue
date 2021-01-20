<template>
  <!-- Main Content START -->
  <div class="main-content">
    <!-- START VIEW MODAL -->
    <DeleteSchoolScheduleModal
        ref="DeleteTemplateModal"
        :deleteSchoolScheduleConfirmParent="deleteSchoolScheduleSN"
    />
    <!-- END VIEW MODAL -->
    <!-- START EDIT MODAL -->
    <AddEditSchoolScheduleModal
        ref="AddEditTemplateModal"
        :editAddFormSaveParent="editAddRecurringSchedule"
    />
    <!-- END EDIT MODAL -->
    <div class="container-fluid recurring-schedule">
      <div class="row">
        <div class="col-12 col-sm-4 col-md-4">
          <RecordsComponent :updatePaginationParent="updatePagination" />
        </div>
        <div class="col-6 col-sm-4 col-md-4">
          <button @click="addSelectedAction()"
            class="button ed-btn__primary add-schedule"
          >
            <i class="icon icon-add"></i>
            <span>Add Schedule</span>
          </button>
        </div>
        <div class="col-6 col-sm-4 col-md-4">
          <SearchContentComponent :searchFilterParent="searchFilter" />
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <el-table ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="scheduleType" width="160" label="Schedule Type"></el-table-column>
            <el-table-column sortable property="activity" width="160" label="Activity"></el-table-column>
            <el-table-column sortable property="startTime" label="Start Time"></el-table-column>
            <el-table-column sortable property="endTime" label="End Time"></el-table-column>
            <el-table-column property="weekDays" label="Week Days">
                <template v-slot="scope">
                    <button v-for="(post, idx) in scope.row.weekDays" :key="idx" class="tags button medium ed-btn__secondary">
                        <span>{{post}}</span>
                    </button> 
                </template>
            </el-table-column>
            <el-table-column property="grades" label="Grades">
                <template v-slot="scope">
                    <button v-for="(post, idx) in scope.row.grades" :key="idx" class="tags button medium ed-btn__primary">
                        <span>{{post}}</span>
                    </button> 
                </template>
            </el-table-column>
            <el-table-column property="action" width="150" label="Action">
                <template v-slot="scope">
                    <div @click="editSelectedAction(scope.row);" class="element">
                        <el-tooltip class="item" effect="dark" content="Edit" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div @click="deleteSelectedAction(scope.row.sn);" class="element">
                        <el-tooltip class="item" effect="dark" content="Delete" placement="top">
                            <i class="icon icon-delete"></i>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <el-pagination 
          background 
          layout="prev, pager, next" 
          @current-change="handleCurrentChange" 
          :current-page.sync="currentPage"
          :page-size="pageSize" 
          :total="totalSize">
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

  import DeleteSchoolScheduleModal from './modals/DeleteSchoolScheduleModal.vue';
  import AddEditSchoolScheduleModal from './modals/AddEditSchoolScheduleModal.vue';

  export default {
    name: "reccuring-school-schedule",
    components: {
      RecordsComponent,
      SearchContentComponent,
      DeleteSchoolScheduleModal,
      AddEditSchoolScheduleModal
    },
    // DATA
    data: () => ({
      posts: [],
      page: 1,
      pageSize: 10,
      currentPage: 1,
      totalSize: 0,
      loadedData:[],
      searchName: "",
      busy: false
    }),
    methods: {
       deleteSelectedAction(sn){
          this.$refs.DeleteTemplateModal.openModal(sn);
       },
       editSelectedAction(data){
          this.$refs.AddEditTemplateModal.openModal(data,"edit");
       },
       addSelectedAction(){
          this.$refs.AddEditTemplateModal.openModal(this.posts,"add");
       },
       deleteSchoolScheduleSN(idx){
          const recurringScheduleStorage = this.loadedData;

          const codeDeleted = recurringScheduleStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;
          this.loadedData = codeDeleted;
       },
       editAddRecurringSchedule(data,action){

        // FIND SCHEDULE INDEX
        if(action==="edit"){
          const idx = this.posts.map((el) => el.sn).indexOf(data.sn);
          this.posts[idx] = data;
          const clonedPosts =  JSON.parse(JSON.stringify(this.posts))

          this.posts = [];
          this.posts = clonedPosts;
          this.loadedData = clonedPosts;
        }
        if(action==="add"){
          this.posts.push(JSON.parse(JSON.stringify(data)));
          this.loadedData = this.posts;
        }
       },
       loadMore() {
         this.busy = true;

         this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/recurring-schedule.json").then((response) => {
            this.totalSize = response.data.length;
            this.loadedData = response.data;
            this.posts = [];

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

        const recurringScheduleStorage = this.loadedData;

        this.posts = [];
        const append = recurringScheduleStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const recurringScheduleStorage = this.loadedData;

        this.posts = recurringScheduleStorage.filter((data) =>
          data.scheduleType.toLowerCase().includes(value.toLowerCase()) ||
          data.activity.toLowerCase().includes(value.toLowerCase()) || 
          data.startTime.toLowerCase().includes(value.toLowerCase()) || 
          data.endTime.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = recurringScheduleStorage.length;

        this.busy = false;
        return recurringScheduleStorage;
      },
       handleCurrentChange(val) {
        this.busy = true;
        const recurringScheduleStorage = this.loadedData;
        this.page = val;

        // CHECK IF SEARCH EMPTY
        if (this.searchName === "") {
          this.totalSize = recurringScheduleStorage.length;

          const append = recurringScheduleStorage.slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          );

          this.posts = append;
        } else {

          this.posts = recurringScheduleStorage.filter((data) =>
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
