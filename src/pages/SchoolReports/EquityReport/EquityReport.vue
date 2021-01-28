<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-6">
          <div v-if="routeName ==='prioryearequityreporty'" class="years-select">
            <el-select @change="updateReport(value)" v-model="value" placeholder="Years">
              <el-option v-for="item in yearsOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span class="records">Years</span>
          </div>
        </div>
        <div class="col-6">
          <ul class="document-uploaded right" style="margin-bottom:5px !important;">
            <li class="type-pdf" @click="downloadPDF()">
              <span class="document-name">Export to PDF</span>
              <span class="icon icon-download-pdf-document"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
            </li>
          </ul>
        </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="card-boxes">
          <div class="card-box">
            <div ref="contentPDF" :class="downloadModeActive" class="card-content equity-report">
              <div class="row">
                <div class="col-12">
                  <h2 class="equity-report-title">ED-Intelligence</h2>
                  <h3 class="equity-report-subtitle">2018-2019 Equity Report</h3>
                </div>
                <div class="col-12 col-sm-6">
                  <p>
                    <strong>What is an Equity Report?</strong> Equity in education refers to all students receiving the same caliber of education regardless of their race, ethnicity, economic status, special education status or other factors. Equity Reports give our schools, families and communities transparent and comparable information related to equity across all DC schools. Equity Reports are available online so that information is easy to access, understand and use. The Office of the State Superintendent of Education (OSSE), DC Public Schools (DCPS), the DC Public Charter School Board (DC PCSB) in consultation with charter schools, the Deputy Mayor for Education and NewSchools Venture Fund partnered to create these Equity Reports. Equity Reports are a complement to OSSE's LearnDC School Profiles, DCPS School Scorecards and DCPCSB's Performance Management Framework.
                  </p>
                </div>
                <div class="col-12 col-sm-6">
                  <h2 class="equity-report-title-header">SCHOOL CHARACTERISTICS ( SY 2019-2020 )</h2>
                  <div class="equity-information">
                    <ul>
                      <li>Grades: <span>PK3 - Eight</span></li>
                      <li>Ward: <span>6</span></li>
                      <li>Address: <span>1250 Constitution Ave. NE Washington, DC 20002</span></li>
                      <li>Contact: <span>202-698-3838</span></li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <h2 class="equity-report-title-header">
                    STUDENT CHARACTERISTICS
                    <el-popover
                        placement="top-start"
                        title="About Student Characteristics"
                        width="600"
                        trigger="hover"
                        content="Every fall, OSSE counts the number of students present in every public and public charter school. This enrollment audit provides us with a snapshot of the student body, including the total number of students enrolled and their characteristics. The enrollment characteristics – race/ethnicity, gender, Special Education, English Learner (EL), and economically disadvantaged – were identified as of particular importance when considering issues of equity, and they will appear throughout this report. This school’s total enrollment was identified using the October 5, 2016 audited enrollment data file. For both DCPS and public charter schools, enrollment is determined using the audited enrollment population and subgroup identification is based on the Demographic Certification file that schools cerified at the end of SY2016-17. For the economically disadvantaged, EL, and special education subgroups, students are identified based on their highest level of need at any time during the school year, not just at the time of the annual audit. Additionally, for both the special education and the EL subgroups, students must be between the ages of 3 and 21 to be considered in the subgroup. The subgroup “economically disadvantaged” does not apply for students attending adult programs because adult programs are not eligible for the Free and Reduced-Price Meal (FARM) program (a key component of the subgroup) and there is no other comparable data collected for adult programs.">
                        <i slot="reference" class="icon icon-information"></i>
                    </el-popover>
                  </h2>
                  <h3 class="equity-report-subtitle">Total Enrollment (#) - 260</h3>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <h3 class="equity-report-subtitle">Enrollment by Subgroup (%)</h3>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in enrollmentBySubgroup" :key="index" class="row student-report progress-report">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart :chartPercentageParent="item.value" :chartColorParent="'blue'" />
                        </div>
                      </div>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in enrollmentByLevel" :key="index" class="row student-report progress-report">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart :chartPercentageParent="item.value" :chartColorParent="'blue'" />
                        </div>
                      </div>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in enrollmentByGender" :key="index" class="row student-report progress-report">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart :chartPercentageParent="item.value" :chartColorParent="'blue'" />
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <h3 class="equity-report-subtitle">Enrollment by Ethnicity/Race ( % )</h3>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in enrollmentByEthnicityRace" :key="index" class="row student-report progress-report">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart :chartPercentageParent="item.value" :chartColorParent="'blue'" />
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <h3 class="equity-report-subtitle">Enrollment by Grade (#)</h3>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in enrollmentByGrade" :key="index" class="row student-report progress-report half">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart :chartPercentageParent="item.value" :chartColorParent="'blue'" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <h2 class="equity-report-title-header">
                    ATTENDANCE
                    <i class="icon icon-information"></i>
                  </h2>
                  <div class="row">
                    <div class="col-12">
                      <h3 class="equity-report-subtitle">In-Seat Attendance Rate ( % )</h3>
                      <!-- Available Colors (red,blue,green) -->
                      <div v-for="(item, index) in inSeatAttendanceRate" :key="index" class="row student-report progress-report half">
                        <div class="col-3">
                          {{item.name}}
                        </div>
                        <div class="col-9 double-bar">
                          <DoubleBarChartTemplate :chartPercentageParentOne="item.value1" :chartPercentageParentTwo="item.value2" :chartColorParentOne="'blue'" :chartColorParentTwo="'red'" />
                        </div>
                      </div>
                      <div class="chart-legend">
                          <span class="blue">This School</span>
                          <span class="red">City Average</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-sm-12">
                  <h2 class="equity-report-title-header">
                    DISCIPLINE
                    <i class="icon icon-information"></i>
                  </h2>
                  <div class="row">
                    <div class="col-12 col-md-3">
                      <h3 class="equity-report-title">Total Suspensions (#)</h3>
                      <p>No Data Found !</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <h3 class="equity-report-title">Suspension Rate (%)</h3>
                      <p>No Data Found !</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <h3 class="equity-report-title">% suspended 1+ days</h3>
                      <p>No Data Found !</p>
                    </div>
                    <div class="col-12 col-md-3">
                      <h3 class="equity-report-title">% suspended 11+ days</h3>
                      <p>No Data Found !</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <h3 class="equity-report-title">Total Expulsion (#)</h3>
                      <p>No Data Found !</p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <h3 class="equity-report-title">Expulsion Rate (%)</h3>
                      <p>No Data Found !</p>
                    </div>
                  </div>
                  <div class="chart-legend">
                          <span class="blue">This School</span>
                          <span class="red">City Average</span>
                  </div>
                  <div class="chart-legend">
                          <span class="green">This School</span>
                          <span class="gray">City Average</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Main Content END -->
</template>


<script>
  import CurrentYearPmfChart from '../../../components/charts/CurrentYearPmfChart'
  import DoubleBarChartTemplate from '../../../components/charts/DoubleBarChartTemplate'

  import html2PDF from 'jspdf-html2canvas';

  export default {
    name: "equity-report",
    components: {
      CurrentYearPmfChart,
      DoubleBarChartTemplate,
      html2PDF
    },
    // DATA
    data: () => ({
      routeName:"",
      posts: [],
      value: 2021,
      downloadModeActive: "",
      enrollmentBySubgroup: [{
          name: "Economically Disadvanteged",
          value: "66.1"
        },
        {
          name: "English Language Learners",
          value: "54.4"
        }
      ],
      enrollmentByLevel: [{
          name: "Level 1",
          value: "0.7"
        },
        {
          name: "Level 2",
          value: "0.4"
        }
      ],
      enrollmentByGender: [{
          name: "Male",
          value: "52.3"
        },
        {
          name: "Female",
          value: "47.7"
        }
      ],
      enrollmentByEthnicityRace: [{
          name: "B",
          value: "17.4"
        },
        {
          name: "P",
          value: "15.2"
        },
        {
          name: "A",
          value: "16.3"
        },
        {
          name: "W",
          value: "14.5"
        },
        {
          name: "I",
          value: "16.3"
        },
        {
          name: "M",
          value: "20.2"
        }
      ],
      enrollmentByGrade: [{
          name: "PK3",
          value: "21"
        },
        {
          name: "PK4",
          value: "24"
        },
        {
          name: "KG",
          value: "22"
        },
        {
          name: "One",
          value: "26"
        },
        {
          name: "Two",
          value: "20"
        },
        {
          name: "Three",
          value: "29"
        },
        {
          name: "Four",
          value: "24"
        },
        {
          name: "Five",
          value: "24"
        },
        {
          name: "Six",
          value: "24"
        },
        {
          name: "Seven",
          value: "24"
        }
      ],
      inSeatAttendanceRate: [{
          name: "All Students",
          value1: "25.1",
          value2: "6"
        },
        {
          name: "Economically Disadvantaged",
          value1: "25.1",
          value2: "6"
        },
        {
          name: "English Language Learners",
          value1: "13.9",
          value2: "6"
        },
        {
          name: "Special Education",
          value1: "1.1",
          value2: "6"
        },
        {
          name: "Male",
          value1: "11.4",
          value2: "6"
        },
        {
          name: "Female",
          value1: "15.1",
          value2: "6"
        },
        {
          name: "Asian",
          value1: "4",
          value2: "6"
        },
        {
          name: "Black non-Hispanic",
          value1: "5.1",
          value2: "6"
        },
        {
          name: "Hispanic/Latino",
          value1: "0",
          value2: "6"
        },
        {
          name: "Multiracial",
          value1: "5.1",
          value2: "6"
        },
        {
          name: "Native American/Alaskan",
          value1: "3.1",
          value2: "6"
        },
        {
          name: "Pacific/Hawaiian",
          value1: "4",
          value2: "6"
        },
        {
          name: "White non-Hispanic",
          value1: "3.7",
          value2: "6"
        },
      ],
      yearsOptions: [{
          value: 2021,
          label: '2021'
        },
        {
          value: 2020,
          label: '2020'
        },
        {
          value: 2019,
          label: '2019'
        },
        {
          value: 2018,
          label: '2018'
        }
      ]
    }),
    methods: {
      updateReport(value){
          this.value = value;
      },
      downloadPDF() {
        // DOWNLOAD IN PROGRESS - mobile download fix CANVAS
        const scrWidth = window.innerWidth;
        if (scrWidth < 1200) {
          this.html2canvasWidth = 1000;
          this.downloadModeActive = "download-in-progress";
        } else {
          this.html2canvasWidth = 1440;
        }
        this.fileName = this.value + "_pmf_report.pdf"

        setTimeout(() => {
          html2PDF(this.$refs.contentPDF, {
            jsPDF: {
              format: 'a4',
            },
            imageType: 'image/jpeg',
            imageQuality: 1,
            html2canvas: {
              width: 1400
            },
            margin: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            },
            output: this.fileName
          });

          this.downloadModeActive = "";
        }, 1000);
      },
      loadMore() {
        this.routeName = this.$route.name.toLowerCase().replaceAll(/\s/g,'');
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
