<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="card-boxes">
        <div class="card-box">
          <el-form class="release-student" :model="formReleaseStudent" :rules="formReleaseStudent.rules"  ref="formReleaseStudent">
            <div class="row">
              <el-form-item label="From Grades" prop="fromGrades" class="col-4 col-sm-4 col-md-4">
                <el-select @change="updateForm('fromGrades',formReleaseStudent.fromGrades)" prop="fromGrades" v-model="formReleaseStudent.fromGrades" placeholder="From Grades">
                  <el-option v-for="item in formReleaseStudent.gradesOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <i class="icon icon-arrow"></i>
              </el-form-item>
              <el-form-item label="From Home Room" prop="fromHomeRoom" class="col-4 col-sm-4 col-md-4">
                <el-select @change="updateForm('fromHomeRoom',formReleaseStudent.fromHomeRoom)" prop="fromHomeRoom" v-model="formReleaseStudent.fromHomeRoom" placeholder="From Home Room">
                  <el-option v-for="item in formReleaseStudent.homeRoomOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <i class="icon icon-arrow"></i>
              </el-form-item>
              <el-form-item label="From Class Period" prop="fromClassPeriod" class="col-4 col-sm-4 col-md-4">
                <el-select @change="updateForm('fromClassPeriod',formReleaseStudent.fromClassPeriod)" prop="fromClassPeriod" v-model="formReleaseStudent.fromClassPeriod" placeholder="Class Period">
                  <el-option v-for="item in formReleaseStudent.classPeriodOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <i class="icon icon-arrow"></i>
              </el-form-item>
            </div>
            <div class="row">
              <el-form-item label="From Date" prop="fromDate" class="col-4 col-sm-4 col-md-4">
                <i class="icon icon-box-plan"></i>
                <el-date-picker @change="updateForm('fromDate', formReleaseStudent.fromDate)" prop="entryDate" v-model="formReleaseStudent.fromDate" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a from date"></el-date-picker>
              </el-form-item>
              <el-form-item label="To Date" prop="toDate" class="col-4 col-sm-4 col-md-4">
                <i class="icon icon-box-plan"></i>
                <el-date-picker @change="updateForm('toDate', formReleaseStudent.toDate)" prop="entryDate" v-model="formReleaseStudent.toDate" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a to date"></el-date-picker>
              </el-form-item>
              <el-form-item label="From Weekday" prop="fromWeekday" class="col-4 col-sm-4 col-md-4">
                <el-select @change="updateForm('fromWeekday', formReleaseStudent.fromWeekday)" prop="fromWeekday" v-model="formReleaseStudent.fromWeekday" placeholder="From Weekday">
                  <el-option v-for="item in formReleaseStudent.weekdayOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <i class="icon icon-arrow"></i>
              </el-form-item>
            </div>
            <div class="row">
              <div class="col-12 col-lg-5">
                <VueNestable 
                v-model="studentList.studentAssigned" 
                cross-list group="cross" 
                class="assigned-menu">
                  <VueNestableHandle slot-scope="{item}" :item="item">
                    {{item.name}} {{item.surname}}
                  </VueNestableHandle>
                </VueNestable>
              </div>
              <div class="col-12 col-lg-2">
                <div class="add-remove-buttons">
                  <button class="button medium ed-btn__secondary add" @click="addAllStudents()">
                    <span>Add All</span>
                    <span class="icon icon-arrow"></span>
                  </button>
                  <button class="button medium ed-btn__tertiary remove" @click="removeAllStudents()">
                    <span class="icon icon-arrow"></span>
                    <span>Remove All</span>
                  </button>
                </div>
              </div>
              <div class="col-12 col-lg-5">
                <VueNestable 
                v-model="studentList.studentUnassigned" 
                cross-list group="cross" 
                class="list-menu">
                  <VueNestableHandle slot-scope="{item}" :item="item">
                    {{item.name}} {{item.surname}}
                  </VueNestableHandle>
                </VueNestable>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="row">
                  <el-form-item label="To Grades" prop="toGrades" class="col-6 col-sm-6 col-md-6">
                    <el-select @change="updateForm('toGrades', formReleaseStudent.toGrades)" v-model="formReleaseStudent.toGrades" placeholder="To Grades">
                      <el-option v-for="item in formReleaseStudent.gradesOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                  </el-form-item>
                  <el-form-item label="To Home Room" prop="toHomeRoom" class="col-6 col-sm-6 col-md-6">
                    <el-select @change="updateForm('toHomeRoom', formReleaseStudent.toHomeRoom)" v-model="formReleaseStudent.toHomeRoom" placeholder="To Home Room">
                      <el-option v-for="item in formReleaseStudent.homeRoomOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                  </el-form-item>
                  <el-form-item label="To Class Period" prop="toClassPeriod" class="col-6 col-sm-6 col-md-6">
                    <el-select @change="updateForm('toClassPeriod', formReleaseStudent.toClassPeriod)" v-model="formReleaseStudent.toClassPeriod"  placeholder="To Class Period">
                      <el-option v-for="item in formReleaseStudent.classPeriodOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                  </el-form-item>
                  <el-form-item label="To Weekday" prop="toWeekday" class="col-6 col-sm-6 col-md-6">
                    <el-select @change="updateForm('toWeekday', formReleaseStudent.toWeekday)" v-model="formReleaseStudent.toWeekday" placeholder="To Weekday">
                      <el-option v-for="item in formReleaseStudent.weekdayOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                    <i class="icon icon-arrow"></i>
                  </el-form-item>
                </div>
              </div>
              <div class="col-4">
                <el-form-item prop="reason" label="Reason">
                  <el-input type="textarea" :rows="6" @input="updateForm('reason', formReleaseStudent.reason)" prop="reason" v-model="formReleaseStudent.reason" placeholder="Reason"></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="row">
              <div class="action-buttons">
                  <button class="button medium ed-btn__tertiary reset" @click="resetStudents()">
                    <span>Reset</span>
                  </button>
                  <button class="button medium ed-btn__primary release" @click="releaseStudents()">
                    <span>Release Students</span>
                  </button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    VueNestable,
    VueNestableHandle
  } from "vue-nestable";

  export default {
    name: "release-student",
    components: {
      VueNestable,
      VueNestableHandle
    },
    props: ["idx"],
    // DATA
    data: () => ({
      value:"",
      studentListBase: [],
      formReleaseStudent: {
        fromGrades: "",
        fromHomeRoom: "",
        fromClassPeriod: "",
        fromDate: "",
        toDate: "",
        fromWeekday: "",
        reason: "",
        studentList: [],
        gradesOptions: [{
            value: "One",
            label: "One"
          },
          {
            value: "Two",
            label: "Two"
          },
          {
            value: "Three",
            label: "Three"
          },
          {
            value: "Four",
            label: "Four"
          },
          {
            value: "Five",
            label: "Five"
          }
        ],
        homeRoomOptions: [{
            value: "Room One",
            label: "Room One"
          },
          {
            value: "Room Two",
            label: "Room Two"
          },
          {
            value: "Room Three",
            label: "Room Three"
          },
          {
            value: "Room Four",
            label: "Room Four"
          },
          {
            value: "Room Five",
            label: "Room Five"
          }
        ],
        classPeriodOptions: [{
            value: "Class Period One",
            label: "Class Period One"
          },
          {
            value: "Class Period Two",
            label: "Class Period Two"
          },
          {
            value: "Class Period Three",
            label: "Class Period Three"
          },
          {
            value: "Class Period Four",
            label: "Class Period Four"
          },
          {
            value: "Class Period Five",
            label: "Class Period Five"
          }
        ],
        weekdayOptions: [{
            value: "Monday",
            label: "Monday"
          },
          {
            value: "Tuesday",
            label: "Tuesday"
          },
          {
            value: "Wednesday",
            label: "Wednesday"
          },
          {
            value: "Thursday",
            label: "Thursday"
          },
          {
            value: "Friday",
            label: "Friday"
          }
        ],
        rules: {
          fromGrades: [
            {
              required: true,
              message: "From Grades is Required!",
              trigger: "blur"
            }
          ],
          fromHomeRoom: [
            {
              required: true,
              message: "From Home Room is Required!",
              trigger: "blur"
            }
          ],
          fromClassPeriod: [
            {
              required: true,
              message: "From Class Period is Required!",
              trigger: "blur"
            }
          ],
          fromDate: [
            {
              required: true,
              message: "From Date is Required!",
              trigger: "blur"
            }
          ],
          toDate: [
            {
              required: true,
              message: "To Date is Required!",
              trigger: "blur"
            }
          ],
          fromWeekday: [
            {
              required: true,
              message: "From Weekday is Required!",
              trigger: "blur"
            }
          ],
          toGrades: [
            {
              required: true,
              message: "To Grades is Required!",
              trigger: "blur"
            }
          ],
          toHomeRoom: [
            {
              required: true,
              message: "To Home Room is Required!",
              trigger: "blur"
            }
          ],
          toClassPeriod: [
            {
              required: true,
              message: "To Class Period is Required!",
              trigger: "blur"
            }
          ],
          toWeekday: [
            {
              required: true,
              message: "To Weekday is Required!",
              trigger: "blur"
            }
          ],
          reason: [
            {
              required: true,
              message: "Reason is Required!",
              trigger: "blur"
            }
          ],
          studentList: [
            {
              required: true,
              message: "Student List is Required!",
              trigger: "blur"
            }
          ]
        }
      },
      dummyDataStudentList: [{
          "studentAssigned": [
            {
              "id": 0,
              "name": "Vivienne Labadie",
              "surname": "Becker"
            },
            {
              "id": 1,
              "name": "Hugh",
              "surname": "Whelan"
            },
            {
              "id": 2,
              "name": "Gracey",
              "surname": "Guevara"
            },
            {
              "id": 3,
              "name": "Leanne",
              "surname": "Lester"
            }
          ],
          "studentUnassigned": [
            {
              "id": 4,
              "name": "Tye",
              "surname": "Nelson"
            },
            {
              "id": 5,
              "name": "Abdirahman",
              "surname": "Galvan"
            },
            {
              "id": 6,
              "name": "Bronwen",
              "surname": "Beck"
            },
            {
              "id": 7,
              "name": "Lucia",
              "surname": "Moore"
            }
          ]
      }]
    }),
    methods: {
      loadMore() {
        //this.busy = true;    
        //this.sn = parseInt(this.$route.params.id);
        this.studentListBase =  JSON.parse(JSON.stringify(this.dummyDataStudentList[0]));
        this.studentList = this.dummyDataStudentList[0];
      },
      releaseStudents (){
        event.preventDefault();
        return new Promise((resolve) => {
          this.$refs.formReleaseStudent.validate((valid) => {
            this.$emit('on-validate', valid, this.model)
            resolve(valid);
            if(valid)
              console.log("valid")
          });
        })
      },
      resetStudents(){
        event.preventDefault();
        this.formReleaseStudent = [];
        this.studentList = JSON.parse(JSON.stringify(this.studentListBase));
      },
      updateForm (input, value) {
        this.formReleaseStudent[input] = value;
      },
      addAllStudents(){
        event.preventDefault()
        this.studentList.studentUnassigned = [...this.studentList.studentUnassigned,...this.studentList.studentAssigned];
        this.studentList.studentAssigned = [];
      },
      removeAllStudents(){
        event.preventDefault()
        this.studentList.studentAssigned = [...this.studentList.studentAssigned,...this.studentList.studentUnassigned];
        this.studentList.studentUnassigned = [];
      },
    },
    created() {
      this.loadMore();
    }
  }

</script>
