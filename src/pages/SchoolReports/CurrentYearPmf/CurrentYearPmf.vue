<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <!-- LIST VIEW -->
      <div class="row">
        <div class="col-12">
          <ul class="document-uploaded" style="margin-bottom:5px !important;">
            <li class="type-pdf" @click="downloadPDF()">
              <span class="document-name">Export to PDF</span>
              <span class="icon icon-download-pdf-document"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
            </li>
          </ul>
        </div>
      </div>
      <div ref="contentPDF">
      <StudentReportComponent 
      :studentProgressDataParent="studentProgressData"
      :studentAchievementsDataParent="studentAchievementsData"
      :gatewayDataParent="gatewayData"
      :schoolEnvironmentDataParent="schoolEnvironmentData"
      />
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
  </div>
  <!-- Main Content END -->
</template>

<script>
  //import CurrentYearPmfChart from './charts/CurrentYearPmfChart'
  import StudentReportComponent from '../../../components/reports/StudentReportComponent'

  import jsPDF from 'jspdf';
  import html2canvas from "html2canvas";
  import html2PDF from 'jspdf-html2canvas';

  export default {
    name: "current-year-pmf",
    components: {
      //CurrentYearPmfChart,
      StudentReportComponent,
      html2canvas,
      jsPDF,
      html2PDF
    },
    methods: {
      downloadPDF(){
        html2PDF(this.$refs.contentPDF, {
          jsPDF: {
            format: 'a4',
          },
          imageType: 'image/jpeg',
          imageQuality: 1,
          margin: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
          output: 'Current_Year_PMF.pdf'
        });  
      },
      loadMore() {
        this.busy = true;

        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/pmf-report.json").then((response) => {   
            this.studentProgressData = response.data[0][2020][0].studentProgressData;
            this.studentAchievementsData = response.data[0][2020][0].studentAchievementsData;
            this.gatewayData = response.data[0][2020][0].gatewayData;
            this.schoolEnvironmentData = response.data[0][2020][0].schoolEnvironmentData;

            this.busy = false;
        }).catch((error) => error.response.data)
      }
    },
    // DATA
    data: () => ({
      studentProgressData :[],
      studentAchievementsData: [],
      gatewayData:[],
      schoolEnvironmentData:[],
      posts: [],
      busy: false
    }),
    created() {
      this.loadMore();
    }
  }

</script>
