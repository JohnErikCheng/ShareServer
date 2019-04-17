<template>
  <div class="entry-field">
    <el-form
      ref="form"
      label-position="right"
      label-width="10px"
      :inline="true"
      :model="dataForm"
      @keyup.enter.native="getDataList()"
    >
      <el-row>
        <el-col :span="6">
          <el-form-item>
            <el-input v-model="dataForm.roleName" placeholder="角色名称" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="getDataList()">查询</el-button>
        <el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button type="danger"  @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <hr>
    <el-table
      :data="dataList===''?null:dataList.slice((pageIndex-1)*pageSize,pageIndex*pageSize)"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;"
    >
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="roleId" header-align="center" align="center" width="80" label="ID"></el-table-column>
      <el-table-column prop="roleName" header-align="center" align="center" label="角色名称"></el-table-column>
      <el-table-column prop="remark" header-align="center" align="center" label="备注"></el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        width="180"
        label="创建时间"
      ></el-table-column>
      <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.roleId)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.roleId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[1, 3, 5, 10]"
      :page-size="pageSize"
      :total="dataList.length"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from 'components/roleAddOrUpdate';
import axios from "axios";
export default {
  data() {
    return {
      dataForm: {
        roleName: ""
      },
      newList: [],
      dataList: [
        {
          roleId: 1,
          roleName: "管理员",
          remark: "管理员",
          createTime: "2019-04-10 13:01:01"
        },
        {
          roleId: 2,
          roleName: "饲养员",
          remark: "管理员",
          createTime: "2019-04-10 13:01:01"
        },
        {
          roleId: 3,
          roleName: "卫生员",
          remark: "管理员",
          createTime: "2019-04-10 13:01:01"
        },
        {
          roleId: 4,
          roleName: "消防员",
          remark: "管理员",
          createTime: "2019-04-10 13:01:01"
        }
      ],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      pageIndex: 1, //初始页
      pageSize: 10, //每页的条数
      totalPage: 0 //总数
    };
  },
  components: {
      AddOrUpdate,
    },
  activated() {
    //   keep-alive 组件激活时调用。
    // this.getDataList();
  },
  methods: {
    //获取数据列表
    getDataList() {
      var that = this;
      var text = that.dataForm.roleName;
      if (text === "") {
        this.dataList = this.dataList;
        return;
      } else {
        var len = that.dataList.length;
        for (var i = 0; i < len; i++) {
          var curText = that.dataList[i].roleName;
          if (curText.indexOf(text) != -1) {
            that.newList.push(that.dataList[i]);
          } else {
            continue;
          }
        }
        for (var i = 0; i < that.newList.length; i++) {
          console.log(111);
          that.dataList = [];
          that.dataList.push(that.newList[i]);
        }
      }

      //   this.dataListLoading = true;
      //   var url = "";
      //   axios
      //     .get("url", {
      //       params: {
      //         page: this.pageIndex,
      //         limit: this.pageSize,
      //         roleName: this.dataForm.roleName
      //       }
      //     })
      //     .then(data => {
      //       console.log(data);
      //       if (data && data.code === 0) {
      //         this.dataList = data.page.list
      //         this.totalPage = data.page.totalCount
      //       } else {
      //         this.dataList = []
      //         this.totalPage = 0
      //       }
      //       this.dataListLoading = false
      //     })
      //     .catch(error => {
      //       console.log(error);
      //     });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val;
    },
     // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
  },
  mounted() {}
};
</script>

<style>
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
</style>
