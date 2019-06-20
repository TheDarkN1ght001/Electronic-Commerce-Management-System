<template>
    <div class="login">
        <div class="content">
            <el-form   label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h2>用户登录</h2>
            <el-form-item label="用户名" prop="pass">
                <el-input type="text" v-model="userMsg.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
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
import { log } from 'util';
export default {
    data() {
        return {
            userMsg:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            this.$http({
                method:'POST',
                url:'http://localhost:8888/api/private/v1/login',
                data:this.userMsg
            }).then(res=>{
                const{data,meta}=res.data
                if(meta.status===200){
                    localStorage.setItem('token',data.token)
                    this.$router.push('/')
                }else{
                    alert(meta.msg)
                }
            }).catch(err=>{
                console.log(err);
                
            })
        }
    },
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
