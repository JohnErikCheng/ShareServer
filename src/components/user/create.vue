<template>
  <el-card style="width: 400px;margin:20px auto;">
    <el-row>
      <el-col :span="8">角色编码：</el-col>
      <el-col :span="16">
        <el-input v-model="currentRole.role" placeholder=""></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">角色名称:</el-col>
      <el-col :span="16">
        <el-input v-model="currentRole.description" placeholder=""></el-input>
      </el-col>
    </el-row>
    <el-row style="margin-top: 15px;">
      <el-col :span="8">可操作性:</el-col>
      <el-col :span="16">
        <el-switch v-model="currentRole.available"></el-switch>
      </el-col>
    </el-row>
    <input type="hidden" v-model="currentRole.id"/>
    <div style="margin-top: 10px;">
      <el-button type="primary" icon="el-icon-check" @click="submit">保存</el-button>
      <el-button type="info" icon="el-icon-close" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script type="text/javascript">
  export default {
    props :["role"] ,
    data:function () {
      return {
          currentRole:{}
      }
    },
    created:function () {
      this.currentRole=this.role;
    },
    methods: {
      cancel:function () {
        this.$emit("cancel");
      },

      submit:function () {
        this.$emit("save",this.currentRole);
      }
    },
    watch:{
      role:function (value) {
        this.currentRole=value;
      }
    }
  }
</script>
