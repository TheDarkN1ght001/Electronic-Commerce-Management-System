<template>
    <div>
        <el-card>
            <!-- 面包屑导航 -->
         <Mybread one='商品管理' two='商品列表'></Mybread>
         <!-- 搜索框 -->
         <el-row class="myrow">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain class="mybtn" @click.prevent="openAddPage">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 99%">
      <el-table-column type="index"></el-table-column>【
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格（元）" width="180"></el-table-column>
      <el-table-column prop="mobile" label="商品重量"></el-table-column>
      <el-table-column prop="mg-state" label="用户状态">
      </el-table-column>
       <el-table-column prop="mg-state" label="操作">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click.prevent="openedit(scope.row.id)"
            icon="el-icon-edit"
            size="mini"
            round
          ></el-button>
          {{scope.row.id}}
          <el-button
            @click.prevent="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
          ></el-button>
          <el-button
            type="success"
            @click.prevent="openroles(scope.row.id)"
            icon="el-icon-check"
            size="mini"
            round
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
        </el-card>
    </div>
</template>

<script>
import Mybread from '../layout/mybread'

export default {
  components: {
    Mybread
  }
}
</script>

<style>

</style>
