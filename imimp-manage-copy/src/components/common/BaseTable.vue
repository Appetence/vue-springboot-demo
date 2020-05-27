<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="">
        <el-breadcrumb-item><i class="el-icon-tickets"></i> 项目列表</el-breadcrumb-item>

        <el-link type="primary addProDiv" @click="handleAdd()"><i class="el-icon-circle-plus"></i> 新增项目</el-link>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->

        <el-input v-model="select_word" placeholder="项目名/appid" class="handle-input mr10"></el-input>

        <el-select v-model="select_product" placeholder="" class="handle-select mr10">
          <el-option v-for="item in proOptions" :label="item .industry" :value="item.id" :key="item.id"></el-option>
        </el-select>

        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="tableData" :default-expand-all="false" class="table" ref="multipleTable">
        <!--  <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="project_name" label="项目名称">

        </el-table-column>
        <el-table-column prop="wx_name" label="项目路径">

        </el-table-column>
        <el-table-column prop="appid" label="appid">

        </el-table-column>
        <el-table-column prop="secret" label="密钥">

        </el-table-column>
        <el-table-column prop="industry" label="行业">

        </el-table-column>
        <el-table-column prop="remark" label="备注">
                </el-table-column>
        <！--         el-table-column prop="cNumber" label="会员数">

        </el-table-column-->
        <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
           <el-dropdown>
             <span class="el-dropdown-link">
               <i class="el-icon-arrow-down el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item @click.native.prevent="handlePZ(scope.row.id,scope.row.industry_id)">菜单管理</el-dropdown-item>
               <el-dropdown-item @click.native.prevent="handleSZ(scope.$index, scope.row.id, scope.row.project_name)">权限管理</el-dropdown-item>
               <el-dropdown-item @click.native.prevent="handleAct(scope.row.project_name)">活动管理</el-dropdown-item>
               <el-dropdown-item @click.native.prevent="handleUpdate(scope.row.id,scope.row.project_name,scope.row.wx_name,scope.row.appid,scope.row.secret,scope.row.remark,scope.row.industry_id)">修改项目</el-dropdown-item>
               <el-dropdown-item @click.native.prevent="deleteRow(scope.$index, scope.row)" >删除项目</el-dropdown-item>
             </el-dropdown-menu>
           </el-dropdown>
        </template>

        </el-table-column>


      </el-table>

    </div>
    <el-pagination
          @current-change="handleCurrentChange"
          background
          align="right"
          layout="prev, pager, next"
          prev-click
          next-click
          current-change
          :page-size="10"
          :current-page="cur_page"
          :total="total_Num">
        </el-pagination>
    <!-- 新增项目弹出框 -->
    <el-dialog title="新增项目" :visible.sync="addVisible" width="40%">
      <el-form ref="proForm" :model="proForm" label-width="80px" :rules="proRules" class="demo-ruleForm">
        <el-form-item label="项目名称" prop="project_name">
          <el-input v-model="proForm.wx_name"></el-input>
        </el-form-item>
        <el-form-item label="项目路径" prop="wx_name">
          <el-input v-model="proForm.project_name"></el-input>
        </el-form-item>
        <el-form-item label="AppId" prop="appid">
          <el-input v-model="proForm.appid"></el-input>
        </el-form-item>
        <el-form-item label="密钥" prop="secret">
          <el-input v-model="proForm.secret"></el-input>
        </el-form-item>
        <el-form-item label="行业">
          <el-select v-model="proForm.industry_id" placeholder="" class="handle-select mr10">
            <el-option v-for="item in proForm.proOptions_add" :label="item .industry" :value="item.id"
                       :key="item.id"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="proForm.remark"></el-input>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureSave('proForm')">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 修改项目弹出框 -->
        <el-dialog title="修改项目" :visible.sync="updateVisible" width="40%">
          <el-form ref="proForm" :model="proForm" label-width="80px" :rules="proRules" class="demo-ruleForm">
            <el-form-item label="项目名称" prop="project_name">
              <el-input v-model="proForm.wx_name"></el-input>
            </el-form-item>
            <el-form-item label="项目路径" prop="wx_name">
              <el-input v-model="proForm.project_name"></el-input>
            </el-form-item>
            <el-form-item label="AppId" prop="appid">
              <el-input v-model="proForm.appid"></el-input>
            </el-form-item>
            <el-form-item label="密钥" prop="secret">
              <el-input v-model="proForm.secret"></el-input>
            </el-form-item>
            <el-form-item label="行业">
              <el-select v-model="proForm.industry_id" placeholder="" class="handle-select mr10">
                <el-option v-for="item in proForm.proOptions_add" :label="item.industry" :value="item.id"
                           :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="proForm.remark"></el-input>
            </el-form-item>


          </el-form>
          <span slot="footer" class="dialog-footer">
                    <el-button @click="updateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sureRow('proForm')">确 定</el-button>
                </span>
        </el-dialog>


    <!-- 自定义菜单弹出框 -->
    <el-dialog title="自定义菜单配置" :visible.sync="menuVisible" width="40%">
      <el-tree ref="tree"
        :data="menuTableData"
        show-checkbox
        node-key="id" :check-strictly = true
        default-expand-all   :props="defaultProps" :default-checked-keys="deChKeyArList">
      </el-tree>

      <span slot="footer" class="dialog-footer">
                <el-button @click="menuVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureZDYCD(p_wid);">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'basetable',
    data() {
      return {
        tableData: [],
        total_Num:parseInt(10),
        cur_page:parseInt(1),
        // 每页显示数量
        // totalNum:'',
        /*  is_search: false,*/
        addVisible: false,
        updateVisible:false,
        menuVisible: false,
        select_word: '',
        proForm: {
          project_name: '',
          wx_name: '',
          appid: '',
          secret: '',
          remark: '',
          industry_id: '',
          proOptions_add: []
        },
        proRules: {
          project_name: [{required: true, message: '请输入项目路径', trigger: 'blur'}],
          wx_name: [{required: true, message: '请输入项目名称', trigger: 'blur'}],
          appid: [{required: true, message: '请输入app_id', trigger: 'blur'}],
          secret: [{required: true, message: '请输入密钥', trigger: 'blur'}],
          remark: [{required: false, message: '请输入备注', trigger: 'blur'}]
        },
        idx: -1,
        select_product: '全部',
        proOptions: [],
        menuVisible: false,
        menuTableData: [],
        defaultProps: {
          children: 'c_menuList',
          label: 'p_menu'
        },
        deChKeyArList:[],
        p_wid:'',
        pgdToken:localStorage.getItem("imp_token")
      }
    },
	beforeCreate(){
		this.pgdToken = localStorage.getItem("imp_token");
	},
    created() {
      this.pgdToken = localStorage.getItem("imp_token");
      this.getData();
      this.getProduct();
    },

    http: {
      headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8','token':localStorage.getItem("imp_token")}//
    },
    methods: {
      handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log("点击页数"+this.currentPage)  //点击第几页
      this.$options.methods.searchadd(this.select_product,this.select_word,this,this.currentPage);
      },
      //初始化查询行业下拉列表
      getProduct() {
        this.$http.get("/api/WebController/addProduct", {}, {emulateJSON: true}).then((res) => {
          console.log(res.data.data);
          /*this.$emit('proOptions',res.data.data);*/
          var len = res.data.data.length;
          for (let i = 0; i < len; i++) {
            this.proOptions.push(res.data.data[i]);
          }
        })
      },
      //新增项目
      handleAdd() {
        var proOA = [];
        this.$http.get("/api/WebController/addProduct", {}, {emulateJSON: true}).then((res) => {
          console.log(res.data.data);
          var selName = res.data.data[0].id;
          /*this.$emit('proOptions',res.data.data);*/
          var len = res.data.data.length;
          this.proForm.industry_id = selName;
          for (let i = 0; i < len; i++) {
            proOA.push(res.data.data[i]);
          }
        })
        this.proForm = {
          project_name: '',
          wx_name: '',
          appid: '',
          secret: '',
          remark: '',
          proOptions_add: proOA,
          industry_id:''
        }
        this.addVisible = true;
      },

      //修改项目
      handleUpdate(id,project_name,wx_name,appid,secret,remark,industry_id) {
      console.log("industry_id --- "+industry_id);
      var proOA = [];
      this.$http.get("/api/WebController/addProduct", {}, {emulateJSON: true}).then((res) => {
        //console.log(res.data.data);
        /*this.$emit('proOptions',res.data.data);*/
        var len = res.data.data.length;
        this.proForm.industry_id = industry_id;
        for (let i = 0; i < len; i++) {
          proOA.push(res.data.data[i]);
        }
      })
      this.proForm = {
        pro_id:id,
        project_name: project_name,
        wx_name: wx_name,
        appid: appid,
        secret: secret,
        remark: remark,
        proOptions_add: proOA,
        industry_id:"",
      }
      this.updateVisible = true;
    },
    changeVal(industry_id){
      console.log("kkk "+industry_id);
    },
    // 获取 easy-mock 的模拟数据
      getData() {
        this.$http.post("/api/WebController/listProduct", {
          value: this.select_word,
          industry: '0'
          /* ,page: this.cur_page*/
        }, {emulateJSON: true}).then((res) => {
          console.log(res.data.data.list);
          var len = res.data.data.list.length;
          this.tableData = res.data.data.list;
          this.total_Num=parseInt(res.data.data.total);
          this.cur_page=parseInt(res.data.data.pageNum);
          // this.totalNum = res.data.data.length;
        })
      },
      //功能权限
      handleSZ(index, rowId, rowProName) {
        var code = "";
        var tokens="";
        var codeLength = 64;//验证码的长度
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');//随机数
        for(var i = 0; i < codeLength; i++) {
          //循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        for(var i = 0; i < 6; i++) {
          //循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          tokens += random[index];//根据索引取得随机数加到code上
        }
        console.log(index, rowId, rowProName,code);

          /* ,page: this.cur_page*/
         this.$http.get("/api/WebController/consoleLoginPage?proname="+rowProName+"&key="+code+"&tokencli="+tokens, {
          /* ,page: this.cur_page*/
        }, {emulateJSON: true}).then((res) => {
           console.log(res.data.data);
        //   // var len = res.data.data.list.length;
        //   // this.tableData = res.data.data.list;
        //   // this.total_Num=parseInt(res.data.data.total);
        //   // this.cur_page=parseInt(res.data.data.pageNum);
        //   // this.totalNum = res.data.data.length;
         })
        window.open("http://"+rowProName+"/consoleLoginPage?key="+code+"&token="+tokens+rowProName)
          // this.totalNum = res.data.data.length;

      },
      //活动管理
      handleAct(rowProName){
        var code = "";
        var tokens="";
        var codeLength = 64;//验证码的长度
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');//随机数
        for(var i = 0; i < codeLength; i++) {
          //循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        for(var i = 0; i < 6; i++) {
          //循环操作
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          tokens += random[index];//根据索引取得随机数加到code上
        }
        console.log(index, rowProName,code);

        /* ,page: this.cur_page*/
        this.$http.get("/api/WebController/pcSCLoginPage?proname="+rowProName+"&key="+code+"&tokencli="+tokens, {
          /* ,page: this.cur_page*/
        }, {emulateJSON: true}).then((res) => {
          console.log(res.data.data);
          //   // var len = res.data.data.list.length;
          //   // this.tableData = res.data.data.list;
          //   // this.total_Num=parseInt(res.data.data.total);
          //   // this.cur_page=parseInt(res.data.data.pageNum);
          //   // this.totalNum = res.data.data.length;
        })
        window.open("http://"+rowProName+"/myLoginconsole.action?key="+code+"&tokencli="+tokens+rowProName);
      },
      //确定新增项目
      sureSave(formName) {
        console.log(this.proForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("/api/WebController/addProduct", {
              // id:this.proForm.pro_id,
              wx_name: this.proForm.wx_name,
              appid: this.proForm.appid,
              secret: this.proForm.secret,
              project_name: this.proForm.project_name,
              remark: this.proForm.remark,
              industry_id: this.proForm.industry_id
            }, {emulateJSON: true}).then((res) => {
              console.log(res.data.data);
              if (res.data.result > 0) {
                this.$message(res.data.data);
                this.addVisible = false;
                this.$options.methods.searchadd(this.select_product,this.select_word,this,1);
              } else {
                this.$message.error(res.data.data);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      //确定修改项目
      sureRow(formName) {
        console.log(this.proForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post("/api/WebController/updateProduct", {
              id:this.proForm.pro_id,
              wx_name: this.proForm.wx_name,
              appid: this.proForm.appid,
              secret: this.proForm.secret,
              project_name: this.proForm.project_name,
              remark: this.proForm.remark,
              industry_id: this.proForm.industry_id
            }, {emulateJSON: true}).then((res) => {
              console.log(res.data.data);
              if (res.data.result > 0) {
                this.$message(res.data.data);
                this.addVisible = false;
                this.$options.methods.searchadd(this.select_product,this.select_word,this,1);
              } else {
                this.$message.error(res.data.data);
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },

      search() {
        /* this.is_search = true;*/
        console.log(this.select_word);
        console.log(this.select_product == '全部' ? "0" : this.select_product);
        this.$http.post("/api/WebController/listProduct", {
          value: this.select_word,
          industry: this.select_product == '全部' ? "0" : this.select_product
          /* ,page: this.cur_page*/
        }, {emulateJSON: true}).then((res) => {
          console.log(res.data.data.list);
          var len = res.data.data.list.length;
          this.tableData = res.data.data.list;
          this.total_Num=parseInt(res.data.data.total);
          this.cur_page=parseInt(res.data.data.pageNum);
        //  this.totalNum = res.data.data.length;
        })
      },
      searchadd(product,word,addthis,pagenum) {
        /* this.is_search = true;*/
        console.log(word);
        console.log(product == '全部' ? "0" : product);
        addthis.$http.post("/api/WebController/listProduct", {
          value: word,
          industry: product == '全部' ? "0" : product,
          page:pagenum
          /* ,page: this.cur_page*/
        }, {emulateJSON: true}).then((res) => {
          console.log(res.data.data);
          var len = res.data.data.list.length;
          addthis.tableData = res.data.data.list;
          addthis.total_Num=parseInt(res.data.data.total);
          addthis.cur_page=parseInt(res.data.data.pageNum);
          //  this.totalNum = res.data.data.length;
        })
      },
      saveRow(index, rowData) {
        if (rowData.wx_name == '' || rowData.pro_name == '' || rowData.appid == '' || rowData.secret == '') {
          this.$message.error("项目名称，项目路径，appID和密钥均不可为空！");
        } else {
          this.$http.post("/api/WebController/updateProduct", {
            id: rowData.id,
            wx_name: rowData.wx_name,
            appid: rowData.appid,
            secret: rowData.secret,
            project_name: rowData.project_name,
            remark: rowData.remark,
            industry_id: rowData.industry_id
          }, {emulateJSON: true}).then((res) => {
            console.log(res.data);
            if (res.data.result > 0) {
              this.$message(res.data.data);

            } else {
              this.$message.error(res.data.data);
            }
          })
        }
      },

      deleteRow(index, rowData) {
        this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post("/api/WebController/deleteProduct", {
            id: rowData.id,
            wx_name: rowData.wx_name,
            appid: rowData.appid,
            secret: rowData.secret,
            project_name: rowData.project_name,
            remark: rowData.remark,
            industry_id: rowData.industry_id
          }, {emulateJSON: true}).then((res) => {
            console.log(res.data);
            console.log(this.cur_page);
            if (res.data.result > 0) {
              this.$message(res.data.data);
              this.$options.methods.searchadd(this.select_product,this.select_word,this,this.cur_page);
            } else {
              this.$message.error(res.data.data);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      },
      //自定义菜单
      handlePZ(id,industry_id) {
        this.p_wid = id;
        this.menuTableData=[];
        this.$http.post("/api/customMenuController/getc_MenulistByWid",{
          wid:id
        }, {emulateJSON: true}).then((res) => {
          var dataList = res.data.data;
          var len = dataList.length;
          var linshi=[];
          for(let i=0;i<len; i++){
            linshi.push(dataList[i].id+"");
            if(dataList[i].c_menuList!=null){
              for(let j=0;j<dataList[i].c_menuList.length;j++){
                linshi.push("p"+dataList[i].c_menuList[j].id);
              }
            }
          }
         // this.deChKeyArList=["1", "2", "3", "p1", "p2", "p3", "p4"]
          this.deChKeyArList =linshi;
          console.log(this.deChKeyArList);
        });
        //var params=new URLSearchParams()
        //params.append('industry_id',industry_id);
        this.$http.get("/api/customMenuController/getP_Menulist", {params:{industry_id:industry_id}}, {emulateJSON: true}).then((res) => {
          //this.menuTableData = res.data.data;
          var len1 = res.data.data.length;
          var dataList = res.data.data;
          for(let i=0;i<len1;i++){
            this.menuTableData.push({id:dataList[i].id,p_id:'0', p_menu:dataList[i].p_menu, c_menuList:this.$options.methods.getMenuList(dataList[i].c_menuList)})
          }
        });
        this.menuVisible = true;

      },
      getMenuList(list){
        var len = list.length;
        var clist=[];
        for(let i=0;i<len;i++){
          clist.push({id:"p"+list[i].id,  p_menu:list[i].c_menu, p_id:list[i].pid});
        }
        return clist;
      },
      sureZDYCD(id){
          //flag     都无子菜单传1          否则传0
        //子菜单,拼接字符串
        var cIds = '';
        //父菜单,拼接字符串
        var pIds = '';
        var len = this.$refs.tree.getCheckedNodes().length;
        var tt = this.$refs.tree.getCheckedNodes();
        for(let i=0;i<len;i++){
          if(tt[i].p_id=='0'){
            pIds+=(tt[i].id+',');
          }else{
            cIds+=(tt[i].id.substr(1,tt[i].id.length)+',');
          }
        }
        pIds = pIds.length!=0?pIds.substring(0, pIds.length-1):pIds;
        cIds = cIds.length!=0?cIds.substring(0, cIds.length-1):cIds;
        console.log(cIds);
        console.log(pIds);
        this.$http.post("/api/customMenuController/addMenu", {
          wid:id,
          cids:cIds,
          flag:cIds.length==0?'1':'0',
          pids:pIds
        }, {emulateJSON: true}).then((res) => {
          console.log(res.data.data);

          if(res.data.result>0){
            this.$message(res.data.message);
          }else{
            this.$message.error(res.data.message);
          }

          this.menuVisible = false;
        });

      }

    }
  }

</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .del-dialog-cnt {
    font-size: 16px;
    text-align: center
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mr10 {
    margin-right: 10px;
  }

  .addProDiv {
    float: right;
    color: #409EFF !important;
  }

  .el-breadcrumb__inner, .el-breadcrumb__separator {
    color: #409EFF !important;;
  }

  .demo-table-expand {
    padding: 0px 10px 0px 10px;
  }

  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
</style>
