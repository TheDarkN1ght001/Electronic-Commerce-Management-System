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
      <el-table-column prop="goods_name" label="商品名称" width="380"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格（元）" width="280"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          {{scope.row.goods_id}}
          <el-button
            @click.prevent='edit'
            type="primary"
            icon="el-icon-edit"
            size="mini"
            round
          ></el-button>
          <el-button
            @click.prevent='del'
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
        <!-- 分页  current-page当前页 page-sizes页容量-->
    <el-pagination
      :current-page="pagenum"
      :page-sizes="[10,15,20]"
      :page-size="pagesize"
      :total="total"
      @size-change="sizeChange"
      @current-change="changepage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
        </el-card>
    </div>
</template>

<script>
import Mybread from '../layout/mybread'

export default {
  data () {
    return {
      tableData: [],
      // 查询关键字
      query: '',
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 10,
      // 容量选项
      pagesizes: [10, 15, 20],
      // 总条数
      total: 0
    }
  },
  methods: {
    getData () {
      this.$http({
        method: 'GET',
        url: `goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}&query=${this.query}`
      }).then(res => {
        const {meta, data} = res.data
        if (meta.status === 200) {
        // 判断data中goods长度是否为0，为0，页数-1，并且重新获取数据
          if (data.goods.length === 0 && this.pagenum !== 1) {
            this.pagenum--
            this.getData()
            return
          }
          this.tableData = data.goods
          // 得到总条数
          this.total = data.total
        }
      })
    },
    changepage (currentPage) {
      // console.log(currentPage);
      this.pagenum = currentPage
      this.getData()
    },
    sizeChange (pagesize) {
      this.pagesize = pagesize
      this.getData()
    },
    // 搜索用户信息
    search () {
      this.getData()
    },
    edit () {
      this.$message.error('别点了，懒得做')
    },
    del () {
      this.$message.error('这个也懒得做')
    }
  },
  mounted () {
    this.getData()
  },
  components: {
    Mybread
  }
}
</script>

<style scoped>
  .element.style {
    padding-bottom: 20px;
}
</style>
