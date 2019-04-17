<template>
  <el-card class="box-card" style="width: 400px;margin:100px auto;">
    <el-input placeholder="请输入用户名" v-model="username" clearable/>
    <div style="width: 10px;height: 20px;">&nbsp;</div>
    <el-input placeholder="请输入密码" v-model="password" clearable/>
    <div style="width: 10px;height: 20px;">&nbsp;</div>
    <el-switch v-model="remember" active-text="记住密码" style="float:right"/>
    <div style="width: 10px;height: 30px;">&nbsp;</div>
    <el-button type="primary" @click="submitRequest" style="margin-left: 20px;">登录</el-button>
  </el-card>
</template>

<script>
  import axios from "axios";
  export default {
    data: function () {
      return {
        username: "admin",
        password: "123456",
        remember:false
      }
    },
    created: function () {

    },
    methods:{
      submitRequest:function () {
        var self=this;
        if(this.username && this.password){
          var form = new FormData();
          form.append("username",this.username);
          form.append("password",this.password);
          axios.post("/login1",form).then(function (res) {
            if(res.status==200 && res.data.token){
              axios.defaults.headers.common['Authentication']=res.data.token;
              self.$store.commit("authed");
              self.$router.push("/main");
            }else{
              alert(res.msg)
            }
          }).catch(function (e) {
            alert(e);
          });
        }
      },

      clearData:function () {
        this.password="";
        this.username="";
      }
    }
  }
</script>

<style scoped="this">
  .mu-grid-list {
    float: left;
    width: 33%;
    margin-left: 1px !important;
  }

  .mu-grid-list > div {
    width: 100% !important;
    height: 90px !important;
  }

  .mu-grid-tile-titlebar {
    text-align: center;
    height: 30px;
  }

  .mu-grid-tile > img {
    float: left;
  }

  html{
    background-color:#d1d1d1
  }
</style>
