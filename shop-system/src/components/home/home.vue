<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <topHead></topHead>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="201px">
        <!-- 菜单栏 -->
        <sideBar></sideBar>
      </el-aside>
      <!-- 内容部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入组件
import topHead from "../layout/tophead";
import sideBar from "../layout/sidebar";

export default {
  components: {
    topHead,
    sideBar
  },
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
      this.$message.error("对不起，您还没有登录的哦 ^.^");
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
  color: #409eff;
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
  line-height: 200px;
}
.mymenu {
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
