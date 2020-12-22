<template>
  <!-- Main Content -->
  <div class="main-content">
    <div class="container-fluid search-results">
      <div class="row">
            SEARCH RESULTS
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
  <!-- main-content-END -->
</template>

<script>

export default {
    name: "search-results",
    components: {

    },
    // DATA
    data: () => ({
        busy: true
    }),
    // METHODS
    methods: {
      loadMore() {

      }
    },
    created() {
        this.loadMore();
    }
}
</script>