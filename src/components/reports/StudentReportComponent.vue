<template>
  <div class="row student-report progress-report">
    <div class="col-12" v-if="studentProgressData.length !== 0">
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
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column property="target" label="Target"></el-table-column>
          <el-table-column property="possible" label="Possible"></el-table-column>
          <el-table-column property="possiblePoints" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePoints}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="col-12" v-if="studentAchievementsData.length !== 0">
      <div class="student-report-header">Student Achievements</div>
      <div class="row">
        <!-- DATASET 1 -->
        <div class="report-table-header col-12">{{studentAchievementsData[0].report}}</div>
        <el-table stripe ref="singleTable" :data="studentAchievementsData[0].data" highlight-current-row style="width: 100%">
          <el-table-column property="studentAchievements" width="200" label="Student Achievements"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="chartData">
            <template v-slot="scope">
              <!-- Available Colors (red,blue,green) -->
              <CurrentYearPmfChart 
              :chartPercentageParent="scope.row.chartData" 
              :chartColorParent="'blue'" />
            </template>
          </el-table-column>
          <el-table-column property="target" label="Target"></el-table-column>
          <el-table-column property="possible" label="Possible"></el-table-column>
          <el-table-column property="possiblePoints" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePoints}}%</template>
          </el-table-column>
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
              :chartColorParent="'blue'" />
            </template>
          </el-table-column>
          <el-table-column property="target" label="Target"></el-table-column>
          <el-table-column property="possible" label="Possible"></el-table-column>
          <el-table-column property="possiblePoints" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePoints}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="col-12" v-if="gatewayData.length !== 0">
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
              :chartColorParent="'blue'" />
            </template>
          </el-table-column>
          <el-table-column property="target" label="Target"></el-table-column>
          <el-table-column property="possible" label="Possible"></el-table-column>
          <el-table-column property="possiblePoints" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePoints}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="col-12" v-if="schoolEnvironmentData.length !== 0">
      <div class="student-report-header">School Environment</div>
      <div class="row">
        <el-table stripe ref="singleTable" :data="schoolEnvironmentData" highlight-current-row style="width: 100%">
          <el-table-column property="schoolEnvironment" width="200" label="School Environment"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="chartData">
            <template v-slot="scope">
              <!-- Available Colors (red,blue,green) -->
              <CurrentYearPmfChart 
              :chartPercentageParent="scope.row.chartData" 
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column property="target" label="Target"></el-table-column>
          <el-table-column property="possible" label="Possible"></el-table-column>
          <el-table-column property="possiblePoints" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePoints}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import CurrentYearPmfChart from '../charts/CurrentYearPmfChart'

  export default {
    name: "current-year-pmf-report",
    components: {
        CurrentYearPmfChart
    },
    // DATA
    data: () => ({
        percentage:0,
        studentProgressData:[],
        studentAchievementsData:[],
        gatewayData:[],
        schoolEnvironmentData: []
    }),
    props: {
        studentProgressDataParent:Array,
        studentAchievementsDataParent:Array,
        gatewayDataParent:Array,
        schoolEnvironmentDataParent:Array,
    },
    watch: {
       studentProgressDataParent: function(){
            this.studentProgressData = this.studentProgressDataParent;
       },
       studentAchievementsDataParent: function(){
            this.studentAchievementsData = this.studentAchievementsDataParent;
       },
       gatewayDataParent: function(){
            this.gatewayData = this.gatewayDataParent;
       },
       schoolEnvironmentDataParent: function(){
            this.schoolEnvironmentData = this.schoolEnvironmentDataParent;
       }
    },
    methods: {
        loadMore(){
            this.studentProgressData = this.studentProgressDataParent;
            this.studentAchievementsData = this.studentAchievementsDataParent;
            this.gatewayData = this.gatewayDataParent;
            this.schoolEnvironmentData = this.schoolEnvironmentDataParent;
        }
    },
    created() {
      this.loadMore();
    }
  }

</script>