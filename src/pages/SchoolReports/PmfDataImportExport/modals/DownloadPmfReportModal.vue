<template>
  <md-dialog :md-active.sync="pmfDownloadModal" class="modal-window download-pmf">
    <h2 class="modal-title">Select Report Heading</h2>
    <div class="modal-content">
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
      <!-- SELECT REPORT -->
      <div class="row">
        <div class="col-12 col-sm-6">
          <VueNestable v-model="reportHeading" cross-list group="cross" class="assigned-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              {{item.name}} {{item.surname}}
            </VueNestableHandle>
          </VueNestable>
        </div>
        <div class="col-12 col-sm-6">
          <VueNestable v-model="parccSelected" cross-list group="cross" class="list-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              {{item.name}} {{item.surname}}
            </VueNestableHandle>
          </VueNestable>
        </div>
      </div>
    </div>
    <md-dialog-actions>
      <download-excel
        class="button medium ed-btn__secondary"
        :data="json_data"
        :fields="json_fields"
        worksheet="My Worksheet"
        name="filename.xls"
      >Download</download-excel>
      <button class="button medium ed-btn__tertiary" @click="pmfDownloadModal = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import Vue from "vue";
  import { VueNestable,VueNestableHandle } from "vue-nestable";
  import JsonExcel from "vue-json-excel";

  Vue.component("downloadExcel", JsonExcel);

  export default {
    name: "pmf-download-modal",
    components: {
      VueNestable,
      VueNestableHandle,
      JsonExcel
    },
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
      parccSelected:[],
      reportHeading:[],
      json_fields: {
        Id: "id",
        Name: "name",
        Surname: "surname"
      },
      json_data: [
        {
          id: 4,
          name: "Tye",
          surname: "Nelson"
        },
        {
          id: 5,
          name: "Abdirahman",
          surname: "Galvan"
        }
      ],
      reportHeadingPARCC: [{
        "parccList": [{
            "id": 0,
            "name": "Vivienne Labadie",
            "surname": "Becker"
          },
          {
            "id": 1,
            "name": "Hugh",
            "surname": "Whelan"
          },
          {
            "id": 2,
            "name": "Gracey",
            "surname": "Guevara"
          },
          {
            "id": 3,
            "name": "Leanne",
            "surname": "Lester"
          }
        ],
        "parccSelected": [{
            "id": 4,
            "name": "Tye",
            "surname": "Nelson"
          },
          {
            "id": 5,
            "name": "Abdirahman",
            "surname": "Galvan"
          },
          {
            "id": 6,
            "name": "Bronwen",
            "surname": "Beck"
          },
          {
            "id": 7,
            "name": "Lucia",
            "surname": "Moore"
          }
        ]
      }],
      reportHeadingSGP: [{
        "parccList": [{
            "id": 0,
            "name": "Vivienne2 Labadie",
            "surname": "Becker"
          },
          {
            "id": 1,
            "name": "Hugh",
            "surname": "Whelan"
          },
          {
            "id": 2,
            "name": "Gracey",
            "surname": "Guevara"
          },
          {
            "id": 3,
            "name": "Leanne",
            "surname": "Lester"
          }
        ],
        "parccSelected": [{
            "id": 4,
            "name": "Tye",
            "surname": "Nelson"
          },
          {
            "id": 5,
            "name": "Abdirahman",
            "surname": "Galvan"
          },
          {
            "id": 6,
            "name": "Bronwen",
            "surname": "Beck"
          },
          {
            "id": 7,
            "name": "Lucia",
            "surname": "Moore"
          }
        ]
      }],
    }),
    props: {

    },
    watch: {

    },
    methods: {
      downloadExcelReport(){
   
      },
      openModal(sn, year, type) {
        this.sn = sn;
        this.year = year;

        this.busy = true;

        if(type==="parcc"){
        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/parcc-data-2020.json").then((response) => {


          this.reportHeading = response.data; 
          console.log(this.reportHeading)
          console.log(this.reportHeadingPARCC[0].parccList)
          //this.reportHeading = this.reportHeadingPARCC[0];

          this.busy = false;
        }).catch((error) => error.response.data)
        }
        if(type==="sgp"){
        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/sgp-data-2020.json").then((response) => {


          this.reportHeading = response.data; 
          //this.reportHeading = this.reportHeadingSGP[0];

          console.log(this.reportHeading)
          this.busy = false;
        }).catch((error) => error.response.data)

        }

        this.pmfDownloadModal = true;
      }
    }
  }

</script>
