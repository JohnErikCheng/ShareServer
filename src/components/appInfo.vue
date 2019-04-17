<template>
  <div>
    <div class="entry-field">
    <el-form  ref="form" label-position="right"  label-width="80px">
      <el-row>
        <el-col :span="7" >
          <el-form-item label-width="140px" label="应用ID：" >
            <el-input class="input-width" placeholder="请输入内容" v-model="form.appId" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" align="right">
          <el-button type="primary" @click="searchData">
            搜索
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    </div>
    <el-row >
      <el-col style="margin-left: 50px">
        <el-button type="primary" @click="dialogVisible = true">
          新增
        </el-button>
        <el-button type="primary" @click="openDialog">
          修改
        </el-button>
        <el-button type="primary" @click="dialogVisible = true">
          删除
        </el-button>
      </el-col>
    </el-row>
    <hr/>
    <el-row>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50">
        </el-table-column>
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column  label="应用ID" width="120" >
          <template slot-scope="scope">{{ scope.row.appId }}</template>
        </el-table-column>
        <el-table-column label="访问token有效时间(s)" prop="accessExpiresSecond" width="180">
        </el-table-column>
        <el-table-column prop="refreshExpiresSecond" label="刷新token有效时间(s)"  width="180" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="block" align="right">
        <!--<span class="demonstration">完整功能</span>-->
        <!--@size-change="handleSizeChange"
          @current-change="handleCurrentChange"-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[1,2,3,4,5]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-row>

      <!--@close="closeDialog"-->
    <el-dialog  :title="dgTitle" :visible.sync="dialogVisible"  width="50%"  :before-close="handleClose" >
      <!--<div slot="title" class="dialog-title">{{dgTitle}}</div>-->
      <datafields :row="tableInfo" ref="tag"></datafields>
        <div style="text-align: right">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import dataFields from "./user/dataFilterConfig"
  export default {
    components:{datafields:dataFields},
    data:function() {
      return {
        dgTitle:'',
        dialogVisible: false,
        tableData:[{
          appId: 'test',
          accessExpiresSecond: '20',
          refreshExpiresSecond: '10'
        }],
        form: {
          appId: '',
          secret:'',
          accessExpiresSecond:'',
          refreshExpiresSecond:''
        },
        tableInfo: {
          multipleSelection: [],
          singleSelection:{}
        },
        page: {
          currentPage:1,
          //pageSizes: "[1,2,3,4,5]"
          pageSize:5,
          total: 10
        }
      }
    },
    methods: {
      searchData() {
        var form = new FormData();
        form.append("appId",this.form.appId);
        form.append("pageSize",this.page.pageSize);
        form.append("pageNo", this.page.currentPage);
        var _self = this;
        axios.post("/getAppList",form).then(function(res){
          if(res.status==200) {
            _self.tableData = res.data.rows;
            _self.processPage({'pageNo': res.data.pageNo,'pageSize': res.data.pageSize, 'total':res.data.total});
          }
        }).catch(function(e){
          alert(e);
        });

      },
      handleCurrentChange(val) {
        this.page.currentPage = val;
        this.searchData();
      },
      handleSizeChange(val) {
        this.page.pageSize = val;
        this.searchData();
      },
      openDialog() {
        this.dgTitle='编辑';
        if(!this.tableInfo.multipleSelection || this.tableInfo.multipleSelection.length != 1) {
          this.$alert('请选择一条记录进行操作！', '提示', {
            type: 'info',
            confirmButtonText: '确定',
            callback: action => {
              /*this.$message({
                type: 'info',
                message: `action: ${ action }`
              });*/
            }
          });
          return;
        }
        this.tableInfo.singleSelection = this.tableInfo.multipleSelection[0];
        this.dialogVisible = true;
      },
      closeDialog() {
        var _self = this;
        this.$confirm("确认关闭？")
          .then(_ => {
            _self.dialogVisible = false;
          }).catch(_ => {
          return;
        });
      },
      handleClose(done) {
        this.$refs["tag"].clearForm();
        done();
        //arguments[0]();
        /*//调用子组件里的方法，需要在子组件里使用ref="tag"
        this.$refs["tag"].handleCheckAllChange(false);*/
        /*var _self = this;
        this.$confirm('确认关闭？')
          .then(_ => {
            _self.dialogVisible = false;
          })
          .catch(_ => {
            return;
          });*/
      },
      handleSelectionChange(val) {
        this.tableInfo.multipleSelection = val;
      },
      processPage(data) {
        this.page.currentPage = data.pageNo;
        this.page.pageSize = data.pageSize;
        this.page.total = data.total;
      }
    },
    watch:{
      /*selectVal:function (newV,oldV) {

        //alert(typeof(newV)+" : "+ typeof(oldV) + "  ---  " + newV + " == "+oldV  );
      }*/
    },
    created:function () {
      var _self = this;
      var form = new FormData();
      form.append("pageSize",this.page.pageSize);
      form.append("pageNo", this.page.currentPage);
      axios.post("/getAppList", form).then(function(res){
        if(res.status==200) {
          _self.tableData = res.data.rows;
          _self.processPage({'pageNo': res.data.pageNo,'pageSize': res.data.pageSize, 'total':res.data.total});
        }
      }).catch(function(e){
        alert(e);
      });
    }
  }
</script>

<style scoped="this">
  .input-suffix {
    margin-bottom: 15px;
  }
  .input-width {
    width:200px;
  }
  .entry-field {
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    /*word-break: break-word;*/
    margin: 10px;
    background-color: #fff;
  }
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
