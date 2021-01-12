<template>
  <md-dialog :md-active.sync="pmfDataModal" class="modal-window">
    <h2 class="modal-title">{{year}}. PMF Report</h2>
    <div class="modal-content">
      <p>
        PMF Report
      </p>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="pmfDataModal = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "pmf-modal",
    components: {},
    // DATA
    data: () => ({
        sn:0,
        pmfDataModal:false,
        year:0
    }),
    props: {

    },
    watch: {

    },
    methods: {
      openModal(year){
        this.year = year;
        this.pmfDataModal = true;
      }
    }
  }

</script>
