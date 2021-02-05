<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div v-if="!busy" class="container-fluid">
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
                  <h3 class="equity-report-subtitle">{{schoolInformation.title}}</h3>
                </div>
                <div class="col-12 col-sm-6">
                  <p>
                    <strong>What is an Equity Report?</strong> {{schoolInformation.description}}
                  </p>
                </div>
                <div class="col-12 col-sm-6">
                  <h2 class="equity-report-title-header">{{schoolInformation.characteristic.description}}</h2>
                  <div class="equity-information">
                    <ul>
                      <li>Grades: <span>{{schoolInformation.characteristic.data.gardes}}</span></li>
                      <li>Ward: <span>{{schoolInformation.characteristic.data.ward}}</span></li>
                      <li>Address: <span>{{schoolInformation.characteristic.data.address}}</span></li>
                      <li>Contact: <span>{{schoolInformation.characteristic.data.contact}}</span></li>
                    </ul>
                  </div>
                </div>
                <div class="col-12">
                  <h2 class="equity-report-title-header">
                    STUDENT CHARACTERISTICS
                    <el-popover placement="top-start" title="About Student Characteristics" width="600" trigger="hover" content="Every fall, OSSE counts the number of students present in every public and public charter school. This enrollment audit provides us with a snapshot of the student body, including the total number of students enrolled and their characteristics. The enrollment characteristics – race/ethnicity, gender, Special Education, English Learner (EL), and economically disadvantaged – were identified as of particular importance when considering issues of equity, and they will appear throughout this report. This school’s total enrollment was identified using the October 5, 2016 audited enrollment data file. For both DCPS and public charter schools, enrollment is determined using the audited enrollment population and subgroup identification is based on the Demographic Certification file that schools cerified at the end of SY2016-17. For the economically disadvantaged, EL, and special education subgroups, students are identified based on their highest level of need at any time during the school year, not just at the time of the annual audit. Additionally, for both the special education and the EL subgroups, students must be between the ages of 3 and 21 to be considered in the subgroup. The subgroup “economically disadvantaged” does not apply for students attending adult programs because adult programs are not eligible for the Free and Reduced-Price Meal (FARM) program (a key component of the subgroup) and there is no other comparable data collected for adult programs.">
                      <i slot="reference" class="icon icon-information"></i>
                    </el-popover>
                  </h2>
                  <h3 class="equity-report-subtitle">Total Enrollment (#) - {{enrollmentBySubgroupNumber}}</h3>
                  <div class="row">
                    <div class="col-12 col-md-6">
                      <h3 class="equity-report-subtitle">{{enrollmentBySubgroup.description}}</h3>
                       <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in enrollmentBySubgroup.a.data" :key="index" class="row student-report progress-report">
                        <div class="col-3 description">
                          {{item.description}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart 
                          :chartLinkParent="item.detailLink"
                          :chartPercentageParent="item.percent" 
                          :chartColorParent="'blue'" 
                          :chartBarTypeParent="'percentage'"  
                          />
                        </div>
                      </div>
                      <h4 class="equity-report-subtitle-sub">{{enrollmentBySubgroup.b.description}}</h4>
                      <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in enrollmentBySubgroup.b.data" :key="index" class="row student-report progress-report">
                        <div class="col-3 description">
                          {{item.description}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart 
                          :chartLinkParent="item.detailLink"
                          :chartPercentageParent="item.percent" 
                          :chartColorParent="'blue'" 
                          :chartBarTypeParent="'percentage'"  
                          />
                        </div>
                      </div>
                      <h4 class="equity-report-subtitle-sub">{{enrollmentBySubgroup.c.description}}</h4>
                      <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in enrollmentBySubgroup.c.data" :key="index" class="row student-report progress-report">
                        <div class="col-3 description">
                          {{item.description}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart 
                          :chartLinkParent="item.detailLink"
                          :chartPercentageParent="item.percent" 
                          :chartColorParent="'blue'" 
                          :chartBarTypeParent="'percentage'"  
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-6">
                      <h3 class="equity-report-subtitle">{{enrollmentByEthnicityRace.description}}</h3>
                       <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in enrollmentByEthnicityRace.data" :key="index" class="row student-report progress-report">
                        <div class="col-3 description">
                          {{item.description}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart 
                          :chartLinkParent="item.detailLink"
                          :chartPercentageParent="item.percent" 
                          :chartColorParent="'blue'" 
                          :chartBarTypeParent="'percentage'" 
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <h3 class="equity-report-subtitle">{{enrollmentByGrade.description}}</h3>
                       <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in enrollmentByGrade.data" :key="index" class="row student-report progress-report half">
                        <div class="col-3 description">
                          {{item.description}}
                        </div>
                        <div class="col-9">
                          <CurrentYearPmfChart 
                          :chartLinkParent="item.detailLink"
                          :chartPercentageParent="item.student" 
                          :chartColorParent="'blue'" 
                          :chartBarTypeParent="'integer'" 
                          />
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
                      <h3 class="equity-report-subtitle">{{inSeatAttendanceDescriptions.description}}</h3>
                      <!-- Available Colors (red,blue,green,gray,dark) -->
                      <div v-for="(item, index) in inSeatAttendanceRate" :key="index" class="row student-report progress-report half">
                        <div class="col-3 description">
                          {{item.name}}
                        </div>
                        <div class="col-9 double-bar">
                          <DoubleBarChartTemplate 
                          :chartBarTypeParent="'percentage'"
                          :chartBarLinkOneParent="item.link1"
                          :chartBarLinkTwoParent="item.link2"
                          :chartPercentageParentOne="item.value1" 
                          :chartPercentageParentTwo="item.value2" 
                          :chartColorParentOne="'blue'" 
                          :chartColorParentTwo="'gray'" />
                        </div>
                      </div>
                      <div class="chart-legend">
                        <span class="gray">{{inSeatAttendanceDescriptions.data.b.description}}</span>
                        <span class="blue">{{inSeatAttendanceDescriptions.data.a.description}}</span>
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
                      <h3 class="equity-report-subtitle">
                        {{totalSuspensions.description}}
                        <span class="equity-report-this-school-text">This School<b>{{totalSuspensions.data}}</b></span>
                      </h3>
                      <h3 class="equity-report-subtitle">
                        {{totalExpulsions.description}}
                        <span class="equity-report-this-school-text">This School<b>{{totalExpulsions.data}}</b></span>
                      </h3>
                      <h3 class="equity-report-subtitle">
                        {{expulsionRate.description}}
                        <span class="equity-report-this-school-text">This School<b>{{expulsionRate.data.a.data[0]}}</b></span>
                        <span class="equity-report-city-text">City Average<b>{{expulsionRate.data.b.data[0]}}</b></span>
                      </h3>
                      <q class="equity-report-quote">
                        * The City Averages displayed on this page only include the average of those grades served by this school in school year 2016-17.
                      </q>
                    </div>
                    <div class="col-12 col-md-9">
                      <h3 class="equity-report-subtitle">{{suspensionRate.description}}</h3>
                      <div class="row">
                        <div class="col-4 offset-4">
                          <h3 class="suspension-title">{{suspensionRateOne}}</h3>
                        </div>
                        <div class="col-4">
                          <h3 class="suspension-title">{{suspensionRateTwo}}</h3>
                        </div>
                      </div>
                      <ul class="student-report progress-report">                       
                        <li v-for="(item, index) in suspensionRateDisciplineArr" :key="index" class="row equity-report-discipline">
                          <span class="col-4 equity-report-name">
                            {{item.name}}  
                          </span>
                          <span class="col-4 double-bar">
                             <!-- Available Colors (red,blue,green,gray,dark) -->
                             <DoubleBarChartTemplate
                             :chartBarTypeParent="'percentage'"
                             :chartStudentNumberParent="item.number"
                             :chartPercentageParentOne="item.suspendedOnePlusThisSchool" 
                             :chartPercentageParentTwo="item.suspendedOnePlusCityAverage" 
                             :chartColorParentOne="'blue'" 
                             :chartColorParentTwo="'gray'" />
                          </span>
                          <span class="col-4 double-bar">
                              <!-- Available Colors (red,blue,green,gray,dark) -->
                             <DoubleBarChartTemplate 
                             :chartBarTypeParent="'percentage'"
                             :chartStudentNumberParent="item.number"
                             :chartPercentageParentOne="item.suspendedElevenPlusThisSchool" 
                             :chartPercentageParentTwo="item.suspendedElevenPlusCityAverage" 
                             :chartColorParentOne="'lavender'" 
                             :chartColorParentTwo="'gray'" />
                          </span>

                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="chart-legend">
                    <span class="gray">City Average</span>
                    <span class="blue">This School</span>
                  </div>
                  <div class="chart-legend">
                    <span class="gray">City Average</span>
                    <span class="lavender">This School</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="busy" class="preloader">
        <span><img src="../../../assets/images/preloader.gif" /> Loading...</span>
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
      busy: false,
      routeName: "",
      value: 2021,
      downloadModeActive: "",
      suspensionRateOne:"",
      suspensionRateTwo:"",
      totalSuspensions:[],
      totalExpulsions:[],
      expulsionRate:[],
      suspensionRate:[],
      inSeatAttendanceRate: [],
      suspensionRateDiscipline: [],
      suspensionRateDisciplineArr: [],
      schoolInformation: [],
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
      ],
      enrollmentBySubgroup: [],
      enrollmentBySubgroupNumber: []
    }),
    methods: {
      updateReport(value) {
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
      doubleBarChartConvertData(dataSetA,dataSetB,arr){
            Object.values(dataSetA).forEach((element,index) => {
              arr[index] = {
                  name: element.description,
                  value1: element.percent,
                  link1: element.detailLink
              }
            });
            Object.values(dataSetB).forEach((element,index) => {
              arr[index].value2 = element.percent,
              arr[index].link2 = element.detailLink           
            });

            return arr;
      },
      doubleBarChartConvertDataSuspention(dataSetA,dataSetB,arr){
            Object.values(dataSetA[0]).forEach((element,index) => {
              arr[index] = {
                  name: element.description,
                  suspendedOnePlusThisSchool: element.percent.toString()
              }
            });

            Object.values(dataSetA[1]).forEach((element,index) => {
              arr[index].suspendedElevenPlusThisSchool = element.percent.toString();
            });

            Object.values(dataSetB[0]).forEach((element,index) => {
              arr[index].suspendedOnePlusCityAverage = element.percent.toString();
              arr[index].number = element.number.toString();
            });

            Object.values(dataSetB[1]).forEach((element,index) => {
              arr[index].suspendedElevenPlusCityAverage = element.percent.toString();
            });

            return arr;
      },
      loadMore() {
        this.routeName = this.$route.name.toLowerCase().replaceAll(/\s/g, '');

        this.busy = true;

        //this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/equity-report-api.json").then((response) => {  
        this.axios.get("https://devapp.iteg.com.np/api/v1/equity_report").then((response) => {  
            
            // SCHOOL INFORMATION
            this.schoolInformation = response.data.schoolInformation;

            // ENROLMENT BY SUBGROUP
            this.enrollmentBySubgroup = response.data.studentCharastics.enrollment.subgroup;
            this.enrollmentBySubgroupNumber = response.data.studentCharastics.enrollment.totalStudent;
            // ENROLMENT BY ETHNICITY/RACE
            this.enrollmentByEthnicityRace = response.data.studentCharastics.enrollment.ethnicity;
            // ENROLMENT BY GRADE
            this.enrollmentByGrade = response.data.studentCharastics.enrollment.grade;
            
            // ATTENDANCE
            const studentAttendanceA = response.data.studentAttendance.data.a.data;
            const studentAttendanceB = response.data.studentAttendance.data.b.data;
            this.doubleBarChartConvertData(studentAttendanceA,studentAttendanceB,this.inSeatAttendanceRate);
            this.inSeatAttendanceDescriptions = response.data.studentAttendance;

            // DISCIPLINE
            this.totalSuspensions = response.data.studentDiscipline.a;
            this.totalExpulsions = response.data.studentDiscipline.b;
            this.expulsionRate = response.data.studentDiscipline.c;
            this.suspensionRate = response.data.studentDiscipline.d;
            this.suspensionRateOne = response.data.studentDiscipline.d.data.a.description;
            this.suspensionRateTwo = response.data.studentDiscipline.d.data.b.description;

            const studentDisciplineThisSchool = [
              response.data.studentDiscipline.d.data.a.data.a.data,
              response.data.studentDiscipline.d.data.b.data.a.data
            ]
            const studentDisciplineCityAverage = [
              response.data.studentDiscipline.d.data.a.data.b.data,
              response.data.studentDiscipline.d.data.b.data.b.data
            ]

            this.doubleBarChartConvertDataSuspention(studentDisciplineThisSchool,studentDisciplineCityAverage,this.suspensionRateDisciplineArr)

            console.log(JSON.parse(JSON.stringify(this.expulsionRate.data)))

            this.busy = false;
        }).catch((error) => error.response.data)

      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
