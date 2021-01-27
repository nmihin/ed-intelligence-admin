<template>
  <!-- Main Content START -->
  <md-dialog :md-active.sync="leaveEntryEmployeeModal" class="modal-window employee-entry">
    <h2 class="modal-title">Employee Leave</h2>
    <div class="modal-content">
      <el-form class="row" :model="formTeacherEntryData" :rules="rules" ref="formTeacherEntryData">
        <div class="col-12 col-md-8">
          <el-form-item label="Employee Leave Type" prop="employeeLeaveType">
            <el-select @change="updateForm('employeeLeaveType', formTeacherEntryData.employeeLeaveType)" v-model="formTeacherEntryData.employeeLeaveType" placeholder="Employee Leave Type">
              <el-option v-for="pre in options.employeeLeaveTypeOptions" :key="pre.value" :label="pre.label" :value="pre.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </el-form-item>
          <el-form-item label="Number of Days" prop="noDays">
            <el-input @input="updateForm('noDays', formTeacherEntryData.noDays)" v-model="formTeacherEntryData.noDays" placeholder="Number of Days">
            </el-input>
          </el-form-item>
          <el-form-item label="Purpose" prop="purpose">
            <el-input type="textarea" @input="updateForm('purpose', formTeacherEntryData.purpose)" v-model="formTeacherEntryData.purpose" placeholder="Purpose">
            </el-input>
          </el-form-item>
        </div>
        <div class="col-12 col-md-4">
          <el-form-item label="From:">
            <i class="icon icon-box-plan"></i>
            <el-date-picker @change="updateForm('fromEntry', formTeacherEntryData.fromEntry)" prop="fromEntry" v-model="formTeacherEntryData.fromEntry" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="To:">
            <i class="icon icon-box-plan"></i>
            <el-date-picker @change="updateForm('toEntry', formTeacherEntryData.toEntry)" prop="toEntry" v-model="formTeacherEntryData.toEntry" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a date">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="modal-footer">
      <el-button @click="leaveEntryEmployeeModal = false" class="button medium ed-btn__tertiary right">Cancel</el-button>
      <el-button @click="validateTeacherProfile()" class="button medium ed-btn__primary right" style="margin-left:15px !important;">Add</el-button>
    </div>
  </md-dialog>
</template>

<script>
  // COMPONENTS


  export default {
    name: "leave-entry-employee-profile",
    components: {

    },
    // DATA
    data: () => ({
      loadedData: [],
      leaveEntryEmployeeModal: false,
      formTeacherEntryData: {
        sn: 0,
        employeeLeaveType: "",
        fromEntry: "",
        toEntry: "",
        noDays: "",
        purpose: "",
      },
      rules: {
        //RULES 
        employeeLeaveType: [{
          required: true,
          message: "Leave Type Name Required!",
          trigger: "blur",
        }],
        fromEntry:[{
          required: true,
          message: "From Date Required!",
          trigger: "blur",
        }],
        toEntry:[{
          required: true,
          message: "To Date Required!",
          trigger: "blur",
        }],
        noDays: [{
          required: true,
          message: "Number of Days Required!",
          trigger: "blur",
        }],
        purpose: [{
          required: true,
          message: "Purpose Required!",
          trigger: "blur",
        }]
      },
      options: {
        //OPTIONS
        employeeLeaveTypeOptions: [{
            value: 'Sick',
            label: 'Sick'
          },
          {
            value: 'Home',
            label: 'Home'
          },
          {
            value: 'Substitute',
            label: 'Substitute'
          },
          {
            value: 'Other',
            label: 'Other'
          }
        ]
      }
    }),
    props: {
      leaveEntryEmployeeModalParent: Boolean
    },
    watch: {
      leaveEntryEmployeeModalParent: function() {
        this.leaveEntryEmployeeModal = true;
      }
    },
    methods: {
      openModal(sn) {
        this.sn = sn;

        this.formTeacherEntryData = {
          sn:sn,
          employeeLeaveType : "",
          fromEntry : "",
          toEntry : "",
          noDays : "",
          purpose : ""
        }

        this.leaveEntryEmployeeModal = true;
      },
      validateTeacherProfile() {
        return new Promise((resolve) => {
          this.$refs.formTeacherEntryData.validate((valid) => {
            this.$emit('on-validate', valid, this.model)
            resolve(valid);
            if (valid)
              this.editFormSave();
          });
        })
      },
      updateForm(input, value) {
        this.formTeacherEntryData[input] = value;
      },
      editFormSave() {
        console.log(this.formTeacherEntryData)
        this.leaveEntryEmployeeModal = false;
      }
    }
  }

</script>
