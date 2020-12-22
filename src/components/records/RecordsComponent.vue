<template>
    <div class="records-select">
        <el-select @change="updatePagination(value)" v-model="value" placeholder="Records">
            <el-option v-for="item in recordsOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <span class="records">Records</span>
    </div>
</template>

<script>
  export default {
    name: "records",
    components: {

    },
    data: () => ({
       value: 10,
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
        updatePaginationParent: Function

    },
    watch: {

    },
    methods: {
      loadMore() {

      },
      updatePagination(value){
           this.updatePaginationParent(value);
      }
    },
    created() {
      this.loadMore();
    }

  }

</script>
