<template>
  <div>
    <template v-if="!roleEdit">
      <el-card class="box-card">
        <el-row>
          <el-col :span="2" class="search-label">名称: </el-col>
          <el-col :span="8">
            <el-input v-model="rolename" placeholder="名称，精确查询"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: right">
            <el-button type="primary" @click="reloadData">查询</el-button>
          </el-col>
        </el-row>
      </el-card>

      <div class="table-header-button">
        <el-button type="primary" icon="el-icon-plus" @click="addNewRole">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="deleteSelection">删除</el-button>
      </div>

      <el-table :data="roleList" border style="width: 100%" @selection-change="changeSelection">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="role" label="角色编码" width="120" align="left"></el-table-column>
        <el-table-column prop="description" label="角色名称" width="180" align="center"></el-table-column>
        <el-table-column prop="available" label="可操作性" width="180" align="center">
          <template slot-scope="scope">
            <template v-if="scope.row.available"><span style="color: darkgreen">可操作</span></template>
            <template v-if="!scope.row.available"><span style="color: darkred">不可操作</span></template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="editRoleInfo(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
         :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="sumTotal">
      </el-pagination>
    </template>

    <template v-if="roleEdit">
        <create :role="currentRole" @cancel="cancel" @save="submitRole"></create>
    </template>
  </div>
</template>

<script>
  import axios from "axios";
  import create from "./user/create";
  export default {
      components:{create},
      data:function () {
        return {
          rolename:"",
          roleEdit:false,
          currentRole:{},
          selectionList:[],
          roleList:[ ],
          pageIndex:0,
          pageSize:10,
          sumTotal:0
        }
      },
      created:function () {
        this.reloadData();
      },
      methods:{
          changeSelection:function (rows) {
            this.selectionList = rows;
          },

          deleteSelection:function () {
             var dataList = [];
             var self=this;
             self.selectionList.forEach(function (item) {
                dataList.push(item.id);
             });
             var form=new FormData();
             form.append("ids",dataList);
             axios.post("/delete",form).then(function (rs) {
              if(rs.status==200){
                  self.pageIndex=0;
                  self.pageSize=10;
                  self.reloadData();
              }
             });
          },

          addNewRole:function () {
            this.currentRole={};
            this.roleEdit=true;
          },

          cancel:function () {
            this.roleEdit=false;
            this.currentRole={};
          },

          submitRole:function (role) {
            var self=this;
              var form = new FormData();
              form.append("available", !!role.available);
              form.append("id", role.id ? role.id : 0);
              form.append("role",role.role);
              form.append("description",role.description);
              axios.post("/createOrUpdate",form).then(function (res) {
                if(res.status==200 && res.data.code!="error"){
                  self.reloadData();
                  self.roleEdit=false;
                  self.currentRole={};
                }else{
                  alert("保存失败！");
                }
              }).catch(function (error) {
                alert(error);
              });
          },

          editRoleInfo:function (role) {
            this.currentRole=role;
            this.roleEdit=true;
          },

          reloadData:function () {
            var self=this;
            axios.get("/search",{params:{
                  length:self.pageSize,
                  start:self.pageIndex,
                  name:self.rolename
              }}).then(function (res) {
              if(res.status==200){
                self.roleList = res.data.data.records;
                self.sumTotal=res.data.data.total;
              }
            }).catch(function (error) {
              alert(error);
            });
          },

          handleSizeChange:function (val) {
            this.pageIndex=1;
            this.pageSize=val;
            this.reloadData();
          },

          handleCurrentChange:function (val) {
            this.pageIndex=val;
            this.reloadData();
          }
      },
  }
</script>

<style scoped="this">
  .el-card.box-card{
    margin-bottom:10px;
  }

  .search-label{
    height: 32px;
    padding-top: 8px;
    text-align: right;
    padding-right: 10px;
  }

  .table-header-button{
    margin-left: 10px;
    margin-bottom: 3px;
  }
</style>
