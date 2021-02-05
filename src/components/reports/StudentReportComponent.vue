<template>
  <div class="row student-report progress-report">
    <div v-if="studentProgressPoints" class="col-12">
      <div class="student-report-header">Student Progress ({{studentProgressPoints}} points)</div>
      <div class="row table-row" v-for="(posts, idx) in studentProgressData" :key="idx">
        <div class="report-table-header">{{posts[0].subCategory}}</div>
        <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
          <el-table-column property="description" width="200" label="Student Progress"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="possiblePointpercent">
            <template v-slot="scope">
              <!-- Available Colors (red,blue,green) -->
              <CurrentYearPmfChart 
              :chartLinkParent="scope.row.detailLink"
              :chartBarTypeParent="'percentage'"
              :chartPercentageParent="scope.row.possiblePointpercent" 
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column min-width="50" property="target" label="Target"></el-table-column>
          <el-table-column min-width="120" label="Possible">
            <template v-slot="scope">{{scope.row.possiblePointObtain}} out of {{scope.row.possiblePointTotal}}</template>
          </el-table-column>
          <el-table-column min-width="80" property="possiblePointTotal" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePointpercent}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="studentAchievementsPoints" class="col-12">
      <div class="student-report-header">Student Achievements ({{studentAchievementsPoints}} points)</div>
      <div class="row table-row" v-for="(posts, idx) in studentAchievementsData" :key="idx">
        <div class="report-table-header">{{posts[0].subCategory}}</div>
        <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
          <el-table-column property="description" width="200" label="Student Achievements"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="possiblePointpercent">
            <template v-slot="scope">
              <CurrentYearPmfChart
              :chartLinkParent="scope.row.detailLink"
              :chartBarTypeParent="'percentage'"
              :chartPercentageParent="scope.row.possiblePointpercent" 
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column min-width="50" property="target" label="Target"></el-table-column>
          <el-table-column min-width="120" label="Possible">
            <template v-slot="scope">{{scope.row.possiblePointObtain}} out of {{scope.row.possiblePointTotal}}</template>
          </el-table-column>
          <el-table-column min-width="80" property="possiblePointTotal" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePointpercent}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="gatewayPoints" class="col-12">
      <div class="student-report-header col-12">Gateway ({{gatewayPoints}} points)</div>
      <div class="row table-row" v-for="(posts, idx) in gatewayData" :key="idx">
        <div class="report-table-header">{{posts[0].subCategory}}</div>
        <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
          <el-table-column property="description" width="200" label="Gateway"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="possiblePointpercent">
            <template v-slot="scope">
              <!-- Available Colors (red,blue,green) -->
              <CurrentYearPmfChart 
              :chartLinkParent="scope.row.detailLink"
              :chartBarTypeParent="'percentage'" 
              :chartPercentageParent="scope.row.possiblePointpercent" 
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column min-width="50" property="target" label="Target"></el-table-column>
          <el-table-column min-width="120" label="Possible">
            <template v-slot="scope">{{scope.row.possiblePointObtain}} out of {{scope.row.possiblePointTotal}}</template>
          </el-table-column>
          <el-table-column min-width="80" property="possiblePointTotal" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePointpercent}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="schoolEnvironmentPoints" class="col-12">
      <div class="student-report-header">School Environment ({{schoolEnvironmentPoints}} points)</div>
      <div class="row table-row" v-for="(posts, idx) in schoolEnvironmentData" :key="idx">
        <div class="report-table-header">{{posts[0].subCategory}}</div>
        <el-table stripe ref="singleTable" :data="posts" highlight-current-row style="width: 100%">
          <el-table-column property="description" width="200" label="School Environment"></el-table-column>
          <el-table-column property="rate" label="Rate"></el-table-column>
          <el-table-column property="floor" label="Floor"></el-table-column>
          <el-table-column width="200" property="possiblePointpercent">
            <template v-slot="scope">
              <!-- Available Colors (red,blue,green) -->
              <CurrentYearPmfChart 
              :chartLinkParent="scope.row.detailLink"
              :chartBarTypeParent="'percentage'" 
              :chartPercentageParent="scope.row.possiblePointpercent" 
              :chartColorParent="'red'" />
            </template>
          </el-table-column>
          <el-table-column min-width="50" property="target" label="Target"></el-table-column>
          <el-table-column min-width="120" label="Possible">
            <template v-slot="scope">{{scope.row.possiblePointObtain}} out of {{scope.row.possiblePointTotal}}</template>
          </el-table-column>
          <el-table-column min-width="80" property="possiblePointTotal" label="Possible points">
            <template v-slot="scope">{{scope.row.possiblePointpercent}}%</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div v-if="studentProgressPoints" class="col-12">
      <div class="student-report-footer right">TOTAL SCORE {{possiblePointObtain}} out of {{possiblePointTotal}} {{possiblePointpercent}}%</div>
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
        studentProgressData : [],
        studentAchievementsData:[],
        gatewayData:[],
        schoolEnvironmentData: [],
        studentProgressPoints:0,
        studentAchievementsPoints:0,
        gatewayPoints:0,
        schoolEnvironmentPoints:0,
        possiblePointObtain:0,
        possiblePointTotal:0,
        possiblePointpercent:0
    }),
    props: {
        studentDataParent:Object
    },
    watch: {
       studentDataParent: function(){
            this.loadMore(this.studentDataParent);
       }
    },
    methods: {
        arrayToObjectConversion(obj){
          // OBJECT TO ARRAY
            const arr = [];
            let studentData = obj;
            delete studentData.points;
            studentData = Object.entries(studentData)

          // ADD SUBCATEGORY PROPERTY
          studentData.forEach((element) => {
            if(!element[1].subCategory)
                element[1].subCategory = "";
          });

          studentData.forEach((element) => {
                arr.push(element[1])
          });

          // ARRAY GROUP BY SUBCATEGORY
          const groupBy = (items, key) => items.reduce(
                  (result, item) => ({
                    ...result,
                    [item[key]]: [
                      ...(result[item[key]] || []),
                      item,
                    ],
                  }), 
                  {}
          )
          
          const groupBySubCategory = groupBy(arr,"subCategory");

          return groupBySubCategory;
        },
        loadMore(data){
                if(typeof data !=="undefined"){
                  
                  this.possiblePointObtain = data.totalScore.possiblePointObtain;
                  this.possiblePointTotal = data.totalScore.possiblePointTotal;
                  this.possiblePointpercent = data.totalScore.possiblePointpercent;

                  // STUDENT PROGRESS
                  this.studentProgressPoints = data.studentProgress.points;
                  this.studentProgressData = this.arrayToObjectConversion(data.studentProgress);             
                  // STUDENT ACHIEVEMENT
                  this.studentAchievementsPoints = data.studentAchievment.points;
                  this.studentAchievementsData = this.arrayToObjectConversion(data.studentAchievment);
                  // STUDENT GATEWAY
                  this.gatewayPoints = data.gateway.points;
                  this.gatewayData = this.arrayToObjectConversion(data.gateway);
                  // STUDENT SCHOOL ENVIRONMENT
                  this.schoolEnvironmentPoints = data.schoolEnviroment.points;
                  this.schoolEnvironmentData = this.arrayToObjectConversion(data.schoolEnviroment);

                }
        }
    },
    created() {
      this.loadMore();
    }
  }

</script>