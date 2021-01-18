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
          <VueNestable @change="changedList" v-model="reportData[0].reportDataList" cross-list group="cross" class="assigned-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              {{item.name}}
            </VueNestableHandle>
          </VueNestable>
        </div>
        <div class="col-6 col-sm-6">
          <VueNestable @change="changedList" v-model="reportData[0].reportDataSelected" cross-list group="cross" class="list-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              {{item.name}}
            </VueNestableHandle>
          </VueNestable>
        </div>
      </div>
    </div>
    <md-dialog-actions>
      <download-excel class="button medium ed-btn__secondary" :data="studentData" :fields="jsonFields" worksheet="My Worksheet" name="filename.xls">Download</download-excel>
      <button class="button medium ed-btn__tertiary" @click="pmfDownloadModal = false">Close</button>
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
      posts: [],
      reportDataPARCC: [{
        "reportDataList": [{
          "type": "usi",
          "name": "USI"
        }, {
          "type": "name",
          "name": "First Name"
        }, {
          "type": "surname",
          "name": "Last Name"
        }, {
          "type": "birthDate",
          "name": "Date of Birth"
        }, {
          "type": "gender",
          "name": "Gender"
        }, {
          "type": "gradeLevel",
          "name": "Grade Level"
        }, {
          "type": "raceEthnicity",
          "name": "Race/ Ethnicity"
        }, {
          "type": "el20192020",
          "name": "EL 2019-20"
        }, {
          "type": "swdLevel",
          "name": "SWD Level"
        }, {
          "type": "monitoredEL20192020",
          "name": "Monitored EL During the 2019-20 School Year"
        }, {
          "type": "swdMonitored",
          "name": "SWD Monitored"
        }, {
          "type": "economicallyDisadvantaged",
          "name": "Economically Disadvantaged"
        }, {
          "type": "atRisk",
          "name": "Homeless Indicator"
        }, {
          "type": "newToUS",
          "name": "New to US"
        }, {
          "type": "accesForEll20192020",
          "name": "2019-20 ACCESS for ELLs Tested"
        }, {
          "type": "leaCode",
          "name": "LEA Code"
        }, {
          "type": "leaName",
          "name": "LEA Name"
        }, {
          "type": "schoolCode",
          "name": "School Code"
        }, {
          "type": "schoolName",
          "name": "School Name"
        }, {
          "type": "fullAcademicYearStatus",
          "name": "Full Academic Year Status"
        }, {
          "type": "mathAssesment",
          "name": "Math Assessment"
        }, {
          "type": "mathAssesmentGradeSubject",
          "name": "Math Assessment Grade/Subject"
        }, {
          "type": "math3Plus",
          "name": "Math 3+"
        }, {
          "type": "continuouslyEnrolledDuringTestingWindow",
          "name": "Continuously Enrolled During Testing Window"
        }, {
          "type": "mathOffGradeTest",
          "name": "Math Off-Grade Test"
        }, {
          "type": "elaOverallScaleScore",
          "name": "ELA Overall Scale Score"
        }, {
          "type": "mathSummativeScoreStatus",
          "name": "Math Summative Score Status"
        }, {
          "type": "registeredForRequiredMathAssessment",
          "name": "Registered for Required Math Assessment"
        }, {
          "type": "enrollmentAuditPopulation20192020",
          "name": "2019-20 Enrollment Audit population",
        }, {
          "type": "mathPerformanceLevel",
          "name": "Math Performance Level"
        }, {
          "type": "mathTestRepeater",
          "name": "Math Test Repeater"
        }, {
          "type": "ela3Plus",
          "name": "ELA 3+"
        }, {
          "type": "osseApprovedELAMedicalExemption",
          "name": "OSSE-Approved ELA Medical Exemption"
        }, {
          "type": "osseApprovedAlternateAssessmentEligibility",
          "name": "OSSE-Approved Alternate Assessment Eligibility"
        }, {
          "type": "elaParticipant",
          "name": "ELA Participant"
        }, {
          "type": "elaEligibleParticipant",
          "name": "ELA Eligible Participant"
        }, {
          "type": "ela4Plus",
          "name": "ELA 4+"
        }, {
          "type": "elaPerformanceLevel",
          "name": "ELA Performance Level"
        }, {
          "type": "math4Plus",
          "name": "Math 4+"
        }, {
          "type": "mathOverallScaleScore",
          "name": "Math Overall Scale Score"
        }],
        "reportDataSelected": []
      }],
      reportDataSGP: [{
        "reportDataList": [{
          "type": "usi",
          "name": "USI"
        }, {
          "type": "name",
          "name": "First Name"
        }, {
          "type": "surname",
          "name": "Last Name"
        }, {
          "type": "leaCode",
          "name": "LEA Code"
        }, {
          "type": "leaName",
          "name": "LEA Name"
        }, {
          "type": "schoolCode",
          "name": "School Code"
        }, {
          "type": "schoolName",
          "name": "School Name"
        }, {
          "type": "birthDate",
          "name": "Date of Birth"
        }, {
          "type": "raceEthnicity",
          "name": "Race/Ethnicity"
        }, {
          "type": "gender",
          "name": "Gender"
        }, {
          "type": "fullAcademicYearStatus",
          "name": "Full Academic Year"
        }, {
          "type": "economicallyDisadvantaged",
          "name": "Economically Disadvantaged"
        }, {
          "type": "englishLanguageLearnerEL",
          "name": "English Language Learner (EL) Status"
        }, {
          "type": "englishLanguageLearnerELMonitored",
          "name": "English Language Learner (EL) + Monitored Status"
        }, {
          "type": "studentWithDisabilitiesSWDStatus",
          "name": "Students with Disabilities (SWD) Status"
        }, {
          "type": "studentWithDisabilitiesSWDMonitoredStatus",
          "name": "Students with Disabilities (SWD) + Monitored Status"
        }, {
          "type": "newToUS",
          "name": "New to US"
        }, {
          "type": "grade2020",
          "name": "Grade 2020"
        }, {
          "type": "mathSGP2020",
          "name": "Math SGP 2020"
        }, {
          "type": "mathSGP2019",
          "name": "Math SGP 2019"
        }, {
          "type": "mathTest2020",
          "name": "Math Test 2020"
        }, {
          "type": "mathTest2019",
          "name": "Math Test 2019"
        }, {
          "type": "mathTest2018",
          "name": "Math Test 2018"
        }, {
          "type": "mathSS2020",
          "name": "Math SS 2020"
        }, {
          "type": "mathSS2019",
          "name": "Math SS 2019"
        }, {
          "type": "mathSS2018",
          "name": "Math SS 2018"
        }, {
          "type": "elaSGP2020",
          "name": "ELA SGP 2020"
        }, {
          "type": "elaSGP2019",
          "name": "ELA SGP 2019"
        }, {
          "type": "elaTest2020",
          "name": "ELA Test 2020"
        }, {
          "type": "elaTest2019",
          "name": "ELA Test 2019"
        }, {
          "type": "elaTest2018",
          "name": "ELA Test 2018"
        }, {
          "type": "elaSS2020",
          "name": "ELA SS 2020"
        }, {
          "type": "elaSS2019",
          "name": "ELA SS 2019"
        }, {
          "type": "elaSS2018",
          "name": "ELA SS 2018"
        }],
        "reportDataSelected": []
      }],
      reportHeading:[],
      reportData:[],
      studentData:[],
      jsonFields:{},
      json_fields: {
        USI: "usi"
      },
      json_data: [{
          id: 4,
          name: "Tye",
          surname: "Nelson"
        },
        {
          id: 5,
          name: "Abdirahman",
          surname: "Galvan"
        }
      ]
    }),
    props: {

    },
    watch: {

    },
    methods: {
      downloadExcelReport() {

      },
      changedList() {
        this.jsonFields = {};
        const selectedData = this.reportData[0].reportDataSelected;
        selectedData.forEach((el)=>{
            this.jsonFields[el.name] = el.type;
        });

        console.log(this.jsonFields)
      },
      openModal(sn, year, type) {
        this.sn = sn;
        this.year = year;

        this.busy = true;

        this.type = type;

        if (type === "parcc") {

          this.reportData = this.reportDataPARCC;

          
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/parcc-data-2020.json").then((response) => {

            this.studentData = response.data; 

            console.log(this.reportHeading)
            console.log(this.reportDataPARCC[0].parccList)

            this.busy = false;
          }).catch((error) => error.response.data)
          

          this.busy = false;
        }
        if (type === "sgp") {
          this.reportData = this.reportDataSGP;

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
