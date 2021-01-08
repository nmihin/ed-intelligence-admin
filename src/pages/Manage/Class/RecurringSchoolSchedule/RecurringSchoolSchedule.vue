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
    <EditSchoolScheduleModal
        ref="EditTemplateModal"
        :editFormSaveParent="editRecurringSchedule"
    />
    <!-- END EDIT MODAL -->
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
            <el-table-column sortable property="scheduleType" label="Schedule Type"></el-table-column>
            <el-table-column sortable property="activity" label="Activity"></el-table-column>
            <el-table-column sortable property="startTime" label="Start Time"></el-table-column>
            <el-table-column sortable property="endTime" label="End Time"></el-table-column>
            <el-table-column sortable property="weekDays" label="Week Days">
                <template v-slot="scope">
                    <button v-for="(post, idx) in scope.row.weekDays" :key="idx" class="tags button medium ed-btn__secondary">
                        <span>{{post}}</span>
                    </button> 
                </template>
            </el-table-column>
            <el-table-column sortable property="grades" label="Grades">
                <template v-slot="scope">
                    <button v-for="(post, idx) in scope.row.grades" :key="idx" class="tags button medium ed-btn__primary">
                        <span>{{post}}</span>
                    </button> 
                </template>
            </el-table-column>
            <el-table-column sortable property="action" width="100" label="Action">
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

  import DeleteSchoolScheduleModal from './modals/DeleteSchoolScheduleModal.vue';
  import EditSchoolScheduleModal from './modals/EditSchoolScheduleModal.vue';

  export default {
    name: "reccuring-school-schedule",
    components: {
      RecordsComponent,
      SearchContentComponent,
      DeleteSchoolScheduleModal,
      EditSchoolScheduleModal
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
       deleteSelectedAction(sn){
          this.$refs.DeleteTemplateModal.openModal(sn);
       },
       editSelectedAction(data){
          this.$refs.EditTemplateModal.openModal(data);
       },
       deleteSchoolScheduleSN(idx){
          const recurringScheduleStorage = this.loadRecurringScheduleStorage();

          const codeDeleted = recurringScheduleStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;

          localStorage.setItem("recurringScheduleStorageJSONData",JSON.stringify(codeDeleted));
       },
       editRecurringSchedule(editedData){
        // FIND SCHEDULE INDEX
         const idx = this.posts.map((el) => el.sn).indexOf(editedData.sn);

         this.posts[idx] = editedData;
         localStorage.setItem("recurringScheduleStorageJSONData",JSON.stringify(this.posts));
       },
       loadMore() {
         this.busy = true;
         const recurringScheduleStorage = this.loadRecurringScheduleStorage();

         if (recurringScheduleStorage) {
            this.totalSize = recurringScheduleStorage.length;

            const append = recurringScheduleStorage.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

            this.posts = append;

           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/recurring-schedule.json").then((response) => {
            this.totalSize = response.data.length;

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

             this.posts = append;

             localStorage.setItem("recurringScheduleStorageJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
      updatePagination(value) {
        this.pageSize = value;

        const recurringScheduleStorage = this.loadRecurringScheduleStorage();

        this.posts = [];
        const append = recurringScheduleStorage.slice(
          this.posts.length,
          this.posts.length + this.pageSize
        );

        this.posts = append;
      },
      searchFilter(value) {
        this.busy = true;

        const recurringScheduleStorage = this.loadRecurringScheduleStorage();

        this.posts = recurringScheduleStorage.filter((data) =>
          data.category.toLowerCase().includes(value.toLowerCase())
        );

        this.totalSize = recurringScheduleStorage.length;

        this.busy = false;
        return recurringScheduleStorage;
      },
       handleCurrentChange(val) {
        this.busy = true;
        const recurringScheduleStorage = this.loadRecurringScheduleStorage();
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
       },
       // LOCALSTORAGE
       loadRecurringScheduleStorage() {
         return JSON.parse(localStorage.getItem("recurringScheduleStorageJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
