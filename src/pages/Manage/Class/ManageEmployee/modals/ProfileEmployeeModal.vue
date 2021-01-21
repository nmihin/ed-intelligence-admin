<template>
  <md-dialog :md-active.sync="profileEmployeeModal" class="modal-window manage-employee-modal">
    <h2 class="modal-title">Profile of {{teacherData.firstName}} {{teacherData.lastName}}</h2>
    <div class="modal-content">
         <div class="row">
            <div class="col-xs-4 col-md-4">
              <div class="side-menu single profile">
                <div class="col-12 side-menu-header">
                  <div class="side-menu-profile">
                    <img v-if="!teacherData.avatar" class="card-picture" src="../../../../../assets/images/avatar-aux.png" />
                    <img v-if="teacherData.avatar" class="card-picture" :src="teacherData.avatar" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xs-8 col-md-8">
              <div class="row student-details">
                <div class="side-menu__results card-boxes lessons_teacher">
                  <ul class="col-12 profile-list">
                    <li>Full Name:<span>{{teacherData.firstName}} {{teacherData.lastName}}</span></li>
                    <li>Date of Birth:<span>{{teacherData.dateOfBirth}}</span></li>
                    <li>Qualification:<span>{{teacherData.qualification}}</span></li>
                    <li>Phone:<span>{{teacherData.phone}}</span></li>
                    <li>Agreement Type:<span>{{teacherData.agreementType}}</span></li>
                    <li>Joined Date:<span>{{teacherData.joinedDate}}</span></li>
                    <li>Basic Salary:<span>{{teacherData.basicSalary}}</span></li>
                    <li>Address:<span>{{teacherData.address}}</span></li>
                    <li>Department:<span>{{teacherData.department}}</span></li>
                    <li>Type:<span>{{teacherData.type}}</span></li>
                    <li>Status:<span>{{teacherData.status}}</span></li>
                    <li>Designation:<span>{{teacherData.designation}}</span></li>
                    <li>Code:<span>{{teacherData.code}}</span></li>
                    <li>Email:<span>{{teacherData.email}}</span></li>
                    <li>Bio-Data:<span>{{teacherData.bioData}}</span></li>
                  </ul>      
                </div>
              </div>
            </div>
        </div>
    </div>
    <md-dialog-actions>
      <button class="button medium ed-btn__tertiary" @click="profileEmployeeModal = false">Close</button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
  export default {
    name: "profile-employee",
    components: {},
    // DATA
    data: () => ({
        sn:0,
        teacherData: {
          avatar:"",
          firstName:"Reanna",
          lastName:"Gulgowski Oberbrunner",
          dateOfBirth:"1980-02-02",
          qualification:"Demarco_Williamson16",
          phone:"950-761-8259",
          agreementType:"Part Time",
          joinedDate:"2018-10-23",
          basicSalary:"",
          address:"702 jaida Curve",
          department:"Administrative",
          type:"Faculty",
          status:"Currently Working",
          designation:"Eveniet tenetur voluptatem",
          code:"",
          email:"reannaober@gmail.com",
          bioData:""
        },
        profileEmployeeModal : false
    }),
    props: {
        profileEmployeeModalParent: Boolean
    },
    watch: {
        profileEmployeeModalParent: function(){
            this.profileEmployeeModal = true;
        }
    },
    methods: {
      openModal(sn){
        this.sn = sn;
        this.profileEmployeeModal = true;
      }
    }
  }

</script>
