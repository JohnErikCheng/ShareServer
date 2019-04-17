<template>
  <div>
    <div class="entry-field">
      <el-form ref="form" label-position="right" label-width="80px">
        <el-row>
          <el-col :span="7">
            <el-form-item label-width="100px" label="应用名称：">
              <el-input class="input-width" placeholder="应用名称" v-model="form.appName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label-width="100px" label="公司名称：">
              <el-input class="input-width" placeholder="公司名称" v-model="form.companyName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label-width="100px" label="联系人员：">
              <el-input class="input-width" placeholder="联系人员" v-model="form.contacts"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label-width="100px" label="联系电话：">
              <el-input class="input-width" placeholder="联系电话" v-model="form.telephone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 操作按钮 -->
        <el-row>
          <el-col style="margin-left: 50px">
            <el-button type="primary" v-on:click="searchData">查询</el-button>
            <el-button type="primary" v-on:click="addEquipment">新增</el-button>
            <el-button type="primary" v-on:click="editEquipent">编辑</el-button>
            <el-button type="primary" v-on:click="resetData">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <hr/>
    <!--  展示列表的title -->
    <el-row>
      <el-table :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
                tooltip-effect="dark" style="width: 100%" v-on:selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column label="应用ID" width="120" prop="appId"></el-table-column>
        <el-table-column label="应用名称" width="140" prop="appName"></el-table-column>
        <el-table-column label="公司名称" width="140" prop="companyName"></el-table-column>
        <el-table-column label="注册号" width="140" prop="registNum"></el-table-column>
        <el-table-column label="状态" width="100" prop="state"></el-table-column>
        <el-table-column label="联系人" width="140" prop="contacts"></el-table-column>
        <el-table-column label="联系电话" width="140" prop="telephone"></el-table-column>
        <el-table-column label="创建时间" width="140" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="100" prop="operate"></el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="block" align="right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[1,2,3,4,5]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </el-row>
    <!-- 新增/修改 对话框 -->
    <!--<el-dialog title="添加应用" :visible.sync="dialogVisible" hight="50%" width="50%" :before-close="handleClose">

      <span slot="footer" class="dialog-footer">
        <el-button v-on:click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" v-on:click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" :before-close="handleClose">
      <el-form :model="form">
        <el-form-item label="应用ID">
          <el-input v-model="tableInfo.singleSelection.appId" property="appId" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="应用名称">
          <el-input v-model="tableInfo.singleSelection.appName" property="appName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="公司名称">
          <el-input v-model="tableInfo.singleSelection.companyName" property="companyName"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册号">
          <el-input v-model="tableInfo.singleSelection.registNum" property="registNum" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-input v-model="tableInfo.singleSelection.state" property="state" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="tableInfo.singleSelection.contacts" property="contacts" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="联系电话">
          <el-input v-model="tableInfo.singleSelection.telephone" property="telephone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="tableInfo.singleSelection.createTime" property="createTime" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button v-on:click="cancleDialog">取 消</el-button>
        <el-button type="primary" v-on:click="(titleMap[dialogStatus] === '新增设备')?addMethod():editMethod(tableInfo.singleSelection.appId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from "axios";
  import dataFields from "./user/dataFilterConfig"

  export default {
    data: function () {
      return {
        dialogFormVisible: false,
        form: {
          appId: '',
          appName: '',
          companyName: '',
          registNum: '',
          contacts: '',
          telephone: '',
          state: '',
          createTime: '',
          operate:''
        },
        tableInfo: {
          multipleSelection: [],
          singleSelection: {}
        },
        page: {
          currentPage: 1,//初始页
          pageSize: 3,//每页的条数
          total: '',//总数
        },
        tableData: [{
          appId: '123456789',
          appName: '合肥研究院',
          companyName: '清华大学合肥公共安全研究院',
          registNum: '34123067584232735282',
          contacts: '王小虎',
          telephone: '13857645289',
          state: '已激活',
          createTime: '2019-04-03 09:30:00',
          operate:'删除'
        }, {
          appId: '234567891',
          appName: '合肥研究院',
          companyName: '清华大学合肥公共安全研究院',
          registNum: '34123067584232735282',
          contacts: '王小虎',
          telephone: '13857645289',
          state: '已激活',
          createTime: '2019-04-03 09:30:00',
          operate:'删除'
        }, {
          appId: '345678912',
          appName: '合肥研究院',
          companyName: '清华大学合肥公共安全研究院',
          registNum: '34123067584232735282',
          contacts: '王小虎',
          telephone: '13857645289',
          state: '已激活',
          createTime: '2019-04-03 09:30:00',
          operate:'删除'
        }, {
          appId: '456789123',
          appName: '合肥研究院',
          companyName: '清华大学合肥公共安全研究院',
          registNum: '34123067584232735282',
          contacts: '王小虎',
          telephone: '13857645289',
          state: '已激活',
          createTime: '2019-04-03 09:30:00',
          operate:'删除'
        }, {
          appId: '567891234',
          appName: '合肥研究院',
          companyName: '清华大学合肥公共安全研究院',
          registNum: '34123067584232735282',
          contacts: '王小虎',
          telephone: '13857645289',
          state: '已激活',
          createTime: '2019-04-03 09:30:00',
          operate:'删除'
        },],
        //新增or编辑弹框标题(根据点击的新增or编辑按钮显示不同的标题)
        titleMap: {
          addEquipment: '新增设备',
          editEquipent: "编辑设备"
        },
        //新增和编辑弹框标题
        dialogStatus: "",
      }
    },
    methods: {
      delData(index) {

      },
      //新增
      addEquipment() {
        //显示弹框
        this.dialogFormVisible = true,
        //新增弹框标题
        this.dialogStatus = "addEquipment"
      },
      //编辑
      editEquipent() {
        if (!this.tableInfo.multipleSelection || this.tableInfo.multipleSelection.length != 1) {
          this.$alert('请选择一条记录进行操作！', '提示', {
            type: 'info',
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return;
        }
        this.tableInfo.singleSelection = this.tableInfo.multipleSelection[0];
        console.log(this.tableInfo.singleSelection)
        //编辑弹框标题
        this.dialogStatus = "editEquipent";
        //显示弹框
        this.dialogFormVisible = true;
      },
//      新增/修改确认
      addMethod() {
          this.tableData.push(this.tableInfo.singleSelection)
          this.tableInfo.singleSelection = '',
          this.dialogFormVisible = false
      },
      editMethod(index) {
        this.tableInfo.singleSelection = '',
          this.dialogFormVisible = false
      },
//      取消会话
      cancleDialog() {
        this.tableInfo.singleSelection = {},
          this.dialogFormVisible = false
      },
//      点击x按钮之后的确认
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
//        查询数据
      searchData: function () {
        var form = new FormData();
        form.append("appId", this.form.appId);
        form.append("pageSize", this.page.pageSize);
        form.append("pageNo", this.page.currentPage);
        /*  var _self = this;
         axios.get('/searchByCondition', form).then(function (res) {
         if (res.status == 200) {
         _self.tableData = res.data.rows;
         _self.processPage({'pageNo': res.data.pageNo, 'pageSize': res.data.pageSize, 'total': res.data.total});
         }
         }).catch(function (e) {
         alert(e);
         });*/
      },
//      重置按钮
      resetData: function () {
        this.form.appName = '',
          this.form.companyName = '',
          this.form.contacts = '',
          this.form.telephone = ''
      },
//      关闭对话框的处理
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
//      分页展示
      handleCurrentChange(currentPage) {
        this.page.currentPage = currentPage;
        this.searchData();
      },
      handleSizeChange(size) {
        this.page.pageSize = size;
        this.searchData();
      },
      handleSelectionChange(val) {
        this.tableInfo.multipleSelection = val;
      },
      /*processPage(data) {
       this.page.currentPage = data.pageNo;
       this.page.pageSize = data.pageSize;
       this.page.total = data.total;
       },*/
    }
  }

</script>

<style scoped="this">
  .input-suffix {
    margin-bottom: 15px;
  }

  .input-width {
    width: 200px;
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

  html {
    background-color: #d1d1d1
  }

</style>
