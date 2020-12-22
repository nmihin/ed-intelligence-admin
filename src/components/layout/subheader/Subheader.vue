<template>      
      <!-- Sub Header START-->
      <div class="sub-header">
        <div class="container">
          <div class="row">
            <ul>
              <li><a href="#">Dashboard</a></li>
            </ul>
            <Search />
          </div>
        </div>
      </div>
      <!-- Sub Header END-->
</template>
<script>
import Search from '../search/Search.vue'

export default {
  name: "subheader",
  components: {
    Search
  },
  data() {
    return {
      breadcrumb: ""
    }
  },
  watch: {
      '$route':{
        handler: (to, from) => {
         //this.breadcrumb = to.name;
        },
          immediate: true
      }
  },
  created() {

  }
}
</script>