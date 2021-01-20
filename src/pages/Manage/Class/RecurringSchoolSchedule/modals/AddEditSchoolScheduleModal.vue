<template>
  <md-dialog :md-active.sync="editSchoolScheduleModal" class="modal-window recurring-schedule-modal">
    <h2 class="modal-title">{{actionSchedule}} Schedule</h2>
    <div class="modal-content">
      <el-form :model="formAddEditSchedule" :rules="rules" ref="formAddEditSchedule">
        <!-- Menu Information -->
        <div class="card-content">
          <div class="row">
            <el-form-item class="col-12" prop="scheduleType" label="Schedule Type">
              <el-select @change="updateForm('scheduleType', formAddEditSchedule.scheduleType)" v-model="formAddEditSchedule.scheduleType" placeholder="Schedule Type">
                <el-option v-for="item in scheduleTypeOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-12" prop="activity" label="Activity Title">
              <el-input @input="updateForm('activity', formAddEditSchedule.activity)" v-model="formAddEditSchedule.activity" placeholder="Activity Title"></el-input>
            </el-form-item>
            <el-form-item class="col-6" prop="startTime" label="Start Time">
              <el-time-select placeholder="Start time" @change="updateForm('startTime', formAddEditSchedule.startTime)" v-model="formAddEditSchedule.startTime" :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
              </el-time-select>
            </el-form-item>
            <el-form-item class="col-6" prop="endTime" label="End Time">
              <el-time-select placeholder="End Time" @change="updateForm('endTime', formAddEditSchedule.endTime)" v-model="formAddEditSchedule.endTime" :picker-options="{
                    start: formAddEditSchedule.startTime,
                    step: '00:15',
                    end: '24:00',
                    minTime: startTime
                  }">
              </el-time-select>
            </el-form-item>
            <el-form-item class="col-12 week-days" prop="weekDays" label="Week Days">
              <el-select @change="updateForm('weekDays', formAddEditSchedule.weekDays)" v-model="formAddEditSchedule.weekDays" multiple placeholder="Week Days">
                <el-option v-for="item in weekDaysOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-12" prop="grades" label="Grades">
              <el-select @change="updateForm('grades', formAddEditSchedule.grades)" v-model="formAddEditSchedule.grades" multiple placeholder="Grades">
                <el-option v-for="item in gradesOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="col-12" prop="displayOrder" label="Display Order">
              <el-select @change="updateForm('displayOrder', formAddEditSchedule.displayOrder)" v-model="formAddEditSchedule.displayOrder" placeholder="Display Order">
                <el-option v-for="item in displayOrderOptions" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__secondary" @click="validateEditForm()">Save</button>
      <button class="button medium ed-btn__tertiary" @click="editSchoolScheduleModal = false">Cancel</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "recurring-schedule-modal",
    components: {},
    // DATA
    data: () => ({
      sn: 0,
      isAdd: false,
      startTime: "",
      endTime: "",
      editSchoolScheduleModal: false,
      scheduleTypeOptions: ["Academic", "Non-Academic"],
      weekDaysOptions: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      gradesOptions: ["PK3", "PK4", "KG", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"],
      displayOrderOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      loadedData:[],
      actionSchedule:"Add",
      formAddEditSchedule: {
        // EDIT CODE
        scheduleType: "",
        activity: "",
        startTime: "",
        endTime: "",
        weekDays: [],
        grades: [],
        displayOrder: [],
      },
      rules: {
        scheduleType: [{
          required: true,
          message: "Schedule Type is Required!",
          trigger: "blur"
        }],
        activity: [{
          required: true,
          message: "Activity Title is Required!",
          trigger: "blur"
        }],
        startTime: [{
          required: true,
          message: "Start Time is Required!",
          trigger: "blur"
        }],
        endTime: [{
          required: true,
          message: "End Time is Required!",
          trigger: "blur"
        }],
        weekDays: [{
          required: true,
          message: "Week Days is Required!",
          trigger: "blur"
        }],
        grades: [{
          required: true,
          message: "Grades is Required!",
          trigger: "blur"
        }],
        displayOrder: [{
          required: true,
          message: "Display Order is Required!",
          trigger: "blur"
        }]
      }
    }),
    props: {
      editSchoolScheduleModalParent: Boolean,
      tabSelectedParent: String,
      editAddFormSaveParent: Function,
      parentFormData: Object
    },
    watch: {
      editSchoolScheduleModalParent: function() {
        this.editSchoolScheduleModal = true;
      },
      tabSelectedParent: function() {
        this.tabSelected = this.tabSelectedParent;
      },
      parentFormData: function() {
        this.formEditCode = this.parentFormData;
      }
    },
    methods: {
      validateEditForm() {
        return new Promise((resolve) => {
          this.$refs.formAddEditSchedule.validate((valid) => {
            this.$emit('on-validate', valid, this.model)
            resolve(valid);
            if (valid)
              this.editFormSave();
          });
        })
      },
      updateForm(input, value) { 
        this.formAddEditSchedule[input] = value;
      },
      editFormSave() {
        if (!this.isAdd) {
          // EDIT
          this.editAddFormSaveParent(this.formAddEditSchedule, "edit");
        } else {
          // ADD
          const recurringScheduleStorage = JSON.parse(JSON.stringify(this.loadedData));

          // FIND LARGEST ID
          const maxId = recurringScheduleStorage.reduce(function(prev, current) {
              return (prev.sn > current.sn) ? prev : current
          })

          this.formAddEditSchedule.sn = maxId.sn+1;
          this.editAddFormSaveParent(this.formAddEditSchedule,"add");
        }

        this.editSchoolScheduleModal = false;
      },
      openModal(data,type) {
        this.loadedData = data;

        if (type === "edit") {
          // EDIT
          this.actionSchedule = "Edit";
          const formData = JSON.parse(JSON.stringify(data));
          this.formAddEditSchedule = formData;
          this.isAdd = false;
        } 
        if (type === "add") {
          // ADD
          this.actionSchedule = "Add";
          this.formAddEditSchedule = {};
          this.isAdd = true;
        }
        this.editSchoolScheduleModal = true;
      }
    }
  }

</script>
