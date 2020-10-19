import Vue from "vue";
import Router from "vue-router";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import SchoolReports from "../pages/SchoolReports";
import Manage from "../pages/Manage";

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
      }
    ]
  });
  