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
  import {
    VueNestable,
    VueNestableHandle
  } from "vue-nestable";
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
        "reportDataList": [
          {
          "id": 0,
          "type": "usi",
          "name": "USI"
        }, {
          "id": 1,
          "type": "name",
          "name": "First Name"
        }, {
          "id": 2,
          "type": "surname",
          "name": "Last Name"
        }, {
          "id": 3,
          "type": "birthDate",
          "name": "Date of Birth"
        }, {
          "id": 4,
          "type": "gender",
          "name": "Gender"
        }, {
          "id": 5,
          "type": "gradeLevel",
          "name": "Grade Level"
        }, {
          "id": 6,
          "type": "raceEthnicity",
          "name": "Race/ Ethnicity"
        }, {
          "id": 7,
          "type": "el20192020",
          "name": "EL 2019-20"
        }, {
          "id": 8,
          "type": "swdLevel",
          "name": "SWD Level"
        }, {
          "id": 9,
          "type": "monitoredEL20192020",
          "name": "Monitored EL During the 2019-20 School Year"
        }, {
          "id": 10,
          "type": "swdMonitored",
          "name": "SWD Monitored"
        }, {
          "id": 11,
          "type": "economicallyDisadvantaged",
          "name": "Economically Disadvantaged"
        }, {
          "id": 12,
          "type": "atRisk",
          "name": "Homeless Indicator"
        }, {
          "id": 13,
          "type": "newToUS",
          "name": "New to US"
        }, {
          "id": 14,
          "type": "accesForEll20192020",
          "name": "2019-20 ACCESS for ELLs Tested"
        }, {
          "id": 15,
          "type": "leaCode",
          "name": "LEA Code"
        }, {
          "id": 16,
          "type": "leaName",
          "name": "LEA Name"
        }, {
          "id": 17,
          "type": "schoolCode",
          "name": "School Code"
        }, {
          "id": 18,
          "type": "schoolName",
          "name": "School Name"
        }, {
          "id": 19,
          "type": "fullAcademicYearStatus",
          "name": "Full Academic Year Status"
        }, {
          "id": 20,
          "type": "mathAssesment",
          "name": "Math Assessment"
        }, {
          "id": 21,
          "type": "mathAssesmentGradeSubject",
          "name": "Math Assessment Grade/Subject"
        }, {
          "id": 22,
          "type": "math3Plus",
          "name": "Math 3+"
        }, {
          "id": 23,
          "type": "continuouslyEnrolledDuringTestingWindow",
          "name": "Continuously Enrolled During Testing Window"
        }, {
          "id": 24,
          "type": "mathOffGradeTest",
          "name": "Math Off-Grade Test"
        }, {
          "id": 25,
          "type": "elaOverallScaleScore",
          "name": "ELA Overall Scale Score"
        }, {
          "id": 26,
          "type": "mathSummativeScoreStatus",
          "name": "Math Summative Score Status"
        }, {
          "id": 27,
          "type": "registeredForRequiredMathAssessment",
          "name": "Registered for Required Math Assessment"
        }, {
          "id": 28,
          "type": "enrollmentAuditPopulation20192020",
          "name": "2019-20 Enrollment Audit population",
        }, {
          "id": 29,
          "type": "mathPerformanceLevel",
          "name": "Math Performance Level"
        }, {
          "id": 30,
          "type": "mathTestRepeater",
          "name": "Math Test Repeater"
        }, {
          "id": 31,
          "type": "ela3Plus",
          "name": "ELA 3+"
        }, {
          "id": 32,
          "type": "osseApprovedELAMedicalExemption",
          "name": "OSSE-Approved ELA Medical Exemption"
        }, {
          "id": 33,
          "type": "osseApprovedAlternateAssessmentEligibility",
          "name": "OSSE-Approved Alternate Assessment Eligibility"
        }, {
          "id": 34,
          "type": "elaParticipant",
          "name": "ELA Participant"
        }, {
          "id": 35,
          "type": "elaEligibleParticipant",
          "name": "ELA Eligible Participant"
        }, {
          "id": 36,
          "type": "ela4Plus",
          "name": "ELA 4+"
        }, {
          "id": 37,
          "type": "elaPerformanceLevel",
          "name": "ELA Performance Level"
        }, {
          "id": 38,
          "type": "math4Plus",
          "name": "Math 4+"
        }, {
          "id": 39,
          "type": "mathOverallScaleScore",
          "name": "Math Overall Scale Score"
        }
        ],
        "reportDataSelected": []
      }],
      reportDataSGP: [{
        "reportDataList": [{
          "id": 0,
          "type": "usi",
          "name": "USI"
        }, {
          "id": 1,
          "type": "name",
          "name": "First Name"
        }, {
          "id": 2,
          "type": "surname",
          "name": "Last Name"
        }, {
          "id": 3,
          "type": "leaCode",
          "name": "LEA Code"
        }, {
          "id": 4,
          "type": "leaName",
          "name": "LEA Name"
        }, {
          "id": 5,
          "type": "schoolCode",
          "name": "School Code"
        }, {
          "id": 6,
          "type": "schoolName",
          "name": "School Name"
        }, {
          "id": 7,
          "type": "birthDate",
          "name": "Date of Birth"
        }, {
          "id": 8,
          "type": "raceEthnicity",
          "name": "Race/Ethnicity"
        }, {
          "id": 9,
          "type": "gender",
          "name": "Gender"
        }, {
          "id": 10,
          "type": "fullAcademicYearStatus",
          "name": "Full Academic Year"
        }, {
          "id": 11,
          "type": "economicallyDisadvantaged",
          "name": "Economically Disadvantaged"
        }, {
          "id": 12,
          "type": "englishLanguageLearnerEL",
          "name": "English Language Learner (EL) Status"
        }, {
          "id": 13,
          "type": "englishLanguageLearnerELMonitored",
          "name": "English Language Learner (EL) + Monitored Status"
        }, {
          "id": 14,
          "type": "studentWithDisabilitiesSWDStatus",
          "name": "Students with Disabilities (SWD) Status"
        }, {
          "id": 15,
          "type": "studentWithDisabilitiesSWDMonitoredStatus",
          "name": "Students with Disabilities (SWD) + Monitored Status"
        }, {
          "id": 16,
          "type": "newToUS",
          "name": "New to US"
        }, {
          "id": 17,
          "type": "grade2020",
          "name": "Grade 2020"
        }, {
          "id": 18,
          "type": "mathSGP2020",
          "name": "Math SGP 2020"
        }, {
          "id": 19,
          "type": "mathSGP2019",
          "name": "Math SGP 2019"
        }, {
          "id": 20,
          "type": "mathTest2020",
          "name": "Math Test 2020"
        }, {
          "id": 21,
          "type": "mathTest2019",
          "name": "Math Test 2019"
        }, {
          "id": 22,
          "type": "mathTest2018",
          "name": "Math Test 2018"
        }, {
          "id": 23,
          "type": "mathSS2020",
          "name": "Math SS 2020"
        }, {
          "id": 24,
          "type": "mathSS2019",
          "name": "Math SS 2019"
        }, {
          "id": 25,
          "type": "mathSS2018",
          "name": "Math SS 2018"
        }, {
          "id": 26,
          "type": "elaSGP2020",
          "name": "ELA SGP 2020"
        }, {
          "id": 27,
          "type": "elaSGP2019",
          "name": "ELA SGP 2019"
        }, {
          "id": 28,
          "type": "elaTest2020",
          "name": "ELA Test 2020"
        }, {
          "id": 29,
          "type": "elaTest2019",
          "name": "ELA Test 2019"
        }, {
          "id": 30,
          "type": "elaTest2018",
          "name": "ELA Test 2018"
        }, {
          "id": 31,
          "type": "elaSS2020",
          "name": "ELA SS 2020"
        }, {
          "id": 32,
          "type": "elaSS2019",
          "name": "ELA SS 2019"
        }, {
          "id": 33,
          "type": "elaSS2018",
          "name": "ELA SS 2018"
        }],
        "reportDataSelected": []
      }],
      reportHeading:[],
      reportData:[],
      studentData:[],
      jsonFields:{}
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
            this.jsonFields[el.name] = el.type;
        });
      },
      openModal(sn, year, type) {
        this.sn = sn;
        this.year = year;
        this.busy = true;
        this.type = type;

        this.fileName = this.type+"_data_"+this.year+".xls";

        if (type === "parcc") {
          const reportDataPARCC = JSON.parse(JSON.stringify(this.reportDataPARCC));
          this.reportData = reportDataPARCC;

          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/parcc-data-2020.json").then((response) => {

            this.studentData = response.data; 

            this.busy = false;
          }).catch((error) => error.response.data)
          
          this.busy = false;
        }
        if (type === "sgp") {
          const reportDataSGP = JSON.parse(JSON.stringify(this.reportDataSGP));
          this.reportData = reportDataSGP;

          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/sgp-data-2020.json").then((response) => {

            this.studentData = response.data; 

            this.busy = false;
          }).catch((error) => error.response.data)

          this.busy = false;
        }
        this.pmfDownloadModal = true;
      }
    }
  }

</script>
