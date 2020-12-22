<template>
      <!-- Main Header -->
      <div class="header">
        <!-- Logo -->
        <div class="logo">
          <a href="/">
            <img src="../../../assets/images/logo.png" alt="Logo">
          </a>
        </div>
        <!-- logo-END -->
        <!-- Main Menu -->
        <div class="main-menu">
          <div class="container">
              <Mainmenu />
          </div>
        </div>
        <!-- main-menu-END -->

        <Profile />

      </div>
      <!-- main-header-END -->
</template>

<script>
import Mainmenu from '../../navigation/mainmenu/Mainmenu.vue'
import Profile from '../profile/Profile.vue'

export default {
  name: 'App',
  components: {
    Mainmenu,
    Profile
  }
}
</script>