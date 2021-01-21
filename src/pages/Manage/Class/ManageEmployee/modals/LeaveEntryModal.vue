<template>
  <!-- Main Content START -->
  <div class="main-content edit-employee">
    <div class="container-fluid">
        <el-form class="teacher-profile" :model="formTeacherEntryData" :rules="rules" ref="formTeacherEntryData">
          <div class="row">
            <div class="side-menu__results card-boxes lessons_teacher">
              <!-- Box -->
              <div class="card-box">
                <div class="card-title">
                  <h2>Edit Employee Profile</h2>
                </div>
                <div class="card-content">
                  <div class="row">
                    <el-form-item label="Employee Leave Type" prop="employeeLeaveType" class="col-12 col-sm-6 col-md-4">
                      <el-select @change="updateForm('employeeLeaveType', formTeacherEntryData.employeeLeaveType)" v-model="formTeacherEntryData.employeeLeaveType" placeholder="Employee Leave Type">
                        <el-option v-for="pre in options.employeeTypeOptions"
                                  :key="pre.value"
                                  :label="pre.label"
                                  :value="pre.value">
                        </el-option>
                      </el-select>
                      <i class="icon icon-arrow"></i>
                    </el-form-item>
                    <el-form-item label="Number of Days" prop="noDays" class="col-12 col-sm-6 col-md-4">
                      <el-input @input="updateForm('noDays', formTeacherEntryData.noDays)" v-model="formTeacherEntryData.noDays" placeholder="Number of Days">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Purpose" prop="purpose" class="col-12 col-sm-6 col-md-4">
                      <el-input @input="updateForm('purpose', formTeacherEntryData.purpose)" v-model="formTeacherEntryData.purpose" placeholder="Purpose">
                      </el-input>
                    </el-form-item>
                  </div>
                  <el-button @click="validateTeacherProfile()" class="button medium ed-btn__primary right" style="margin-left:15px !important;">Add</el-button>
                  <el-button @click="clearChangesProfile()" class="button medium ed-btn__tertiary right">Cancel</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form>
        <div v-if="busy" class="preloader">
          <span><img src="../../../../../assets/images/preloader.gif" /> Loading...</span>
        </div>
    </div>
  </div>
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
      busy: false,
      formTeacherEntryData: {
        sn:0,
        employeeLeaveType:"",
        noDays:"",
        purpose:"",
      },
        rules: {
          //RULES 
          employeeLeaveType: [
            {
              required: true,
              message: "Leave Type Name Required!",
              trigger: "blur",
            }
          ],
          noDays: [
            {
              required: true,
              message: "Number of Days Required!",
              trigger: "blur",
            }
          ],
          purpose: [
            {
              required: true,
              message: "Purpose Required!",
              trigger: "blur",
            }
          ]
        },
      options: {
        //OPTIONS
        employeeLeaveTypeOptions: [
            {value: 'Sick', label: 'Sick'},
            {value: 'Home', label: 'Home'},
            {value: 'Substitute', label: 'Substitute'},
            {value: 'Other', label: 'Other'}
        ]
      }
    }),
    methods: {
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
      editFormSave(){

      },
      loadMore() {
        this.busy = true;


      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
