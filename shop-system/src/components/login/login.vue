<template>
    <div class="login">
        <div class="content">
            <el-form   label-position="top" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <h2>用户登录</h2>
            <el-form-item label="用户名" prop="pass">
                <el-input type="password" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkPass">
                <el-input type="password" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%">登录</el-button>
            </el-form-item>
</el-form>
        </div>
    </div>
</template>

<script>
export default {

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
