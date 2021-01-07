<template>
  <md-dialog :md-active.sync="editSchoolScheduleModal" class="modal-window">
    <h2 class="modal-title">Update Schedule</h2>
    <div class="modal-content">
      <el-form :model="formEditSchedule" :rules="formEditSchedule.rules" ref="formEditSchedule">
        <!-- Menu Information -->
        <div class="card-content">
          <div class="row">
              <el-form-item class="col-12" prop="scheduleType" label="Schedule Type">
                <el-select v-model="formEditSchedule.scheduleType" placeholder="Schedule Type">
                    <el-option
                      v-for="item in scheduleTypeOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="col-12" prop="activityTitle" label="Activity Title">
                <el-input v-model="formEditSchedule.activityTitle" placeholder="Activity Title"></el-input>
              </el-form-item>
              <el-form-item class="col-12" prop="startTitle" label="Start Title">
                <el-input v-model="formEditSchedule.startTitle" placeholder="Start Title"></el-input>
              </el-form-item>
              <el-form-item class="col-12" prop="startTime" label="Start Time">
                <el-time-select
                  placeholder="Start time"
                  v-model="formEditSchedule.startTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
                </el-time-select>  
              </el-form-item>
              <el-form-item class="col-12" prop="endTime" label="End Time">
                <el-time-select
                  placeholder="End Time"
                  v-model="formEditSchedule.endTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: startTime
                  }">
                </el-time-select>  
              </el-form-item>
                <el-form-item class="col-12" prop="weekDays" label="Week Days">
                  <el-select v-model="formEditSchedule.weekDays" multiple placeholder="Week Days">
                    <el-option
                      v-for="item in weekDaysOptions"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
               </el-form-item>
                <el-form-item class="col-12" prop="grades" label="Grades">
                  <el-select v-model="formEditSchedule.grades" multiple placeholder="Grades">
                    <el-option
                      v-for="item in gradesOptions"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
               </el-form-item>
              <el-form-item class="col-12" prop="displayOrder" label="Display Order">
                <el-select v-model="formEditSchedule.displayOrder" placeholder="Display Order">
                    <el-option
                      v-for="item in displayOrderOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                </el-select>
              </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <md-dialog-actions>
      <md-button class="button medium ed-btn__secondary" @click="validateEditForm()">Save</md-button>
      <md-button class="button medium ed-btn__tertiary" @click="editSchoolScheduleModal = false">Cancel</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "code-book-edit-code-modal",
    components: {},
    // DATA
    data: () => ({
        scheduleTypeOptions : ["Academic", "Non-Academic"],
        weekDaysOptions: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
        gradesOptions: ["PK3","PK4","KG","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve"],
        displayOrderOptions: [1,2,3,4,5,6,7,8,9,10],
        formEditSchedule: {
            // EDIT CODE
            sn:0,
            scheduleType:"",
            activityTitle:"",
            startTime:"",
            endTime:"",
            weekDays: [],
            grades:[],
            displayOrder:[],
            rules: {
                scheduleType: [
                    {
                        required: true,
                        message: "Schedule Type is Required!",
                        trigger: "blur"
                    }                  
                ],
                activityTitle: [
                    {
                        required: true,
                        message: "Activity Title is Required!",
                        trigger: "blur"
                    }                  
                ],
                startTime: [
                    {
                        required: true,
                        message: "Start Time is Required!",
                        trigger: "blur"
                    }                  
                ],
                endTime: [
                    {
                        required: true,
                        message: "End Time is Required!",
                        trigger: "blur"
                    }                  
                ],
                weekDays: [
                    {
                        required: true,
                        message: "Week Days is Required!",
                        trigger: "blur"
                    }                  
                ],
                grades: [
                    {
                        required: true,
                        message: "Grades is Required!",
                        trigger: "blur"
                    }                  
                ],
                displayOrder: [
                    {
                        required: true,
                        message: "Display Order is Required!",
                        trigger: "blur"
                    }                  
                ]
            }
        },
    }),
    props: {
        editSchoolScheduleModalParent: Boolean,
        tabSelectedParent: String,
        editFormSaveParent: Function,
        parentFormData: Object
    },
    watch: {
       editSchoolScheduleModalParent: function(){
            this.editSchoolScheduleModal = true;
       },      
       tabSelectedParent: function(){
            this.tabSelected = this.tabSelectedParent;
       },
       parentFormData: function(){
            this.formEditCode = this.parentFormData;
       }
    },
    methods: {
        validateEditForm(){
            return new Promise((resolve) => {
                this.$refs.formEditCode.validate((valid) => {
                this.$emit('on-validate', valid, this.model)
                resolve(valid);
                if(valid)
                    this.editFormSave(this.formEditCode);
                });
            })
        },
        editFormSave(formEditCode){
          this.editFormSaveParent(formEditCode)
          this.editSchoolScheduleModal = false;
        },
        openModal(){
          this.editSchoolScheduleModal = true;
        }
    }
  }

</script>
