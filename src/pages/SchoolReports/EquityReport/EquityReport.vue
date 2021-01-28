<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
          <div class="col-6">
            <div class="years-select">
                <el-select @change="updateReport(value)" v-model="value" placeholder="Years">
                    <el-option v-for="item in yearsOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <span class="records">Years</span>
            </div>
          </div>
          <div class="col-6">
            <div class="element right">
              <el-tooltip class="item" effect="dark" content="Print Table" placement="top">
                  <span class="icon icon-download-pdf-document" @click="print">
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                    <span class="path4"></span>
                    <span class="path5"></span>
                    <span class="path6"></span>
                  </span>
              </el-tooltip>
            </div>
          </div>
      </div>
      <!-- LIST VIEW -->
      <div class="row">
        <div class="card-boxes">
            <div class="card-box">
                <div class="card-content equity-report">
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
                        <div class="col-12 col-sm-6"> 
                            <h2 class="equity-report-title-header">
                                STUDENT CHARACTERISTICS
                                <span class="icon-information"></span>
                            </h2>
                            <h3 class="equity-report-subtitle">Total Enrollment (#) - 260</h3>
                            <div class="row">
                                <div class="col-6">
                                    <h3 class="equity-report-subtitle">Enrollment by Subgroup (%)</h3>
                                    <p>CHART DATA</p>
                                </div>
                                <div class="col-6">
                                    <h3 class="equity-report-subtitle">Enrollment by Ethnicity/Race ( % )</h3>
                                    <p>CHART DATA</p>
                                </div>
                                <div class="col-6">
                                    <h3 class="equity-report-subtitle">Enrollment by Gender ( % )</h3>
                                    <p>CHART DATA</p>
                                </div>
                                <div class="col-6">
                                    <h3 class="equity-report-subtitle">Enrollment by Level ( % )</h3>
                                    <p>CHART DATA</p>
                                </div>
                                <div class="col-6">
                                    <h3 class="equity-report-subtitle">Enrollment by Grade (#)</h3>
                                    <p>CHART DATA</p>
                                </div>
                                <div class="col-6">
                                    <p>CHART DATA</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-sm-6"> 
                            <h2 class="equity-report-title-header">
                                ATTENDANCE
                                <span class="icon-information"></span>
                            </h2>
                            <h3 class="equity-report-title">In-Seat Attendance Rate ( % )</h3>
                            <p>CHART DATA</p>
                        </div>
                        <div class="col-12 col-sm-12"> 
                            <h2 class="equity-report-title-header">
                                DISCIPLINE
                                <span class="icon-information"></span>
                            </h2>
                            <div class="row">
                                <div class="col-3"> 
                                    <h3 class="equity-report-title">Total Suspensions (#)</h3>
                                </div>
                                <div class="col-3"> 
                                    <h3 class="equity-report-title">Suspension Rate (%)</h3>
                                </div>
                                <div class="col-3"> 
                                    <h3 class="equity-report-title">% suspended 1+ days</h3>
                                </div>
                                <div class="col-3"> 
                                    <h3 class="equity-report-title">% suspended 11+ days</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="equity-report-title">Total Expulsion (#)</h3>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="equity-report-title">Expulsion Rate (%)</h3>
                                </div>
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

  export default {
    name: "equity-report",
    components: {

    },
    // DATA
    data: () => ({
      posts: [],
       value: 2021,
       yearsOptions: [
        {
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
        }]
    }),
    methods: {
      loadMore() {
      
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>