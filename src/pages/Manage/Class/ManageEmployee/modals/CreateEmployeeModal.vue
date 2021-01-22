<template>
  <!-- Main Content START -->
  <md-dialog :md-active.sync="userAccountEmployeeModal" class="modal-window employee-account">
    <h2 class="modal-title">User Account</h2>
    <div class="modal-content">
      <el-form class="row" :model="formTeacherEntryData" :rules="rules" ref="formTeacherEntryData">
          <el-form-item label="User Type" prop="userType" class="col-12 col-sm-4">
            <el-select @change="updateForm('userType', formTeacherEntryData.userType)" v-model="formTeacherEntryData.userType" placeholder="User Type">
              <el-option v-for="pre in options.userTypeOptions" :key="pre.value" :label="pre.label" :value="pre.value">
              </el-option>
            </el-select>
            <i class="icon icon-arrow"></i>
          </el-form-item>
          <el-form-item label="First Name" prop="firstName" class="col-12 col-sm-4">
            <el-input @input="updateForm('firstName', formTeacherEntryData.firstName)" v-model="formTeacherEntryData.firstName" placeholder="First Name">
            </el-input>
          </el-form-item>
          <el-form-item label="Last Name" prop="lastName" class="col-12 col-sm-4">
            <el-input @input="updateForm('lastName', formTeacherEntryData.lastName)" v-model="formTeacherEntryData.lastName" placeholder="Last Name">
            </el-input>
          </el-form-item>
          <el-form-item label="Username" prop="username" class="col-12 col-sm-4">
            <el-input @input="updateForm('username', formTeacherEntryData.username)" v-model="formTeacherEntryData.username" placeholder="Username">
            </el-input>
          </el-form-item>
          <el-form-item label="Password" prop="password" class="col-12 col-sm-4">
            <el-input auto-complete="off" type="password" @input="updateForm('password', formTeacherEntryData.password)" v-model="formTeacherEntryData.password" placeholder="Password">
            </el-input>
          </el-form-item>
          <el-form-item label="Confirm Password" prop="reTypePassword" class="col-12 col-sm-4">
            <el-input auto-complete="off" type="password" @input="updateForm('reTypePassword', formTeacherEntryData.reTypePassword)" v-model="formTeacherEntryData.reTypePassword" placeholder="Confirm Password">
            </el-input>
          </el-form-item>
          <el-form-item label="Acccount Status" prop="accountStatus" class="col-12 col-sm-4">
            <el-radio-group @change="updateForm('accountStatus', formTeacherEntryData.accountStatus)" v-model="formTeacherEntryData.accountStatus">
              <el-radio label="Active">Active</el-radio>
              <el-radio label="Inactive">Inactive</el-radio>
            </el-radio-group>
          </el-form-item>
      </el-form>
    </div>
    <md-dialog-actions>
      <el-button @click="userAccountEmployeeModal = false" class="button medium ed-btn__tertiary right">Cancel</el-button>
      <el-button @click="validateTeacherProfile()" class="button medium ed-btn__primary right" style="margin-left:15px !important;">Submit</el-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  // COMPONENTS
  export default {
    name: "create-account-employee-profile",
    components: {

    },
    // DATA
    data: () => ({
      userAccountEmployeeModal: false,
      formTeacherEntryData: {
        sn: 0,
        firstName: "",
        lastName: "",
        username: "",
        userType: "",
        password: "",
        reTypePassword: "",
        accountStatus: ""
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
        username: [{
          required: true,
          message: "Username Required!",
          trigger: "blur",
        }],
        userType: [{
          required: true,
          message: "User Type Required!",
          trigger: "blur",
        }],
        password: [{
          required: true,
          message: "Password Required!",
          trigger: "blur",
        }],
        reTypePassword: [{
          required: true,
          message: "Confirm Password Required!",
          trigger: "blur",
        }],
        accountStatus: [{
          required: true,
          message: "Account Status Required!",
          trigger: "blur",
        }]
      },
      options: {
        //OPTIONS
        userTypeOptions: [{
            value: 'su_admin',
            label: 'su_admin'
          },
          {
            value: 'admin',
            label: 'admin'
          },
          {
            value: 'board',
            label: 'board'
          },
          {
            value: 'teacher',
            label: 'teacher'
          },
          {
            value: 'student',
            label: 'student'
          },
          {
            value: 'parent',
            label: 'parent'
          },
          {
            value: 'developer',
            label: 'developer'
          },
          {
            value: 'new role',
            label: 'new role'
          },
          {
            value: 'editor',
            label: 'editor'
          },
          {
            value: 'techican',
            label: 'techican'
          }
        ]
      }
    }),
    props: {
      userAccountEmployeeModalParent: Boolean
    },
    watch: {
      userAccountEmployeeModalParent: function() {
        this.userAccountEmployeeModal = true;
      }
    },
    methods: {
      openModal(sn) {
        this.sn = sn;

        this.formTeacherEntryData = {
          sn: sn,
          firstName: "",
          lastName: "",
          username: "",
          userType: "",
          password: "",
          reTypePassword: "",
          accountStatus: ""
        }

        this.userAccountEmployeeModal = true;
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
        this.userAccountEmployeeModal = false;
      }
    }
  }

</script>
