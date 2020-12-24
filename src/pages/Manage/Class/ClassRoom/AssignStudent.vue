<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
       <div class="row">
            <div class="col-6 col-sm-3 col-md-3">
                <div class="element">
                    <el-select @change="updateOptions(value)" v-model="value" placeholder="Class Period">
                        <el-option v-for="item in periodOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                 </div>
            </div>
            <div class="col-6 col-sm-3 col-md-3">
                <div class="element">
                    <el-select @change="updateOptions(value)" v-model="value" placeholder="Class Room">
                        <el-option v-for="item in roomOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-4 offset-md-2">
            <SearchContentComponent :searchFilterParent="searchFilter" />
            </div>
       </div>
       <div class="row">
            ASSIGN STUDENT {{sn}}
       </div>
       <div v-if="busy" class="preloader">
            <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
       </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../../components/search/SearchContentComponent.vue';


  export default {
    name: "class-period",
    components: {
      RecordsComponent,
      SearchContentComponent
    },
    // DATA
    data: () => ({
      sn:0,
      busy: false,
      periodOptions: [
          {
              value: "1st Period",
              label: "1st Period"
          },
          {
              value: "2st Period",
              label: "2st Period"
          },
          {
              value: "3st Period",
              label: "3st Period"
          },
          {
              value: "4st Period",
              label: "4st Period"
          },
          {
              value: "5st Period",
              label: "5st Period"
          }
      ],
      roomOptions: [
          {
              value: "1st Room",
              label: "1st Room"
          },
          {
              value: "2st Room",
              label: "2st Room"
          },
          {
              value: "3st Room",
              label: "3st Room"
          }
      ]
    }),
    methods: {
        loadMore() {
            //this.busy = true;    
            this.sn = parseInt(this.$route.params.id);
        }
    },
    created() {
      this.loadMore();
    }
  }
</script>