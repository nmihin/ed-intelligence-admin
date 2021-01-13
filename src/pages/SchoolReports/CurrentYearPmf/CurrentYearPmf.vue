<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <div class="student-report-header">Student Progress</div>
          <div class="row">
            <el-table stripe ref="singleTable" :data="studentProgressData" highlight-current-row style="width: 100%">
              <el-table-column property="studentProgress" label="Student Progress"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="col-12">
          <div class="student-report-header">Student Achievements</div>
          <div class="row">
            <el-table stripe ref="singleTable" :data="studentAchievementsData" highlight-current-row style="width: 100%">
              <el-table-column property="studentAchievements" label="Student Achievements"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
              <el-table-column property="target" label="Target"></el-table-column>
              <el-table-column property="possible" label="Possible"></el-table-column>
              <el-table-column property="possiblePoints" label="Possible points"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="col-12">
          <div class="student-report-header">Gateway</div>
          <div class="row">
            <el-table stripe ref="singleTable" :data="gatewayData" highlight-current-row style="width: 100%">
              <el-table-column property="gateway" label="Gateway"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
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
              <el-table-column property="schoolEnvironment" label="School Environment"></el-table-column>
              <el-table-column property="rate" label="Rate"></el-table-column>
              <el-table-column property="floor" label="Floor"></el-table-column>
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
  export default {
    name: "current-year-pmf",
    components: {

    },
    // DATA
    data: () => ({
      studentProgressData: [{
          "studentProgress": "Growth on the state assessments in reading over time",
          "rate":53.0,
          "floor":30.0,
          "target":100.0,
          "possible":"5.8 out of 17.5",
          "possiblePoints":32.9

      }],
      studentAchievementsData: [],
      gatewayData: [],
      schoolEnvironmentData: [],
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
