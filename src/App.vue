<template>
  <div id="app" class="theme-layout">
    <Header />
    <Subheader />
    <Mobilemenu />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/layout/header/Header.vue'
import Subheader from './components/layout/subheader/Subheader.vue'
import Mobilemenu from './components/navigation/mobilemenu/Mobilemenu.vue'
import Home from './pages/Home.vue'
import Manage from './pages/Manage.vue'
import SchoolReports from './pages/SchoolReports.vue'
import Settings from './pages/Settings.vue'
import Footer from './components/layout/footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Subheader,
    Mobilemenu,
    Home,
    Manage,
    SchoolReports,
    Settings,
    Footer
  },
  data() {
    return {
      showWhich: "Home"
    }
  }
}
</script>