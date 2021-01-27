<template>
  <md-dialog :md-active.sync="addEditEmployeeModal" class="modal-window add-edit-employee">
    <h2 class="modal-title">{{type}} Employee</h2>
    <div class="modal-content">
      <el-form class="teacher-profile row" :model="formTeacherData" :rules="rules" ref="formTeacherData">
        <el-form-item label="First Name" prop="firstName" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('firstName', formTeacherData.firstName)" v-model="formTeacherData.firstName" placeholder="First Name">
          </el-input>
        </el-form-item>
        <el-form-item label="Middle Name" prop="middleName" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('middleName', formTeacherData.middleName)" v-model="formTeacherData.middleName" placeholder="Middle Name">
          </el-input>
        </el-form-item>
        <el-form-item label="Last Name" prop="lastName" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('lastName', formTeacherData.lastName)" v-model="formTeacherData.lastName" placeholder="Last Name">
          </el-input>
        </el-form-item>
        <el-form-item label="Gender" prop="gender" class="col-12 col-sm-6 col-md-4">
          <el-radio-group @change="updateForm('gender', formTeacherData.gender)" v-model="formTeacherData.gender">
            <el-radio label="Female">Female</el-radio>
            <el-radio label="Male">Male</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Phone Number" prop="phone" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('phone', formTeacherData.phone)" v-model="formTeacherData.phone" placeholder="Phone">
          </el-input>
        </el-form-item>
        <el-form-item label="Email" prop="email" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('email', formTeacherData.email)" v-model="formTeacherData.email" placeholder="Email">
          </el-input>
        </el-form-item>
        <el-form-item label="Address" prop="address" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('address', formTeacherData.address)" v-model="formTeacherData.address" placeholder="Address">
          </el-input>
        </el-form-item>
        <el-form-item label="Birth Date" class="col-12 col-sm-6 col-md-4">
          <i class="icon icon-box-plan"></i>
          <el-date-picker @change="updateForm('birthDate', formTeacherData.birthDate)" prop="birthDate" v-model="formTeacherData.birthDate" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Qualification" prop="qualification" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('qualification', formTeacherData.qualification)" v-model="formTeacherData.qualification" placeholder="Qualification">
          </el-input>
        </el-form-item>
        <el-form-item label="Agreement Type" prop="agreementType" class="col-12 col-sm-6 col-md-4">
          <el-select @change="updateForm('agreementType', formTeacherData.agreementType)" v-model="formTeacherData.agreementType" placeholder="Agreement Type">
            <el-option v-for="pre in options.agreementTypeOptions" :key="pre.value" :label="pre.label" :value="pre.value">
            </el-option>
          </el-select>
          <i class="icon icon-arrow"></i>
        </el-form-item>
        <el-form-item label="Select Department" prop="selectDepartment" class="col-12 col-sm-6 col-md-4">
          <el-select @change="updateForm('selectDepartment', formTeacherData.selectDepartment)" v-model="formTeacherData.selectDepartment" placeholder="Select Department">
            <el-option v-for="pre in options.selectDepartmentOptions" :key="pre.value" :label="pre.label" :value="pre.value">
            </el-option>
          </el-select>
          <i class="icon icon-arrow"></i>
        </el-form-item>
        <el-form-item label="Joined Date" class="col-12 col-sm-6 col-md-4">
          <i class="icon icon-box-plan"></i>
          <el-date-picker @change="updateForm('joinedDate', formTeacherData.joinedDate)" prop="joinedDate" v-model="formTeacherData.joinedDate" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Employee Type" prop="employeeType" class="col-12 col-sm-6 col-md-4">
          <el-select @change="updateForm('employeeType', formTeacherData.employeeType)" v-model="formTeacherData.employeeType" placeholder="Employee Type">
            <el-option v-for="pre in options.employeeTypeOptions" :key="pre.value" :label="pre.label" :value="pre.value">
            </el-option>
          </el-select>
          <i class="icon icon-arrow"></i>
        </el-form-item>
        <el-form-item label="Additionals" prop="additionals" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('additionals', formTeacherData.additionals)" v-model="formTeacherData.additionals" placeholder="Additionals">
          </el-input>
        </el-form-item>
        <el-form-item label="Status" prop="status" class="col-12 col-sm-6 col-md-4">
          <el-select @change="updateForm('status', formTeacherData.status)" v-model="formTeacherData.status" placeholder="Status">
            <el-option v-for="pre in options.statusOptions" :key="pre.value" :label="pre.label" :value="pre.value">
            </el-option>
          </el-select>
          <i class="icon icon-arrow"></i>
        </el-form-item>
        <el-form-item label="Resigned Date" class="col-12 col-sm-6 col-md-4">
          <i class="icon icon-box-plan"></i>
          <el-date-picker @change="updateForm('resignedDate', formTeacherData.resignedDate)" prop="resignedDate" v-model="formTeacherData.resignedDate" type="date" format="dd-MM-yyyy" value-format="yyyy-MM-dd" placeholder="Pick a date">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Designation" prop="designation" class="col-12 col-sm-6 col-md-4">
          <el-input @input="updateForm('designation', formTeacherData.designation)" v-model="formTeacherData.designation" placeholder="Designation">
          </el-input>
        </el-form-item>
        <el-form-item label="Choose File" class="col-12 col-sm-6 col-md-4">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
            <el-button class="button medium ed-btn__primary" type="primary">Click to upload</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item class="avatar-image col-12">
          <img v-if="!formTeacherData.avatar" class="card-picture" src="../../../../../assets/images/avatar-aux.png" />
          <img v-if="formTeacherData.avatar" class="card-picture" :src="formTeacherData.avatar" />
          <el-upload class="left avatar-uploader" action="https://educationalschool.iteg.com.np/images" :multiple="false" accept="image/*" :show-file-list="false">
            <button class="button medium ed-btn__primary">
              <i class="icon icon-profile"></i>
              Upload Avatar Image</button>
            <div slot="tip" class="el-upload__tip">NOTE: Allowed format *.jpg only</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="modal-footer">
      <el-button @click="validateTeacherProfile()" class="button medium ed-btn__primary right" style="margin-left:15px !important;">
        <span v-if="type=='Add'">Submit</span>
        <span v-if="type=='Edit'">Edit</span>
      </el-button>
      <el-button @click="clearChangesProfile()" class="button medium ed-btn__secondary right">Clear</el-button>
      <el-button @click="cancelChangesProfile()" class="button medium ed-btn__tertiary right">Cancel</el-button>
    </div>
  </md-dialog>
