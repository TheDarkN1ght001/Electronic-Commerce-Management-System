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
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button @click.prevent="search" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="success" plain class="mybtn" @click.prevent="openAddPage">添加按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 99%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg-state" label="用户状态">
        <template slot-scope="scope">
          {{scope.row}}
          <el-switch v-model="scope.row.mg_state" @change='changer(scope.row.id,scope.row.mg_state)' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" round></el-button>
          {{scope.row.id}}
          <el-button
            @click.prevent="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
          ></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" round></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  current-page当前页 page-sizes页容量-->
    <el-pagination
      :current-page="pagenum"
      :page-sizes="[3,5,10]"
      :page-size="pagesize"
      :total="total"
      @size-change="sizeChange"
      @current-change="changepage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <!-- 弹窗添加用户信息页面 -->
    <el-dialog title="添加用户" :visible.sync="Adddialog">
      <el-form>
        {{addUserMsg}}
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="addUserMsg.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="addUserMsg.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="addUserMsg.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="addUserMsg.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="visnone">取 消</el-button>
        <el-button type="primary" @click.prevent="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // 查询关键字
      query: "",
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 容量选项
      pagesizes: [3, 5, 10],
      // 总条数
      total: 0,
      // 控制弹窗显影
      Adddialog: false,
      // 弹窗的宽度
      formLabelWidth: "88px",
      addUserMsg: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
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
        // console.log(res);
        const { meta, data } = res.data;
        //判断data中users长度是否为0，为0，页数-1，并且重新获取数据
        if (meta.status === 200) {
          if (data.users.length === 0 && this.pagenum !== 1) {
            this.pagenum--;
            this.getData();
            return;
          }
          this.tableData = data.users;
          // 得到总条数
          this.total = data.total;
        }
      });
    },
    changepage(currentPage) {
      // console.log(currentPage);
      this.pagenum = currentPage;
      this.getData();
    },
    sizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getData();
    },
    // 搜索用户信息
    search() {
      this.getData();
    },
    // 打开信息添加的弹窗
    openAddPage() {
      this.Adddialog = true;
    },
    // 弹窗的取消按钮（点击后影藏弹窗）
    visnone() {
      this.Adddialog = false;
    },
    // 添加用户信息
    addUser() {
      this.$http({
        method: "POST",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.addUserMsg,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.meta.status === 201) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.data.meta.msg);
        }
        // 清空输入框数据
        for (var key in this.addUserMsg) {
          this.addUserMsg[key] = "";
        }
        // 关闭面板
        this.Adddialog = false;
      });
    },
    // 删除用户
    del(id) {
      // console.log(id);

      this.$confirm("你确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "DELETE",
          url: `http://localhost:8888/api/private/v1/users/${id}`,
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }).then(res => {
          if (res.data.meta.status == 200) {
            this.getData();
            // alert(res.data.meta.msg)
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
          } else {
            this.$message.error(res.data.meta.msg);
          }
        });
      });
    },
    // 改变用户状态
    changer(id,type){
      this.$http({
        method:'PUT',
        url:`http://localhost:8888/api/private/v1/users/${id}/state/${type}`,
        headers: {
            Authorization: window.localStorage.getItem("token")
          }
      }).then(res=>{
        if(res.data.meta.status==200){
          this.getData()
          this.$message({
            message:res.data.meta.msg,
            type:'success'
          })
        }else{
          this.$message.error(res.data.meta.msg);
        }
        
      })
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
