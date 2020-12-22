<template>
    <div>
        <el-input @input="searchFilter(searchName)" placeholder="Search..." v-model="searchName"></el-input>
    </div>
</template>

<script>
  export default {
    name: "search-content",
    components: {

    },
    data: () => ({
        searchName:"",
    }),
    props: {
        searchFilterParent: Function

    },
    watch: {

    },
    methods: {
      loadMore() {

      },
      searchFilter(value){
           this.searchFilterParent(value);
      }
    },
    created() {
      this.loadMore();
    }

  }

</script>
