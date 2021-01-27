<template>
<div class="row search-results">
    <div v-for="(item, index) in posts" :key="index" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 ed_card-boxes">
      <div class="card-box">
        <div class="card-title">
          <h2>{{ item.name }} {{ item.surname }}</h2>
        </div>
        <div class="card-content">
          <figure>
            <img v-if="!item.avatar" class="card-picture" src="../../../../../assets/images/avatar-aux.png" />
            <img v-if="item.avatar" class="card-picture" :src="item.avatar" />
            <figcaption>
              <ul>
                <li class="attendance-list-avatar">
                  <h3>SN:</h3>
                  <span>{{item.sn}}</span>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Name:</h3>
                  <span>{{item.name}}</span>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Surname:</h3>
                  <span>{{item.surname}}</span>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Email:</h3>
                  <span>{{item.email}}</span>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Status:</h3>
                  <span>{{item.status}}</span>
                </li>
                <li class="attendance-list-avatar">
                  <h3>Agreement Type:</h3>
                  <span>{{item.agreementType}}</span>
                </li>
                <li>
                  <!-- MANGE ACTIONS START -->
                    <ManageEmployeeActions 
                      :parentDataTab="posts"
                      :parentDataTabSN="item.sn"
                      :deleteCodeConfirmParent="deleteCodeConfirm"
                      :deleteCodeConfirmRoot="idx"
                    />
                  <!-- MANAGE ACTIONS END -->
                </li>
              </ul>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import ManageEmployeeActions from '../actions/ManageEmployeeActions.vue'

  export default {
    name: "manage-employee-avatar",
    components: {
      ManageEmployeeActions
    },
    data() {
      return {
          sn:0,
          idx:0,
          posts:[]
      }
    },
    props: {
      parentData: Array,
      parentDataSN: Number,
      deleteCodeConfirmRoot: Function
    },
    watch: {
      parentData: function() {
        this.posts = this.parentData;
      },
      parentDataSN: function() {
        this.sn = this.parentData;
      }
    },
    methods: {
      deleteCodeConfirm(idx){
        this.deleteCodeConfirmRoot(idx);
      },
      loadMore() {
        this.posts = this.parentData;
        this.sn = this.parentDataSN;
      }
    },
    created() {
      this.loadMore();
    },
  };

</script>
