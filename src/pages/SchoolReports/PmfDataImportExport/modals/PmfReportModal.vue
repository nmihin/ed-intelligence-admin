<template>
  <md-dialog :md-active.sync="pmfDataModal" class="modal-window">
    <h2 class="modal-title">{{year}}. PMF Report</h2>
    <div class="modal-content">
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
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
        busy:false,
        pmfDataModal:false,
        studentProgressData:[],
        studentAchievementsData:[],
        gatewayData:[],
        schoolEnvironmentData:[],
        year:0
    }),
    props: {

    },
    watch: {

    },
    methods: {
      openModal(sn,year){
        this.sn = sn;
        this.year = year;

        this.busy = true;

        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/pmf-report.json").then((response) => {   
            this.studentProgressData = response.data[0][2020][0].studentProgressData;
            this.studentAchievementsData = response.data[0][2020][0].studentAchievementsData;
            this.gatewayData = response.data[0][2020][0].gatewayData;
            this.schoolEnvironmentData = response.data[0][2020][0].schoolEnvironmentData;

            this.busy = false;
        }).catch((error) => error.response.data)

        this.pmfDataModal = true;
      }
    }
  }

</script>
