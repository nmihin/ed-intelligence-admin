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
              {{item}}
            </VueNestableHandle>
          </VueNestable>
        </div>
        <div class="col-12 col-sm-6">
          <VueNestable v-model="parccSelected" cross-list group="cross" class="list-menu">
            <VueNestableHandle slot-scope="{item}" :item="item">
              {{item}}
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
          const reportHeadingList = [
            {
                "usi": "USI",
                "name": "First Name",
                "surname": "Last Name",
                "birthDate": "Date of Birth",
                "gender": "Gender",
                "gradeLevel": "Grade Level",
                "raceEthnicity": "Race/ Ethnicity",
                "el20192020":"EL 2019-20",
                "swdLevel":"SWD Level",
                "monitoredEL20192020":"Monitored EL During the 2019-20 School Year",
                "swdMonitored":"SWD Monitored",
                "economicallyDisadvantaged":"Economically Disadvantaged",
                "atRisk":"Homeless Indicator",
                "newToUS":"New to US",
                "accesForEll20192020":"2019-20 ACCESS for ELLs Tested",
                "leaCode":"LEA Code",
                "leaName":"LEA Name",
                "schoolCode": "School Code",
                "schoolName": "School Name",
                "fullAcademicYearStatus": "Full Academic Year Status",
                "mathAssesment": "Math Assessment",
                "mathAssesmentGradeSubject":"Math Assessment Grade/Subject",
                "math3Plus":"Math 3+",
                "continuouslyEnrolledDuringTestingWindow":"Continuously Enrolled During Testing Window",
                "mathOffGradeTest":"Math Off-Grade Test",
                "elaOverallScaleScore":"ELA Overall Scale Score",
                "mathSummativeScoreStatus": "Math Summative Score Status",
                "registeredForRequiredMathAssessment": "Registered for Required Math Assessment",
                "enrollmentAuditPopulation20192020": "2019-20 Enrollment Audit population",
                "mathPerformanceLevel":"Math Performance Level",
                "mathTestRepeater":"Math Test Repeater",
                "ela3Plus":"ELA 3+",
                "osseApprovedELAMedicalExemption":"OSSE-Approved ELA Medical Exemption",
                "osseApprovedAlternateAssessmentEligibility":"OSSE-Approved Alternate Assessment Eligibility",
                "elaParticipant":"ELA Participant",
                "elaEligibleParticipant":"ELA Eligible Participant",
                "ela4Plus":"ELA 4+",
                "elaPerformanceLevel":"ELA Performance Level",
                "math4Plus":"Math 4+",
                "mathOverallScaleScore":"Math Overall Scale Score"
            }
          ]

          this.reportHeading = reportHeadingList[0];
          this.busy = false;
          /*
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/parcc-data-2020.json").then((response) => {

            this.reportHeading = response.data; 
            console.log(this.reportHeading)
            console.log(this.reportHeadingPARCC[0].parccList)

            this.busy = false;
          }).catch((error) => error.response.data)
          */
        }
        if(type==="sgp"){
          const reportHeadingList = [{
                "usi": "USI",
                "name": "First Name",
                "surname": "Last Name",
                "leaCode":"LEA Code",
                "leaName":"LEA Name",
                "schoolCode":"School Code",
                "schoolName": "School Name",
                "birthDate": "Date of Birth",
                "raceEthnicity": "Race/Ethnicity",
                "gender": "Gender",
                "fullAcademicYearStatus": "Full Academic Year",
                "economicallyDisadvantaged":"Economically Disadvantaged",
                "englishLanguageLearnerEL":"English Language Learner (EL) Status",
                "englishLanguageLearnerELMonitored":"English Language Learner (EL) + Monitored Status",
                "studentWithDisabilitiesSWDStatus":"Students with Disabilities (SWD) Status",
                "studentWithDisabilitiesSWDMonitoredStatus":"Students with Disabilities (SWD) + Monitored Status",
                "newToUS":"New to US",
                "grade2020":"Grade 2020",
                "mathSGP2020":"Math SGP 2020",
                "mathSGP2019":"Math SGP 2019",
                "mathTest2020":"Math Test 2020",
                "mathTest2019":"Math Test 2019",
                "mathTest2018":"Math Test 2018",
                "mathSS2020":"Math SS 2020",
                "mathSS2019":"Math SS 2019",
                "mathSS2018":"Math SS 2018",
                "elaSGP2020":"ELA SGP 2020",
                "elaSGP2019":"ELA SGP 2019",
                "elaTest2020":"ELA Test 2020",
                "elaTest2019":"ELA Test 2019",
                "elaTest2018":"ELA Test 2018",
                "elaSS2020":"ELA SS 2020",
                "elaSS2019":"ELA SS 2019",
                "elaSS2018":"ELA SS 2018"
          }]

          this.reportHeading = reportHeadingList[0];
          this.busy = false;
          /*
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/sgp-data-2020.json").then((response) => {

            this.reportHeading = response.data; 

            this.busy = false;
          }).catch((error) => error.response.data)
          */

        }

        this.pmfDownloadModal = true;
      }
    }
  }

</script>
