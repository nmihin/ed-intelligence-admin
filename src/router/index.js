import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import SchoolReports from "../pages/SchoolReports";
import SearchResults from "../pages/SearchResults";
import Manage from "../pages/Manage";
import StudentRank from "../pages/SchoolReports/StudentRank";

import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Router);
Vue.use(Element, { locale });
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/home",
        name: "Home",
        component: Home
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings
      },
      {
        path: "/school-reports",
        name: "School Reports",
        component: SchoolReports
      },
      {
        path: "/manage",
        name: "Manage",
        component: Manage
      },
      {
        path: "/search-results",
        name: "Search Results",
        component: SearchResults   
      },
      {
        path: "/search-results/:searchResults",
        name: "Search Results",
        component: SearchResults
      },
      {
        path: "/student-rank",
        name: "Student Rank",
        component: StudentRank
      }
    ]
  });
  