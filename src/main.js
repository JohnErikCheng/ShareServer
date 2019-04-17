import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import axios from 'axios';
import * as filters from './util/filter'
import ElementUI from 'element-ui';
import store from "./store";
import TreeUtils from "./util/TreeUtils";

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));//注册过滤器

axios.defaults.timeout = 30000;
axios.defaults.baseURL = 'http://127.0.0.1:8002/';

Vue.use(VueRouter);
Vue.use(ElementUI);

import Main from './components/main.vue';
import Login from "./components/login.vue";
import Test from "./components/test.vue";
import DataFilterConfig from "./components/user/dataFilterConfig.vue";
import AppInfo from "./components/appInfo.vue";
import AppManager from "./components/appManager.vue";
import RoleManager from "./components/roleManager.vue";
import AddOrUpdate from './components/roleAddOrUpdate.vue';
import resourceManager from "./components/resourceManager.vue";

var components = {
  code1: Test
};

var routes = [
  { path: '/login', name: "login", component: Login },
  { path: '/', name: "main", component: Main }
];
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.state.menus) {
    var routers = [
      {
        path: "/", component: Main, children:
          [
            { path: '/user/dataFilterConfig', component: DataFilterConfig },
            { path: '/user/appInfo', component: AppInfo },
            { path: '/user/appManager', component: AppManager },
            {
              path: '/user/roleManager',
              component: RoleManager,
              children:[
                { path: '/user/roleManager/addOrUpdate', component: AddOrUpdate },
              ]
            },
            { path: '/user/resourceManager', component: resourceManager },

          ]
      }
    ];
    router.addRoutes(routers);
    store.commit("menusLoaded");
    next(to.path);
  } else {
    next();
  }

  //next();


  /*if (to.name == "login") {
    next();
  } else if (!store.state.auth) {
    next({path: "/login"});
  } else if (!store.state.menus) {
    var routers = [{path: "/", name: "", component: Main, children: []}];
    axios.get("testSysAuthority").then(function (res) {
      if (res.status == 200) {
        TreeUtils(res.data, routers[0].children, components);
        router.addRoutes(routers);
        store.commit("menusLoaded");
        next();
      }
    });
  } else {
    next();
  }*/
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
