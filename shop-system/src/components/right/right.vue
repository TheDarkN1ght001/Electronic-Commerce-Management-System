<template>
  <div>
    <el-card>
    <!-- 面包屑导航 -->
    <!-- 父传 -->
    <Mybread one='权限管理' two='权限列表'></Mybread>
    <!-- 表格 -->
    <el-table class="mytable" :data="dataList" style="width: 99%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column  label="层级">
      <template slot-scope="scope">
        <!-- {{scope.row.level==='0'?'一级':scope.row.level=='1'?'二级':"三级"}} -->
        <span v-if="scope.row.level==='0'">一级</span>
        <span v-if="scope.row.level==='1'">二级</span>
        <span v-if="scope.row.level==='2'">三级</span>
      </template>
      </el-table-column>
    </el-table>
    </el-card>

  </div>
</template>

<script>
// 引入封装的面包屑导航
import Mybread from '../layout/mybread'

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
  },
  // 注册面包组件
  components: {
    Mybread: Mybread
  }
}
</script>

<style>
  .mytable {
    margin-top: 20px;
  }
</style>