</template>

<script>
  export default {
    name: "add-edit-employee",
    components: {

    },
    // DATA
    data: () => ({
      sn: 0,
      type: "",
      loadedData: [],
      busy: false,
      addEditEmployeeModal: false,
      formTeacherDataEmpty: {},
      formTeacherData: {
        sn: 0,
        avatar: "",
        firstName: "",
        middleName: "",
        lastName: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        birthDate: "",
        qualification: "",
        agreementType: "",
        selectDepartment: "",
        joinedDate: "",
        employeeType: "",
        additionals: "",
        status: "",
        resignedDate: "",
        designation: "",
        biodata: ""
      },
      rules: {
        //RULES 
        firstName: [{
          required: true,
          message: "First Name Required!",
          trigger: "blur",
        }],
        lastName: [{
          required: true,
          message: "Last Name Required!",
          trigger: "blur",
        }],
        address: [{
          required: true,
          message: "Address Required!",
          trigger: "blur",
        }],
        phone: [{
            required: true,
            message: "Phone Number Required!",
            trigger: "blur",
          },
          {
            pattern: /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
            max: 20,
            message: "Invalid phone",
            trigger: "change",
          }
        ],
        email: [{
            required: true,
            message: "Email is required",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Invalid email",
            trigger: "change",
          }
        ],
        agreementType: [{
          required: true,
          message: "Agreement Type is required",
          trigger: "blur",
        }],
        status: [{
          required: true,
          message: "Status is required",
          trigger: "blur",
        }]
      },
      options: {
        //OPTIONS
        agreementTypeOptions: [{
            value: 'Full Time',
            label: 'Full Time'
          },
          {
            value: 'Part Time',
            label: 'Part Time'
          },
          {
            value: 'Hourly Basis',
            label: 'Hourly Basis'
          }
        ],
        selectDepartmentOptions: [{
            value: 'Administrative',
            label: 'Administrative'
          },
          {
            value: 'Academic',
            label: 'Academic'
          },
          {
            value: 'ECA',
            label: 'ECA'
          },
          {
            value: 'Account',
            label: 'Account'
          }
        ],
        employeeTypeOptions: [{
            value: 'Faculty',
            label: 'Faculty'
          },
          {
            value: 'Staff',
            label: 'Staff'
          }
        ],
        statusOptions: [{
            value: 'Currently Working',
            label: 'Currently Working'
          },
          {
            value: 'On Leave',
            label: 'On Leave'
          },
          {
            value: 'Left',
            label: 'Left'
          }
        ]
      },
      fileList: [{
        name: 'biodata.doc',
        url: ''
      }]
    }),
    props: {
      addEditEmployeeModalParent: Boolean,
    },
    watch: {
      addEditEmployeeModalParent: function() {
        this.addEditEmployeeModal = true;
      }
    },
    methods: {
      openModal(sn, type) {
        this.sn = sn;
        this.type = type;
        this.addEditEmployeeModal = true;

        if(type==="Add"){
          this.formTeacherData = this.formTeacherDataEmpty
        }
        if(type==="Edit"){
          this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/single-employee-edit.json").then((response) => {
            this.totalSize = response.data.length;
            this.loadedData = JSON.parse(JSON.stringify(response.data[0]));

            this.formTeacherData = response.data[0];

            this.busy = false;
          }).catch((error) => error.response.data)         
        }
      },
      validateTeacherProfile() {
        return new Promise((resolve) => {
          this.$refs.formTeacherData.validate((valid) => {
            this.$emit('on-validate', valid, this.model)
            resolve(valid);
            if (valid)
              this.addEditFormSave();
          });
        })
      },
      updateForm(input, value) {
        this.formTeacherData[input] = value;
      },
      addEditFormSave() {
        // API endpoint
        this.addEditEmployeeModal = false;
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 1, you selected ${files.length} file.`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      },
      clearChangesProfile() {
        const formTeacherDataEmpty = JSON.parse(JSON.stringify(this.formTeacherDataEmpty));
        this.formTeacherData = formTeacherDataEmpty;
      },
      cancelChangesProfile() {
        this.addEditEmployeeModal = false;
      }
    }
  }

</script>
