<template>
  <md-dialog :md-active.sync="unitScheduleModal" class="modal-window">
    <h2 class="modal-title">Unit scheduling of {{subject}}, grade {{grade}} by {{student}} on {{date}}</h2>
    <div class="modal-content">
      <el-form class="row" :model="formUnitSchedule" :rules="rules" ref="formUnitSchedule">
        <el-form-item label="Unit Strand" prop="unitStrand" class="col-12">
            <el-select @change="updateForm('unitStrand', formUnitSchedule.unitStrand)" v-model="formUnitSchedule.unitStrand" placeholder="Unit Strand">
              <el-option v-for="pre in options.unitStrand" :key="pre.value" :label="pre.label" :value="pre.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </el-form-item>
          <el-form-item label="Unit Standard" prop="unitStandard" class="col-12">
            <el-select @change="updateForm('unitStandard', formUnitSchedule.unitStandard)" v-model="formUnitSchedule.unitStandard" placeholder="Unit Standard">
              <el-option v-for="pre in options.unitStandard" :key="pre.value" :label="pre.label" :value="pre.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </el-form-item>
        </el-form>
    </div>
    <div class="modal-footer">
      <el-button @click="validateUnitScheduleForm()" class="button medium ed-btn__primary right">Submit</el-button>
      <el-button @click="clearUnitSchedule()" class="button medium ed-btn__secondary right">Clear</el-button>
      <el-button @click="cancelUnitSchedule()" class="button medium ed-btn__tertiary right">Cancel</el-button>
    </div>
  </md-dialog>
</template>

<script>
  export default {
    name: "unit-schedule",
    components: {

    },
    // DATA
    data: () => ({
      sn: 0,
      date:'',
      subject:'',
      grade:'',
      student:'',
      unitScheduleModal:false,
      formUnitSchedule: {
        sn: 0,
        unitStrand:"",
        unitStandard:""
      },
      rules: {
       //RULES 
        unitStrand: [{
          required: true,
          message: "Unit Strand Required!",
          trigger: "blur",
        }],
        unitStandard: [{
          required: true,
          message: "Unit Standard Required!",
          trigger: "blur",
        }],
      },
      options: {
        //OPTIONS
        unitStrand: [
            {
            value:"Item 1",
            label:"Item 1"
            },
            {
            value:"Item 2",
            label:"Item 2"
            },
            {
            value:"Item 3",
            label:"Item 3"
            }
        ],
        unitStandard: [
            {
            value:"Item 1",
            label:"Item 1"
            },
            {
            value:"Item 2",
            label:"Item 2"
            },
            {
            value:"Item 3",
            label:"Item 3"
            }
        ],
      }
    }),
    methods: {
      openModal(subject,grade,student,date) {
        this.subject = subject;
        this.grade = grade;
        this.student = student;
        this.date = date.dateStr;
        this.unitScheduleModal = true;
      },
      updateForm(input, value) {
        this.formUnitSchedule[input] = value;
      },
      validateUnitScheduleForm() {
        return new Promise((resolve) => {
          this.$refs.formUnitSchedule.validate((valid) => {
            this.$emit('on-validate', valid, this.model)
            resolve(valid);
            if (valid)
              this.addUnitSchedule();
          });
        })
      },
      clearUnitSchedule(){
        this.formUnitSchedule.unitStrand="";
        this.formUnitSchedule.unitStandard="";
      },
      cancelUnitSchedule(){
        this.unitScheduleModal=false;
      },
      addUnitSchedule(){
          const strandAndStandard = [
            this.formUnitSchedule.unitStrand,
            this.formUnitSchedule.unitStandard
          ]
          this.$emit('eventAdded', strandAndStandard)
          this.unitScheduleModal = false;
      }
    }
  }

</script>
