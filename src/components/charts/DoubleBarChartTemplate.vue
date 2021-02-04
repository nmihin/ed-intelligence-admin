<template>
  <div class="skills">
    <ul class="lines">
      <li class="line l--0">
        <span class="line__label">
          0%
        </span>
      </li>
      <li class="line l--25">
        <span class="line__label">
          25%
        </span>
      </li>
      <li class="line l--50">
        <span class="line__label">
          50%
        </span>
      </li>
      <li class="line l--75">
        <span class="line__label">
          75%
        </span>
      </li>
      <li class="line l--100">
        <span class="line__label">
          100%
        </span>
      </li>
    </ul>
    <div v-if="number >= 10 || typeof number === 'undefined'" class="charts double">
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <router-link v-if="linkOne !=='empty'" :to="linkOne">
            <li class="chart__bar strong" :class="colorOne" :style="{'width':percentageOne+'%'}">
              <span class="chart__label">
                {{percentageOne}}%
              </span>
            </li>
          </router-link>
          <li v-if="linkTwo ==='empty'" class="chart__bar strong" :class="colorOne" :style="{'width':percentageOne+'%'}">
              <span class="chart__label">
                {{percentageOne}}%
              </span>
          </li>
        </ul>
      </div>
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <router-link v-if="linkTwo !=='empty'" :to="linkTwo">
            <li class="chart__bar" :class="colorTwo" :style="{'width':percentageTwo+'%'}">
            <span class="chart__label">
              {{percentageTwo}}%
            </span>
            </li>
          </router-link>
          <li v-if="linkTwo ==='empty'" class="chart__bar" :class="colorTwo" :style="{'width':percentageTwo+'%'}">
            <span class="chart__label">
              {{percentageTwo}}%
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="number > 0 && number < 10" class="charts double">
      <h3 class="charts-empty">n < 10</h3>
    </div>
    <div v-if="number == 0" class="charts double">
      <h3 class="charts-empty">No students</h3>
    </div>
  </div>
</template>

<script>
  export default {
    name: "current-year-pmf-chart",
    components: {},
    // DATA
    data: () => ({
      percentageOne: 0,
      percentageTwo: 0,
      numberOne:0,
      numberTwo:0,
      linkOne:'empty',
      linkTwo:'empty'
    }),
    props: {
      chartPercentageParentOne: String,
      chartPercentageParentTwo: String,
      chartColorParentOne: String,
      chartColorParentTwo: String,
      chartBarTypeParent:String,
      chartStudentNumberParent:String,
      chartBarLinkOneParent:String,
      chartBarLinkTwoParent:String
    },
    watch: {
      chartBarLinkOneParent: function() {
        this.number = this.chartBarLinkOneParent;
      },
      chartBarLinkTwoParent: function() {
        this.chartPercentageOne = this.chartBarLinkTwoParent;
      },
      chartStudentNumberParent: function() {
        this.number = this.chartStudentNumberParent;
      },
      chartPercentageParentOne: function() {
        this.chartPercentageOne = this.chartPercentageParentOne;
      },
      chartPercentageParentTwo: function() {
        this.chartPercentageTwo = this.chartPercentageParentTwo;
      },
      chartColorParentOne: function() {
        this.chartColorOne = this.chartColorParentOne;
      },
      chartColorParentTwo: function() {
        this.chartColorTwo = this.chartColorParentOne;
      },
      chartBarTypeParent: function(){
            this.chartBarType = this.chartBarTypeParent;
      }
    },
    methods: {
      loadMore() {
        this.type = this.chartBarTypeParent;
        this.number = this.chartStudentNumberParent;

        if(typeof this.chartBarLinkOneParent !== 'undefined')
          this.linkOne = this.chartBarLinkOneParent;

        if(typeof this.chartBarLinkTwoParent !== 'undefined')
          this.linkTwo = this.chartBarLinkTwoParent;

        if(this.type ==='percentage'){
          this.percentageOne = parseFloat(this.chartPercentageParentOne).toFixed(1);
          this.percentageTwo = parseFloat(this.chartPercentageParentTwo).toFixed(1);
        }
        if(this.type ==='integer'){
          this.percentageOne = parseInt(this.chartPercentageParentOne);
          this.percentageTwo = parseInt(this.chartPercentageParentTwo);         
        }

        this.colorOne = this.chartColorParentOne;
        this.colorTwo = this.chartColorParentTwo;
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
