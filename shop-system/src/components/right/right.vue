<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table class="mytable" :data="dataList" style="width: 99%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级">
      <template slot-scope="scope">
        {{scope.row.level==='0'?'一级':scope.row.level=='1'?'二级':"三级"}}
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataList: []
    }
  },
  methods: {
    getdata () {
      this.$http({
        method: 'GET',
        url: `rights/list`
      }).then(res => {
        this.dataList = res.data.data
      })
    }
  },
  mounted () {
    this.getdata()
  }
}
</script>

<style>
  .mytable {
    margin-top: 20px;
  }
</style>
