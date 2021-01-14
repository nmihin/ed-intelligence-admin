<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <!-- LIST VIEW -->
      <div class="row student-report progress-report">
        <div class="col-12">
          <div class="student-report-header">Student Progress</div>
          <div class="row">
            <div class="report-table-header col-12">{{studentProgressData[0].report}}</div>
            <el-table stripe ref="singleTable" :data="studentProgressData[0].data" highlight-current-row style="width: 100%">
              <el-table-column property="studentProgress" width="200" label="Student Progress"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column width="200" property="chartData">
              <template v-slot="scope">
                <!-- Available Colors (red,blue,green) -->
                <CurrentYearPmfChart 
                  :chartPercentageParent="scope.row.chartData"
                  :chartColorParent="'red'"
                />
              </template>
              </el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="col-12">
          <div class="student-report-header">Student Achievements</div>
          <div class="row">
            <!-- DATASET 1 -->
            <div class="report-table-header col-12">{{studentAchievementsData[0].report}}</div>
            <el-table stripe ref="singleTable" :data="studentAchievementsData[0].data" highlight-current-row style="width: 100%">
              <el-table-column property="studentAchievements"  width="200" label="Student Achievements"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column width="200" property="chartData">
              <template v-slot="scope">
                <!-- Available Colors (red,blue,green) -->
                <CurrentYearPmfChart 
                  :chartPercentageParent="scope.row.chartData"
                  :chartColorParent="'blue'"
                />
              </template>
              </el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
            <!-- DATASET 2 -->
            <div class="report-table-header col-12">{{studentAchievementsData[1].report}}</div>
            <el-table stripe ref="singleTable" :data="studentAchievementsData[1].data" highlight-current-row style="width: 100%">
              <el-table-column property="studentAchievements" width="200" label="Student Achievements"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column width="200" property="chartData">
              <template v-slot="scope">
                <!-- Available Colors (red,blue,green) -->
                <CurrentYearPmfChart 
                  :chartPercentageParent="scope.row.chartData"
                  :chartColorParent="'blue'"
                />
              </template>
              </el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="col-12">
          <div class="student-report-header col-12">Gateway</div>
          <div class="row">
            <el-table stripe ref="singleTable" :data="gatewayData" highlight-current-row style="width: 100%">
              <el-table-column property="gateway" width="200" label="Gateway"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column width="200" property="chartData">
              <template v-slot="scope">
                <!-- Available Colors (red,blue,green) -->
                <CurrentYearPmfChart 
                  :chartPercentageParent="scope.row.chartData"
                  :chartColorParent="'blue'"
                />
              </template>
              </el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="col-12">
          <div class="student-report-header">School Environment</div>
          <div class="row">
            <el-table stripe ref="singleTable" :data="schoolEnvironmentData" highlight-current-row style="width: 100%">
              <el-table-column property="schoolEnvironment"  width="200" label="School Environment"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column width="200" property="chartData">
              <template v-slot="scope">
                <!-- Available Colors (red,blue,green) -->
                <CurrentYearPmfChart 
                  :chartPercentageParent="scope.row.chartData"
                  :chartColorParent="'red'"
                />
              </template>
              </el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
  <!-- Main Content END -->
</template>

<script>
  import CurrentYearPmfChart from './charts/CurrentYearPmfChart'

  export default {
    name: "current-year-pmf",
    components: {
      CurrentYearPmfChart
    },
    // DATA
    data: () => ({
      studentProgressData: [{
          "report": "3-8 Measures",
          "data": [{
              "studentProgress": "Growth on the state assessments in reading over time",
              "rate": 53.0,
              "floor": 30.0,
              "chartData": 25,
              "target": 100.0,
              "possible": "5.8 out of 17.5",
              "possiblePoints": 32.9
            },
            {
              "studentProgress": "Growth on the state assessments in reading over time",
              "rate": 42.5,
              "floor": 30.0,
              "chartData": 45,
              "target": 70.0,
              "possible": "5.5 out of 17.5",
              "possiblePoints": 31.2
            }
          ]
        }, ],
        studentAchievementsData: [{
            "report": "Grade 3-8 PARCC ELA",
            "data": [{
                "studentAchievements": "Level 3+",
                "rate": 68.0,
                "floor": 0.0,
                "chartData": 15,
                "target": 100.0,
                "possible": "5.1 out of 7.5",
                "possiblePoints": 68.0
              },
              {
                "studentAchievements": "Level 4+",
                "rate": 57.0,
                "floor": 0.0,
                "chartData": 65,
                "target": 70.0,
                "possible": "4.1 out of 7.5",
                "possiblePoints": 81.6
              }
            ]
          },
          {
            "report": "Grade 3-8 PARCC Mathematics",
            "data": [{
                "studentAchievements": "Level 3+",
                "rate": 68.0,
                "floor": 0.0,
                "chartData": 36,
                "target": 100.0,
                "possible": "5.1 out of 7.5",
                "possiblePoints": 68.0
              },
              {
                "studentAchievements": "Level 4+",
                "rate": 57.0,
                "floor": 0.0,
                "chartData": 5,
                "target": 70.0,
                "possible": "4.1 out of 7.5",
                "possiblePoints": 81.6
              }
            ]
          }
        ],
        gatewayData: [{
            "gateway": "3rd Grade Reading - College and Career Ready (2 year cohort)",
            "rate": 0.0,
            "floor": 50.0,
            "chartData": 25,
            "target": 100.0,
            "possible": "5.1 out of 7.5",
            "possiblePoints": 68.0
          },
          {
            "gateway": "8th Grade mathematics - College and Career Ready (2 year cohort)",
            "rate": 57.0,
            "floor": 0.0,
            "chartData": 55,
            "target": 70.0,
            "possible": "4.1 out of 7.5",
            "possiblePoints": 81.6
          }
        ],
        schoolEnvironmentData: [{
            "schoolEnvironment": "In Seat Attendance Rate",
            "rate": 0.0,
            "floor": 50.0,
            "chartData": 25,
            "target": 100.0,
            "possible": "5.1 out of 7.5",
            "possiblePoints": 68.0
          },
          {
            "schoolEnvironment": "Re-Enrollment Rate",
            "rate": 57.0,
            "floor": 0.0,
            "chartData": 75,
            "target": 70.0,
            "possible": "4.1 out of 7.5",
            "possiblePoints": 81.6
          },
          {
            "schoolEnvironment": "CLASS: Emotional Support",
            "rate": 0.0,
            "floor": 50.0,
            "chartData": 25,
            "target": 100.0,
            "possible": "5.1 out of 7.5",
            "possiblePoints": 68.0
          },
          {
            "schoolEnvironment": "CLASS: Classroom Management",
            "rate": 57.0,
            "floor": 0.0,
            "chartData": 15,
            "target": 70.0,
            "possible": "4.1 out of 7.5",
            "possiblePoints": 81.6
          },
          {
            "schoolEnvironment": "CLASS: Instructional Support",
            "rate": 57.0,
            "floor": 0.0,
            "chartData": 75,
            "target": 70.0,
            "possible": "4.1 out of 7.5",
            "possiblePoints": 81.6
          }
        ],
      busy: false
    }),
    methods: {
      loadMore() {
        this.busy = true;

        this.busy = false;
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
