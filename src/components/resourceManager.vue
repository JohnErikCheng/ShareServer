<template>
  <div id="resourceManager">
    <div class="entry-field">
      <el-form ref="form" label-position="right" label-width="80px">
        <el-row>
          <el-col :span="7">
            <el-form-item label-width="100px" label="资源名称:">
              <el-input class="input-width" v-model="form.forName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label-width="100px" label="资源描述:">
              <el-input class="input-width" v-model="form.forDesc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label-width="100px" label="资源地址:">
              <el-input class="input-width" v-model="form.forUrl"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label-width="100px" label="参数说明:">
              <el-input class="input-width" v-model="form.forParams"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="14">
            <el-form-item label-width="100px" label="活动时间">
              <el-col :span="11">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="form.date1"
                  style="width: 100%;"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker
                  type="fixed-time"
                  placeholder="选择时间"
                  v-model="form.date2"
                  style="width: 100%;"
                ></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 操作按钮 -->
        <el-row>
          <el-col style="margin-left: 50px">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">编辑</el-button>
            <el-button type="primary" @click="resetHandle()">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <hr>
    <el-row>
      <el-table
        :data="tableData.slice((page.currentPage-1)*page.pageSize,page.currentPage*page.pageSize)"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column fixed prop="id" label="资源ID"></el-table-column>
        <el-table-column prop="name" label="资源名称"></el-table-column>
        <el-table-column prop="address" label="资源地址"></el-table-column>
        <el-table-column prop="description" label="资源描述"></el-table-column>
        <el-table-column prop="parameters" label="参数说明"></el-table-column>
        <el-table-column fixed prop="date" label="上传时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
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
          :total="tableData.length"
        ></el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      form: {
        forName: "",
        forDesc: "",
        forUrl: "",
        forParams: "",
        date1:'',
        date2:'',
      },
      tableData: [
        {
          id: 1,
          name: "资源名称1",
          address: "资源地址",
          description: "资源描述",
          parameters: "参数说明",
          date: "2016-05-01"
        },
        {
          id: 2,
          name: "资源名称2",
          address: "资源地址",
          description: "资源描述",
          parameters: "参数说明",
          date: "2016-05-01"
        },
        {
          id: 3,
          name: "资源名称3",
          address: "资源地址",
          description: "资源描述",
          parameters: "参数说明",
          date: "2016-05-01"
        },
        {
          id: 4,
          name: "资源名称4",
          address: "资源地址",
          description: "资源描述",
          parameters: "参数说明",
          date: "2016-05-01"
        }
      ],
      page: {
        currentPage: 1, //初始页
        pageSize: 3, //每页的条数
        total: "" //总数
      }
    };
  },
  methods: {
    //      分页展示
    handleSizeChange(val) {
      this.page.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    resetHandle() {
      this.form.forName = this.form.forDesc = this.form.forUrl= this.form.forParams= this.form.date1= this.form.date2 ="";
    },
  },
};
</script>

<style>
</style>
