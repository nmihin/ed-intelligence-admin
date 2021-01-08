<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
          CONTENT
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
    name: "reccuring-school-schedule",
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
       deleteSelectedAction(sn){
          this.$refs.DeleteTemplateModal.openModal(sn);
       },
       editSelectedAction(data){
          this.$refs.EditTemplateModal.openModal(data);
       },
       deleteEmployee(idx){
          const employeeStorage = this.loadEmployeeStorage();

          const codeDeleted = recurringScheduleStorage.filter(function(item) {
              return item.sn !== idx;
          });

          this.posts = codeDeleted;

          localStorage.setItem("recurringScheduleStorageJSONData",JSON.stringify(codeDeleted));
       },
       loadMore() {
         this.busy = true;
         const employeeStorage = this.loadEmployeeStorage();

         if (employeeStorage) {
            this.totalSize = employeeStorage.length;
            this.posts = [];

            const append = employeeStorage.slice(
              this.posts.length,
              this.posts.length + this.pageSize
            );

           this.posts = append;
           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/recurring-schedule.json").then((response) => {
            this.totalSize = response.data.length;
            this.posts = [];

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
       loadEmployeeStorage() {
         //return JSON.parse(localStorage.getItem("recurringScheduleStorageJSONData"));
       }
     },
    created() {
      this.loadMore();
    }
  }

</script>
