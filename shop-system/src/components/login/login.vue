<template>
    <div class="login">
        <div class="content">
            <el-form   label-position="top" :model="userMsg" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h2>用户登录</h2>
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="userMsg.username"  ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="userMsg.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%" @click.prevent='login'>登录</el-button>
            </el-form-item>
</el-form>
        </div>
    </div>
</template>

<script>
// import { log } from 'util'
export default {
  data () {
    return {
      userMsg: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$http({
            method: 'POST',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.userMsg
          }).then(res => {
            const {data, meta} = res.data
            if (meta.status === 200) {
              localStorage.setItem('token', data.token)
              this.$router.push('/')
              this.$message({
                message: '恭喜你，登录成功啦 0.0Y',
                type: 'success'
              })
            } else {
              this.$message.error(meta.msg + 'QAQ')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }

}
</script>

<style>
    .login {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #324152;
    }
    .content {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 580px;
        height: 460px;
        background: #ffffff;
        border-radius: 10px;
        padding: 40px;
        box-sizing: border-box;
    }
</style>
