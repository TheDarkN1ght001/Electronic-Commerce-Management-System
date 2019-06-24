<template>
    <div>
      <el-card>
        <!-- 面包屑导航 -->
         <Mybread one='权限管理' two='角色列表'></Mybread>
    <!-- 添加角色按钮 -->
    <el-button type="success" @click.prevent="openadd" round class="mybtn">添加角色</el-button>
    <!-- 表格 -->
    <el-table class="mytable" :data="dataList" style="width: 99%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            {{scope.row.id}}
          <el-button
            @click.prevent="openedit(scope.row.id)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            round
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            round
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹窗编辑用户信息窗口 -->
    <el-dialog title="编辑角色" :visible.sync="eidtdialog">
      {{editMsg}}
      <el-form>
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="editMsg.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="editMsg.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="eidtvisnone">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 弹窗添加用户信息窗口 -->
  <el-dialog title="添加角色" :visible.sync="adddialog">
      <el-form>
        {{addMsg}}
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="addMsg.roleName"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth">
          <el-input v-model="addMsg.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="addvisnone">取 消</el-button>
        <el-button @click.prevent="addMsgFn" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    </el-card>
    </div>
</template>

<script>
import Mybread from '../layout/mybread'
export default {
  data () {
    return {
      // 数据源
      dataList: [],
      // 弹窗的宽度
      formLabelWidth: '88px',
      //添加弹窗显影
      adddialog:false,
      // 编辑弹窗显影
      eidtdialog: false,
      // 修改数据源
      editMsg: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      },
      //添加数据源
      addMsg:{
        roleName:'',
        roleDesc:''
      }

    }
  },
  methods: {
    // 获取数据
    getData () {
      this.$http({
        method: 'GET',
        url: `roles`
      }).then(res => {
        console.log(res)
        this.dataList = res.data.data
      })
    },
    //打开添加角色弹窗
    openadd(){
      this.adddialog=true
    },
    //添加角色信息提交到服务器并渲染
    addMsgFn(){
      this.$http({
        method:'POST',
        url:`roles`,
        data:{
          roleName:this.addMsg.roleName,
          roleDesc:this.addMsg.roleDesc
        }
      }).then(res=>{
        if(res.data.meta.status==201){
      this.adddialog=false
           this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          this.getData()
        }else{
          this.$message.error(res.data.meta.msg)
        }
        
      })
    },
    //点击取消关闭添加弹窗
    addvisnone(){
      this.adddialog=false
    },
    // 打开编辑弹框
    openedit (id) {
      this.eidtdialog = true
      this.$http({
        method: 'GET',
        url: `roles/${id}`
      }).then(res => {
        if (res.data.meta.status == 200) {
          this.editMsg.roleId = res.data.data.roleId
          this.editMsg.roleName = res.data.data.roleName
          this.editMsg.roleDesc = res.data.data.roleDesc
        }
      })
    },
    // 点击取消关闭编辑弹窗
    eidtvisnone () {
      this.eidtdialog = false
    }
  },
  mounted () {
    this.getData()
  },
  components:{
    Mybread:Mybread
  }
}
</script>

<style>
    .mybtn {
        margin-top: 20px;
    }
    .mytable {
        margin-top: 20px;
    }
</style>
