<template>
  <el-row style="height: 100%;">
    <el-col :span="4" class="col-menu-left">
      <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <menu-list :menus="menuList"></menu-list>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script>
  import menuList from "./common/menu";
  import axios from "axios";
  export default {
    components: {menuList},
    created: function () {
      var self = this;
      //debugger
      /*axios.get("testSysAuthority").then(function (res) {
       if (res.status == 200) {
       self.menuList = res.data;
       }
       });*/
    },
    data: function () {
      return {
        menuList: [
            {dataUrl: "/user/dataFilterConfig", menuName: "设置外部数据过滤", childs: []},
            {dataUrl: "/user/appInfo",menuName: "app应用信息",childs: []},
            {dataUrl: "/user/appManager",menuName: "应用管理",childs: []},
            {dataUrl: "/user/roleManager",menuName: "角色管理",childs: []},
            {dataUrl: "/user/resourceManager",menuName: "资源管理",childs: []},
        ]
      }
    },
    methods: {}
  }
</script>
