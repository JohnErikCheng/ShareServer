<template>
  <div>
    <template v-for="item in menus">
      <el-submenu v-if="hasChildren(item)" :index="item.id">
        <template slot="title">
          <i :class="'el-icon-location '"></i>
          <span>{{item.menuName}}</span>
        </template>
        <menu-list :menus="item.childs"></menu-list>
      </el-submenu>
      <el-menu-item v-if="!hasChildren(item)" :index="item.dataUrl" >{{item.menuName}}</el-menu-item>
    </template>
  </div>
</template>

<script type="text/javascript">
  export default {
    comments: {},
    name: "menu-list",
    props: ["menus"],
    data: function () {
      return {

      }
    },
    methods: {
      hasChildren:function (item) {
        return item && item.childs && item.childs.length>0;
      }
    }
  }
</script>
