import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import SchoolReports from "../pages/SchoolReports";
import SearchResults from "../pages/SearchResults";
import Manage from "../pages/Manage";
import StudentRank from "../pages/SchoolReports/StudentRank";
import ListTemplate from "../pages/Settings/ListTemplate/ListTemplate";
import ClassPeriod from "../pages/Manage/Class/ClassPeriod/ClassPeriod";
import AssignStudent from "../pages/Manage/Class/ClassRoom/AssignStudent";
import ReleaseStudent from "../pages/Manage/Class/ClassRoom/ReleaseStudent";
import AllocatedStudent from "../pages/Manage/Class/ClassRoom/AllocatedStudent";
import UnitSchedule from "../pages/Manage/Class/ClassRoom/UnitSchedule";
import RecurringSchoolSchedule from "../pages/Manage/Class/RecurringSchoolSchedule/RecurringSchoolSchedule";

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
      },
      {
        path: "/list-template",
        name: "List Template",
        component: ListTemplate
      },
      {
        path: "/recurring-school-schedule",
        name: "Recurring School Schedule",
        component: RecurringSchoolSchedule
      },
      {
        path: "/class-period",
        name: "Class Period",
        component: ClassPeriod
      },
      {
        path: "/class-period/assign-student/:id",
        name: "Assign Student",
        component: AssignStudent
      },
      {
        path: "/class-period/release-student/:id",
        name: "Release Student",
        component: ReleaseStudent
      },
      {
        path: "/class-period/allocated-student/:id",
        name: "Allocated Student",
        component: AllocatedStudent
      },
      {
        path: "/class-period/unit-schedule/:id",
        name: "Unit Schedule",
        component: UnitSchedule
      }
    ]
  });
  