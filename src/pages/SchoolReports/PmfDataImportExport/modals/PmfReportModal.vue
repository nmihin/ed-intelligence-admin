<template>
  <md-dialog :md-active.sync="pmfDataModal" class="modal-window">
    <h2 class="modal-title">{{year}}. PMF Report</h2>
    <div class="modal-content">
      <div class="row">
        <div class="col-12">
          <ul class="document-uploaded" style="margin-bottom:5px !important;">
            <li class="type-pdf" @click="downloadPDF()" v-if="!busy">
              <span class="document-name">Export to PDF</span>
              <span class="icon icon-download-pdf-document"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></span>
            </li>
          </ul>
        </div>
      </div>
      <div ref="contentPDF" :class="downloadModeActive">
        <StudentReportComponent :studentDataParent="loadedData" />
      </div>
      <div v-if="busy" class="preloader">
        <span><img src="../../../../assets/images/preloader.gif" /> Loading...</span>
      </div>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="cancelRequest()">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  import StudentReportComponent from '../../../../components/reports/StudentReportComponent'
  import html2PDF from 'jspdf-html2canvas';

  export default {
    name: "pmf-modal",
    components: {
      StudentReportComponent,
      html2PDF
    },
    // DATA
    data: () => ({
      sn: 0,
      busy: false,
      pmfDataModal: false,
      year: 0,
      fileName: "",
      downloadModeActive: "",
      html2canvasWidth: 0,
      loadedData: {}
    }),
    props: {

    },
    watch: {

    },
    methods: {
      downloadPDF() {
        // DOWNLOAD IN PROGRESS - mobile download fix CANVAS
        const scrWidth = window.innerWidth;
        if (scrWidth < 1000) {
          this.html2canvasWidth = 1000;
          this.downloadModeActive = "download-in-progress";
        } else {
          this.html2canvasWidth = 1440;
        }

        setTimeout(() => {
          html2PDF(this.$refs.contentPDF, {
            jsPDF: {
              format: 'a4',
            },
            imageType: 'image/jpeg',
            imageQuality: 1,
            html2canvas: {
              width: 1000
            },
            margin: {
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            },
            output: this.fileName
          });

          this.downloadModeActive = "";
        }, 1000);
      },
      cancelRequest() {
        if (this.cancelSource)
          this.cancelSource.cancel();

        this.pmfDataModal = false;
      },
      openModal(sn, year) {
        this.sn = sn;
        this.year = year;
        this.fileName = this.year + "_pmf_report.pdf"

        this.busy = true;

        // CANCEL REQUEST
        this.cancelSource = this.axios.CancelToken.source();

        this.axios.get('https://devapp.iteg.com.np/api/v1/pmf_report',{
          cancelToken: this.cancelSource.token }).then((response) => {
            if (response) {
              this.cancelSource = null;
              this.loadedData = response.data;
              this.busy = false;
            }
          }).catch((error) => error);

        this.pmfDataModal = true;
      }
    }
  }

</script>
