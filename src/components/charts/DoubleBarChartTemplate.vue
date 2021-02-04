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
    <div class="charts double">
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <li class="chart__bar strong" :class="colorOne" :style="{'width':percentageOne+'%'}">
            <span class="chart__label">
              {{percentageOne}}%
            </span>
          </li>
        </ul>
      </div>
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <li class="chart__bar" :class="colorTwo" :style="{'width':percentageTwo+'%'}">
            <span class="chart__label">
              {{percentageTwo}}%
            </span>
          </li>
        </ul>
      </div>
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
    }),
    props: {
      chartPercentageParentOne: String,
      chartPercentageParentTwo: String,
      chartColorParentOne: String,
      chartColorParentTwo: String
    },
    watch: {
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
      }
    },
    methods: {
      loadMore() {
        this.percentageOne = this.chartPercentageParentOne;
        this.percentageTwo = this.chartPercentageParentTwo;
        this.colorOne = this.chartColorParentOne;
        this.colorTwo = this.chartColorParentTwo;
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
