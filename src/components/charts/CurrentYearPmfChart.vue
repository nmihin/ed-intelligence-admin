<template>
  <div class="skills" :class="type">
    <ul class="lines">
      <li class="line l--0">
        <span v-if="type ==='percentage'" class="line__label">
          0%
        </span>
      </li>
      <li class="line l--25">
        <span v-if="type ==='percentage'" class="line__label">
          25%
        </span>
      </li>
      <li class="line l--50">
        <span v-if="type ==='percentage'" class="line__label">
          50%
        </span>
      </li>
      <li class="line l--75">
        <span v-if="type ==='percentage'" class="line__label">
          75%
        </span>
      </li>
      <li class="line l--100">
        <span v-if="type ==='percentage'" class="line__label">
          100%
        </span>
      </li>
    </ul>

    <div class="charts">
      <div class="chart chart--dev">
        <ul class="chart--horiz">
          <li class="chart__bar" :class="color" :style="{'width':value+'%'}">
            <span v-if="type==='percentage' && !isNaN(value)" class="chart__label">
                {{value}}%
            </span>
            <span v-if="type==='integer' && !isNaN(value)" class="chart__label integer">
                {{value}}
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
        value:0,
    }),
    props: {
        chartPercentageParent:String,
        chartColorParent:String,
        chartBarTypeParent:String
        
    },
    watch: {
       chartPercentageParent: function(){
            this.chartPercentage = this.chartPercentageParent;
       },
       chartColorParent: function(){
            this.chartColor = this.chartColorParent;
       },
       chartBarTypeParent: function(){
            this.chartBarType = this.chartBarTypeParent;
       }
    },
    methods: {
        loadMore(){
            this.type = this.chartBarTypeParent;
            this.color = this.chartColorParent;

            if(this.type ==='percentage')
              this.value = parseFloat(this.chartPercentageParent).toFixed(1);
            if(this.type ==='integer')
              this.value = parseInt(this.chartPercentageParent);
        }
    },
    created() {
      this.loadMore();
    }
  }

</script>
