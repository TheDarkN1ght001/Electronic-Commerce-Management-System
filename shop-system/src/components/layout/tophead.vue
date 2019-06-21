<template>
    <el-row>
        <el-col :span="4">
          <img src="../../assets/logo.png" alt>
        </el-col>
        <el-col :span="16">
          <h2>黑夜后台管理系统</h2>
        </el-col>
        <el-col :span="4">
          <el-button @click.prevent="out" type="primary" icon="el-icon-switch-button">退出</el-button>
        </el-col>
      </el-row>
</template>

<script>
export default {
  methods: {
    out() {
      this.$confirm("您确定退出系统吗 TAT?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
        window.localStorage.removeItem("token");
        this.$message({
          type: "success",
          message: "退出成功啦 QAQ!"
        });
      });
    }
  },
  }
</script>

<style>

</style>
