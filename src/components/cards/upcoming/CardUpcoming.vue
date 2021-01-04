<template>
   <div class="card-box flex-fill upcoming-box">
     <div class="card-title d-flex justify-content-between align-items-center">
       <h2>Upcoming Lesson Plans</h2>
       <a href="#" class="select"><i class="icon icon-dots"></i></a>
     </div>
     <div class="card-content d-flex">
       <ul>
         <li v-for="(post, idx) in posts" :key="idx" class="row d-flex justify-content-around">
           <div class="card-element col-3 col-lg-3">
             <img class="card-avatar" src="../../../assets/img/users/avatar-1.jpg" alt="user" />
           </div>
           <div class="card-element col-6 col-lg-5">
             <h3>{{post.subject}}</h3>
             <p>
               <a href="#" class="element">
                 <el-tooltip class="item" effect="dark" content="Location" placement="top">
                  <i class="icon icon-location"></i>
                 </el-tooltip>  
                </a>
               <small>{{post.type}}</small>
             </p>
           </div>
           <div class="card-element col-3 col-lg-4">
             <a href="#" class="element">
              <el-tooltip class="item" effect="dark" content="Edit" placement="top">
                <i class="icon icon-edit"></i>
              </el-tooltip>
             </a>
             <a href="#" class="element">
                <el-tooltip class="item" effect="dark" content="Delete" placement="top">
                  <i class="icon icon-delete"></i>
                </el-tooltip>
             </a>
           </div>
         </li>
       </ul>
       <div v-if="busy" class="preloader">
         <span><img src="../../../assets/images/preloader.gif" /> Loading...</span>
       </div>
     </div>
     <div class="card-all">
       <a href="#">view all +</a>
     </div>
   </div>
</template>

<script>
   export default {
     name: "upcoming",
     components: {}, 
     // DATA
     data: () => ({
       posts: [],
       limit: 3,
       busy: true
     }),
     // METHODS
     methods: {
       loadMore() {
         this.busy = true;
         const lessonPlanStorage = this.loadLessonPlanStorage();

         if (lessonPlanStorage) {

            const append = lessonPlanStorage.slice(
              this.posts.length,
              this.posts.length + this.limit
            );

            this.posts = append;

           this.busy = false;
         } else {
           this.axios.get("https://raw.githubusercontent.com/nmihin/ed-intelligence-teacher__deploy/master/lesson-plan.json").then((response) => {

            const append = response.data.slice(
              this.posts.length,
              this.posts.length + this.limit
            );

             this.posts = append;

             localStorage.setItem("lessonPlanJSONData",JSON.stringify(response.data));
             this.busy = false;
           }).catch((error) => error.response.data)
         }
       },
       // LOCALSTORAGE
       loadLessonPlanStorage() {
         return JSON.parse(localStorage.getItem("lessonPlanJSONData"));
       }
     },
     created() {
       this.loadMore();
     }
   }
</script>