<template>
  <md-dialog :md-active.sync="pmfDownloadModal" class="modal-window">
    <h2 class="modal-title">Select Report Heading</h2>
    <div class="modal-content">
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
      <!-- SELECT REPORT -->
      <!--<VueNestable v-model="posts.menuAssigned" @change="changedMenuAssigned" cross-list group="cross" class="assigned-menu">
        <VueNestableHandle slot-scope="{item,index,isChild}" :item="item">
          <i class="icon" v-bind:class="item.icon"></i> {{ item.label }}
          <span class="card-box-api" v-for="(api, idx) in item.apiAccess" :key="idx">{{api}}</span>
          <a @click="
                      deleteMenuModal = true;
                      deleteSelectedMenu(item,index,isChild);
                    " class="card-option" href="#">
            <md-tooltip md-direction="top">Remove from menu</md-tooltip>
            <i class="icon icon-delete"></i>
          </a>
        </VueNestableHandle>
      </VueNestable>-->
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="pmfDownloadModal = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "pmf-download-modal",
    components: {},
    // DATA
    data: () => ({
      sn: 0,
      busy: false,
      pmfDownloadModal: false,
      studentProgressData: [],
      studentAchievementsData: [],
      gatewayData: [],
      schoolEnvironmentData: [],
      year: 0,
      posts: [],
    }),
    props: {

    },
    watch: {

    },
    methods: {
      openModal(sn, year) {
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

        this.pmfDownloadModal = true;
      }
    }
  }

</script>
