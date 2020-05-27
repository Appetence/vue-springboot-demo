<template>
  <div class="home">
    <div>
      <el-input placeholder="请输入部门进行搜索，可以直接回车搜索..."
                prefix-icon="el-icon-search"
                style="width: 350px;margin-right: 10px"
                clearable
                :clear="initAllDept"
                v-model="keywords"
      >
      </el-input>
      <el-button icon="el-icon-search" size="small" type="primary" @click="initAllDept">
        搜索
      </el-button>
      <div style="display: flex;justify-content: space-between">
        <el-button type="primary" icon="el-icon-plus" size="small" @click="addDept">添加部门</el-button>
      </div>
    </div>
    <!--表格开始-->
    <div style="margin-top: 8px">
      <el-table
        :data="depts"
        border
        style="width: 100%">
<!--        <el-table-column-->
<!--          prop="id"-->
<!--          label="编号"-->
<!--          width="180">-->
<!--        </el-table-column>-->
        <el-table-column
          prop="serial"
          label="部门名称"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="updateDept(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteDept(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="display:flex;justify-content:flex-end ">
        <el-pagination
          background
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!--表格结束-->
    <!--弹出层开始-->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form ref="form" :model="dept" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="dept.dname" @input="change($event)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div @click="submitForm()">1111</div>
    <!--弹出层结束-->
  </div>


</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
  export default {
    name: 'Home',
    data() {
      return {

        keywords: '',
        depts: [],//显示数据
        total: 0,
        dialogTitle: "添加",
        dialogVisible: false,
        size: 10,//分页每页10条数据
        page: 1,//从第一页开始
        dept: {
          dname: '',
          loc: ''
        }
      }
    },
    http: {
      headers: {'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'}
    },
    methods: {

      /**
       * /dept  请求地址
       */
      initAllDept() {
        var _this = this;
        var posturl = '/payment/selectAll'

        this.$axios.post(posturl, {
          'serial':this.keywords
        })
          .then(function (msg) {
            console.log(msg.data);
            _this.depts = msg.data;
            console.log(_this.depts);
            // console.log(JSON.stringify(msg));
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      change(e){
        this.$forceUpdate()
      },
//       submitForm() {
//         var _this = this;
//         _this.$http.post('/api/DemoController/select', {
//             i:1
//           },{emulateJSON:true}
//         ).then(data => {
//           //登录失败,先不讨论
//           console.log("success");
//           console.log(data);
//           if (data.status != 200 || data.data.data.msg!="登陆成功") {
//             //iViewUi的友好提示
//             this.$message.error(data.data.data.msg);
//
//             //登录成功
//           } else {
// //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
//             //  this.$store.commit('set_token', data["Authentication-Token"]);
//
//             localStorage.setItem('imp_username',this.ruleForm.username);
//             localStorage.setItem('imp_token',data.data.data.token);
//
//             //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
//             // this.$store.commit('set_token', data["Authentication-Token"]);
//             // console.log(store.state.token);
//             console.log(data.data.data.token);
//             this.$router.push('/homePage');
//           }
//         });
//
//       },
      submitForm() {
        var _this = this;

      var posturl = '/demo/get'

        this.$axios.post(posturl, {
          'indexs':'1',
          ii:2
        })
          .then(function (msg) {
            console.log(JSON.stringify(msg));
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      onSubmit() {

        var _this = this;


        console.log(_this.dept.id)
        if(_this.dept.id){
          var posturl = '/payment/update';
          console.log("true")
          this.$axios.post(posturl, {
            'serial': _this.dept.dname,
            "id":_this.dept.id
          })
            .then(function (msg) {
              _this.depts = "";
              _this.initAllDept();
            })
            .catch(function (error) {
              console.log(error);
            });
        }else {
          var posturl = '/payment/insert';
          console.log("false");
        _this.$axios.post(posturl, {
            'serial': _this.dept.dname
          })
            .then(function (msg) {
              _this.depts = "";
              _this.initAllDept();
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      },
      addDept() {
        //打开弹出层
        this.dialogVisible = true
        //改变弹出成title
        this.dialogTitle = "添加"
        //清空弹出层数据
        this.dept.dname = '';
        this.dept.loc = '';
      },
      updateDept(data) {
        //填充数据  数据回显
        this.dept = data
        this.dept.dname = data.serial
        //打开弹出层
        this.dialogVisible = true
        //改变弹出成title
        this.dialogTitle = "修改"
        console.log(this.dept);
      },
      deleteDept(data) {


        console.log(data);
        var id = data.id;
        var _this = this;
        this.$confirm('此操作将永久删除【' + data.dname + '】, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //调用delete请求


          var posturl = '/payment/deleteById'

          this.$axios.post(posturl, {
            'id':id
          }).then(function (msg) {
            console.log(msg)
            if(msg.data){
              _this.initAllDept();
            }else{
              console.log("删除失败")
            }
            })
            .catch(function (error) {
              console.log(error);
            });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    //初始化数据
    mounted() {
      this.initAllDept();
    }

  }
</script>
<style>
  .home {
    width: 800px;
    margin: 20px auto;
  }
</style>
