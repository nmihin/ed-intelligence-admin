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

    <div class="charts">
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <li class="chart__bar" :class="color" :style="{'width':percentage+'%'}">
            <span class="chart__label">
                {{percentage}}%
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "current-year-pmf",
    components: {},
    // DATA
    data: () => ({
        percentage:0,
    }),
    props: {
        chartPercentageParent:Number,
        chartColorParent:String
    },
    methods: {
        loadMore(){
            this.percentage = this.chartPercentageParent;
            this.color = this.chartColorParent;
        }
    },
    created() {
      this.loadMore();
    }
  }

</script>
