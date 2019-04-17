<template>
  <div style="height: 100%;">
     <router-view keep-alive></router-view>
  </div>
</template>

<script>
  import "element-ui/lib/theme-chalk/index.css";
  require("./assets/css/common.css");
  require("./assets/css/icon.css");
  export default{
    components: {  },
    data: function() {
      return {  }
    },
    created:function(){
    }
  }
</script>
