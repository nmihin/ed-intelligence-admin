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
                    <div class="element" @click="entrySelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Leave Entry" placement="top">
                            <i class="icon icon-entry"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="profileSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="View Profile" placement="top">
                            <i class="icon icon-profile"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="addEditEmployeeAction(item.sn,'Edit')">
                        <el-tooltip class="item" effect="dark" content="Edit Profile" placement="top">
                            <i class="icon icon-edit"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="deleteSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Delete Profile" placement="top">
                            <i class="icon icon-delete"></i>
                        </el-tooltip>
                    </div>
                    <div class="element" @click="createSelectedAction(item.sn)">
                        <el-tooltip class="item" effect="dark" content="Create Account" placement="top">
                            <i class="icon icon-add"></i>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
    </el-table>
</template>

<script>
  export default {
    name: "manage-employee-list",
    components: {

    },
    data() {
      return {
          posts:[]
      }
    },
    props: {
      parentData: Array
    },
    watch: {
      parentData: function() {
        this.posts = this.parentData;
      }
    },
    methods: {
      loadMore() {

      }
    },
    created() {
      this.loadMore();
    },
  };

</script>
