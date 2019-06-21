<template>
  <el-container>
    <el-header>
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
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  },
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
  mounted() {
    if (!window.localStorage.getItem("token")) {
      this.$router.push("/login");
      this.$message.error('对不起，您还没有登录的哦 ^.^');
    }
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header h2 {
  margin: 0;
}
.el-header img {
  height: 60px;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
