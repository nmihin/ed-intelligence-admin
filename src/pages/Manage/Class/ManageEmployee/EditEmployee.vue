<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <el-form class="teacher-profile" :model="formTeacherData" :rules="formTeacherData.rules" ref="formTeacherData">
          <div class="row">
            <div class="side-menu__results card-boxes lessons_teacher">
              <!-- Box -->
              <div class="card-box">
                <div class="card-title">
                  <h2>Edit information</h2>
                </div>
                <div class="card-content">
                  <div class="row">
                    <el-form-item label="First Name" prop="name" class="col-6">
                      <el-input @input="updateForm('name', formTeacherData.name)" v-model="formTeacherData.name" placeholder="First Name">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Last Name" prop="surname" class="col-6">
                      <el-input @input="updateForm('surname', formTeacherData.surname)" v-model="formTeacherData.surname" placeholder="Last Name">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Organization" prop="organization" class="col-6">
                      <el-input @input="updateForm('organization', formTeacherData.organization)" v-model="formTeacherData.organization" placeholder="Organization">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Address" prop="address" class="col-6">
                      <el-input @input="updateForm('address', formTeacherData.address)" v-model="formTeacherData.address" placeholder="Address">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Contact Number" prop="phone" class="col-6">
                      <el-input @input="updateForm('phone', formTeacherData.phone)" v-model="formTeacherData.phone" placeholder="Contact Number">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Qualification" prop="qualification" class="col-6">
                      <el-input @input="updateForm('qualification', formTeacherData.qualification)" v-model="formTeacherData.qualification" placeholder="Qualification">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Google Classroom (LMS)" prop="googleClassroomLMS" class="col-6">
                      <el-input @input="updateForm('googleClassroomLMS', formTeacherData.googleClassroomLMS)" v-model="formTeacherData.googleClassroomLMS" placeholder="Google Classroom (LMS)">
                      </el-input>
                    </el-form-item>
                    <el-form-item label="Two Factor Authentification" prop="twoFactoryAuthentification" class="col-6">
                      <el-radio-group @change="updateForm('twoFactoryAuthentification', formTeacherData.twoFactoryAuthentification)" v-model="formTeacherData.twoFactoryAuthentification">
                        <el-radio label="Enabled">Enabled</el-radio>
                        <el-radio label="Disabled">Disabled</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </div>
                  <el-button @click="validateTeacherProfile()" class="button medium ed-btn__primary right">Save changes</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="row">
        <div v-if="busy" class="preloader">
          <span><img src="../../../../../assets/images/preloader.gif" /> Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // COMPONENTS
  import RecordsComponent from '../../../../components/records/RecordsComponent.vue';
  import SearchContentComponent from '../../../../components/search/SearchContentComponent.vue';

  import ProfileEmployeeModal from './modals/ProfileEmployeeModal.vue';
  import DeleteEmployeeModal from './modals/DeleteEmployeeModal.vue';

  export default {
    name: "reccuring-school-schedule",
    components: {
      RecordsComponent,
      SearchContentComponent,
      DeleteEmployeeModal,
      ProfileEmployeeModal
    },
    // DATA
    data: () => ({
      posts: [],
      loadedData: [],
      busy: false
    }),
    methods: {
      loadMore() {
        this.busy = true;

        this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-admin/main/public/employee-list.json").then((response) => {
          this.totalSize = response.data.length;
          this.loadedData = response.data;
          this.posts = [];

          const append = response.data.slice(
            this.posts.length,
            this.posts.length + this.pageSize
          );

          this.posts = append;

          this.busy = false;
        }).catch((error) => error.response.data)
      }
    },
    created() {
      this.loadMore();
    }
  }

</script>
