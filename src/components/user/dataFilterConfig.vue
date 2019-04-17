<template>
  <div>
    <el-form  ref="form" label-position="right"  label-width="80px">
      <el-row>
        <el-col :span="10">
          <el-form-item label-width="140px" label="应用ID：" >
            <el-input class="input-width" v-model="form.appId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label-width="180px" label="密码：" >
            <el-input class="input-width" v-model="form.secret"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label-width="140px" label="访问token有效期：" >
            <el-input class="input-width" v-model="form.accessExpiresSecond"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label-width="180px" label="刷新token有效期：" >
            <el-input class="input-width" v-model="form.refreshExpiresSecond"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label-width="140px" label="数据实体：">
            <el-select v-model="selectVal" @change="getCheckBox" placeholder="请选择数据实体">
              <el-option v-for=" item in selectModels" :label="item.aliasName" :value="item.classFullName"></el-option>
              <!--<el-option label="Test" value="com.test.Test"></el-option>-->
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div class="entry-field">
            <el-checkbox v-model="checkAll" @change="handleCheckAllChange" :indeterminate="isIndeterminate">全选 </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox v-for="mod in checkModels" :label="mod.aliasName" v-model="mod.checked" @change="handleCheckedCitiesChange"></el-checkbox>
          </div>
        </el-col>
      </el-row>

      <!--<el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>-->
    </el-form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    props:["row"],//定义父组件绑定的属性，定义后可以直接使用
    data:function() {
      return {
        selectModels:[{
          aliasName:'',
          classFullName:'',
          describe:'',
          concentFields:[],
          originalFields:[]
        }],
        checkModels:[/*{
          checked:'',
          aliasName:'',
          fieldName:'',
          describe:''
        }*/],
        checkAll: false,
        isIndeterminate:false,
        selectVal:'',
        form: {
          appId: '',
          secret:'',
          accessExpiresSecond:'',
          refreshExpiresSecond:''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        alert(JSON.stringify(this.form) + "\n=============\n" + JSON.stringify(this.check));

       /* var form = new FormData();
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
        });*/
      },
      handleCheckAllChange:function(val) {
        var _self = this;
        this.checkModels.forEach(function (item) {
          item.checked=val;
        });
        this.isIndeterminate = false;
        /*//调用父窗口绑定的事件方法 要在组件中定义<datafields :s="tableInfo" @cli="close()" ref="tag"></datafields> ，此处调用父类的cli
        this.$emit("cli");*/
      },
      handleCheckedCitiesChange(value) {
        var _self=this;
        this.isIndeterminate = false;
        this.checkAll=value;
        this.checkModels.forEach(function (item) {
          if(item.checked != value){
            _self.isIndeterminate = true;
            _self.checkAll=false;
          }
        });
      },
      clearForm() {//清空form表单
        var _self = this;
        debugger
        /*Object.keys(this.form).forEach((a,b) => {
          alert(a + " == " + b);
        });*/
        Object.keys(this.form).forEach(function (item){
          _self.form[item] = '';
        });
      },
      getCheckBox(val) {
        var _self = this;
        this.selectModels.forEach(function(item){
          if(item.classFullName == val) {
            _self.checkModels = item.originalFields;
            _self.checkAll = false;
            _self.isIndeterminate = false;
            if(_self.checkModels) {
              var ct = 0;
              _self.checkModels.forEach(function(item){
                if(item.checked) {
                  ct = ct + 1;
                }
              });
              if(ct == 0) {
                _self.isIndeterminate = false;
              } else if(ct == _self.checkModels.length) {
                _self.checkAll = true;
              } else {
                _self.isIndeterminate = true;
              }
            }
          }
        });

      },
      getModels() {//获取属性
        var _self = this;
        axios.post("/testVue").then(function(res){
          if(res.status == 200) {
            _self.selectModels = res.data;

          }
        }).catch(function(e){
          alert(e);
        });
      },
      getForm() {//获取表单
        var _self = this;
        axios.post("/testAccount").then(function(res){
          if(res.status == 200) {
            _self.form = res.data;
          }
        }).catch(function(e){
          alert(e);
        });
      }
    },
    mounted:function() {//自带方法，页面完全打开后操作
      this.form = JSON.parse(JSON.stringify(this.row.singleSelection));
    },
    watch: {
      /*'row.singleSelection'*/
      row : {
        handler:function(newV, oldV) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          // alert(JSON.stringify(newV));
          // alert(JSON.stringify(oldV));
          this.form = JSON.parse(JSON.stringify(newV.singleSelection));
        },
        deep: true    //深度监听
      }
    }
    /*watch:{
      /!*row:function(newV, oldV) {
        debugger;
        this.form = JSON.parse(JSON.stringify(newV));
      },
      selectVal:function (newV,oldV) {

        //alert(typeof(newV)+" : "+ typeof(oldV) + "  ---  " + newV + " == "+oldV  );
      }*!/
    }*/,
    created:function () {
      this.getModels();
      //this.getForm();
      /*var _self = this;
      axios.post("/testVue").then(function(res){
        debugger
        if(res.status==200) {


          _self.check.cities = eval(res.data);



        }
      }).catch(function(e){
        alert(e);
      });*/
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
