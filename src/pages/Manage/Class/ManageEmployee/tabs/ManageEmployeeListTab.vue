<template>
    <el-table id="printTable" ref="singleTable" stripe :data="posts" highlight-current-row style="width: 100%">
            <el-table-column sortable property="sn" label="SN" width="80"></el-table-column>
            <el-table-column sortable property="name" label="Name"></el-table-column>
            <el-table-column sortable property="surname" label="Surname"></el-table-column>
            <el-table-column sortable property="email" label="Email"></el-table-column>
            <el-table-column sortable property="status" label="Status"></el-table-column>
            <el-table-column sortable property="agreementType" label="Agreement Type"></el-table-column>
            <el-table-column property="action" label="Action" width="250">
                <template v-slot="scope">
                  <!-- MANGE ACTIONS START -->
                  <ManageEmployeeActions 
                  :parentDataTab="posts"
                  :parentDataTabSN="scope.row.sn"
                  :deleteCodeConfirmParent="deleteCodeConfirm"
                  :deleteCodeConfirmRoot="idx"
                  />
                  <!-- MANAGE ACTIONS END -->
                </template>
            </el-table-column>
    </el-table>
</template>

<script>
import ManageEmployeeActions from '../actions/ManageEmployeeActions.vue'

  export default {
    name: "manage-employee-list",
    components: {
      ManageEmployeeActions
    },
    data() {
      return {
          sn:0,
          idx:0,
          posts:[]
      }
    },
    props: {
      parentData: Array,
      parentDataSN: Number,
      deleteCodeConfirmRoot: Function
    },
    watch: {
      parentData: function() {
        this.posts = this.parentData;
      },
      parentDataSN: function() {
        this.sn = this.parentData;
      }
    },
    methods: {
      deleteCodeConfirm(idx){
        this.deleteCodeConfirmRoot(idx);
      },
      loadMore() {
        this.posts = this.parentData;
        this.sn = this.parentDataSN;
      }
    },
    created() {
      this.loadMore();
    },
  };

</script>
