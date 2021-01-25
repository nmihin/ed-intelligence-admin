<template>
  <md-dialog :md-active.sync="pmfDownloadModal" class="modal-window download-pmf">
    <h2 class="modal-title">Select Report Heading</h2>
    <div class="modal-content">
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
      <!-- SELECT REPORT -->
      <div class="row" v-if="type==='parcc' || type==='sgp'">
        <div class="col-6 col-sm-6">
          <VueNestable 
            @change="changedList" 
            v-model="reportData[0].reportDataList" 
            cross-list group="cross" 
            class="left-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
             <span class="element-title">{{item.name}}</span>
             <a href="#" @click="addRemoveElement(item.type,'add')" class="element">
                <i class="icon icon-arrow-right"></i>
              </a>
            </VueNestableHandle>
          </VueNestable>
        </div>
        <div class="col-6 col-sm-6">
          <VueNestable 
            @change="changedList" 
            v-model="reportData[0].reportDataSelected" 
            cross-list group="cross" 
            class="right-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              <a href="#" @click="addRemoveElement(item.type,'remove')"  class="element">
                <i class="icon icon-arrow-left"></i>
              </a>
              <span class="element-title">{{item.name}}</span>
            </VueNestableHandle>
          </VueNestable>
        </div>
      </div>
    </div>
    <md-dialog-actions>
      <download-excel class="button medium ed-btn__secondary" :data="studentData" :fields="jsonFields" worksheet="Report Data" :name="fileName">Download</download-excel>
      <button class="button medium ed-btn__tertiary" @click="closeModal()">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import Vue from "vue";
  import { VueNestable, VueNestableHandle } from "vue-nestable";
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
      type: "",
      fileName:"",
      posts: [],
      reportDataPARCC: [{
        "reportDataList": [],
        "reportDataSelected": []
      }],
      reportDataSGP: [{
        "reportDataList": [],
        "reportDataSelected": []
      }],
      reportHeading:[],
      reportData:[],
      studentData:[],
      jsonFields:{},
      loadedData:[],
      propertyList:[]
    }),
    methods: {
      closeModal(){
        this.pmfDownloadModal = false;
      },
      addRemoveElement(prop,action){
     
        // ADD
        if(action === "add" && typeof this.reportData[0].reportDataList !=="undefined"){
          // FIND STUDENT INDEX
          const idx = this.reportData[0].reportDataList.map((el) => el.type).indexOf(prop);

          this.reportData[0].reportDataSelected.push(this.reportData[0].reportDataList[idx]);
        
          this.reportData[0].reportDataList.splice(idx,1);
        }

        // REMOVE
        if(action === "remove" && typeof this.reportData[0].reportDataSelected !=="undefined"){
          // FIND STUDENT INDEX
          const idx = this.reportData[0].reportDataSelected.map((el) => el.type).indexOf(prop);

          this.reportData[0].reportDataList.push(this.reportData[0].reportDataSelected[idx]);

          this.reportData[0].reportDataSelected.splice(idx,1);
        }

        this.changedList();
      },
      changedList() {
        this.jsonFields = {};
        const selectedData = this.reportData[0].reportDataSelected;
        selectedData.forEach((el)=>{
            this.jsonFields[el.name] = el.type.toString();
        });
      },
      keysToProperties(keys){
        const arr = [];

        let camelCaseMerge = (str) => {
            return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
              if (+match === 0) return "";
                return index === 0 ? match.toLowerCase() : match.toUpperCase();
            });
        }

        keys.forEach((element) => {
            arr.push(camelCaseMerge(element))
        });

        return arr;
      },
      createReportDataListConvert(keys){
        const arr = [];

        keys.forEach((element, index) => {
            arr.push(
              {
                id:index,
                type: index,
                name:element
              }
            )
        });

        return arr;
      },
      openModal(sn, year, type, data) {
        this.loadedData = data;
        this.sn = sn;
        this.year = year;
        this.busy = true;
        this.type = type;

        this.fileName = this.type+"_data_"+this.year+".xls";

        if (type === "parcc") {
          this.propertyList = this.keysToProperties(JSON.parse(this.loadedData.parcc_keys));
          this.reportDataPARCC[0].reportDataList = this.createReportDataListConvert(JSON.parse(this.loadedData.parcc_keys));

          this.studentData = JSON.parse(this.loadedData.parcc_rows);

          const reportDataPARCC = JSON.parse(JSON.stringify(this.reportDataPARCC));
          this.reportData = reportDataPARCC;

          this.busy = false;
        }
        if (type === "sgp") {
          this.propertyList = this.keysToProperties(JSON.parse(this.loadedData.sgp_keys));
          this.reportDataSGP[0].reportDataList = this.createReportDataListConvert(JSON.parse(this.loadedData.sgp_keys));

          this.studentData = JSON.parse(this.loadedData.sgp_rows);

          const reportDataSGP = JSON.parse(JSON.stringify(this.reportDataSGP));
          this.reportData = reportDataSGP;

          this.busy = false;
        }
      
        this.pmfDownloadModal = true;
      }
    }
  }

</script>
