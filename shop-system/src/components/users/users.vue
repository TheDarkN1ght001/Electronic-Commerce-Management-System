<template>
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="myrow">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain class="mybtn">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg-state" label="用户状态">
        <template slot-scope="scope">
          {{scope.row}}
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" icon="el-icon-edit" size="mini" round></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" round></el-button>
        <el-button type="success" icon="el-icon-check" size="mini" round></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页  current-page当前页 page-sizes页容量-->
    <el-pagination :current-page="pagenum" :page-sizes="[3,5,10]" :page-size="pagesize" :total='total' @size-change='sizeChange' @current-change="changepage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      //查询关键字
      query: "",
      //当前页
      pagenum: 1,
      //页容量
      pagesize: 3,
      //容量选项
      pagesizes:[3,5,10],
      //总条数
      total:0
    };
  },
  methods: {
    getData() {
      this.$http({
        method: "GET",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { meta, data } = res.data;
        if (meta.status === 200) {
          this.tableData = data.users;
          //得到总条数
          this.total=data.total
        }
      });
    },
    changepage(currentPage){
        // console.log(currentPage);
        this.pagenum=currentPage
        this.getData()
    },
    sizeChange(pagesize){
        this. pagesize=pagesize
        this.getData()
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
.myrow {
  margin-top: 25px;
}
.mybtn {
  margin-left: 20px;
}
</style>
