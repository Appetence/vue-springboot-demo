<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">智能配置管理平台</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录{{test}}</el-button><!---->
                </div>
                <!--p class="login-tips">Tips : 用户名和密码随便填。</p-->
            </el-form>
        </div>
    </div>
</template>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
    export default {
        data: function(){
            return {
                ruleForm: {
                    /*username: 'admin',
                    password: '123123'*/
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    test: 111

                }
            }
        },
      http: {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      },
        methods: {
            submitForm(formName) {
            /*this.$refs[formName].validate((valid) => {
              if (valid) {
                localStorage.setItem('ms_username',this.ruleForm.username);
                this.$router.push('/');
              } else {
                console.log('error submit!!');
                return false;
              }
            });*/
            var _this = this;
console.log(this.ruleForm.username+'-------'+this.ruleForm.password);
              _this.$http.post('/list/WebController/weblogin', {
                  rememberMe:_this.ruleForm.username,
                  username: _this.ruleForm.username,
                  password: _this.ruleForm.password
                },{emulateJSON:true}
              ).then(data => {
                  //登录失败,先不讨论
                console.log(data.data.data.msg);
                console.log(data);
                  if (data.status != 200 || data.data.data.msg!="登陆成功") {
                    //iViewUi的友好提示
                    this.$message.error(data.data.data.msg);

                    //登录成功
                  } else {
//根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                  //  this.$store.commit('set_token', data["Authentication-Token"]);

                    localStorage.setItem('imp_username',this.ruleForm.username);
                    localStorage.setItem('imp_token',data.data.data.token);

                    //根据store中set_token方法将token保存至localStorage/sessionStorage中，data["Authentication-Token"]，获取token的value值
                   // this.$store.commit('set_token', data["Authentication-Token"]);
                   // console.log(store.state.token);
                    console.log(data.data.data.token);
                    this.$router.push('/homePage');
                  }
                });

          }
        }

    }


</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>

