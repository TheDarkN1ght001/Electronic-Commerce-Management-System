<template>
    <div>
      <el-card>
        <!-- 面包屑导航 -->
         <Mybread one='权限管理' two='角色列表'></Mybread>
    <!-- 添加角色按钮 -->
    <el-button type="success" @click.prevent="openadd" round class="mybtn">添加角色</el-button>
    <!-- 表格 -->
    <el-table class="mytable" :data="tableData" style="width: 99%">
      <!-- 展开项 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
           <!-- {{ scope.row.children }} -->
                <!-- 遍历一级权限 -->
                {{ scope.row.id }}
                <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
                    <!-- 生成一级权限 -->
                    <el-col :span="4">
                        <el-tag class="tag1" @close="delRigth(scope.row.id, item1.id, scope)" closable> {{ item1.authName }} {{ item1.id }} </el-tag><i class="el-icon-arrow-right
                        "></i>
                    </el-col>
                    <el-col :span="20">
                        <!-- 遍历二级权限 -->
                        <el-row v-for="(item2, index2) in item1.children" :key='index2'>
                            <!-- 生成二级权限 -->
                            <el-col :span="5">
                                <el-tag class="tag2" @close="delRigth(scope.row.id, item2.id, scope)" closable type="success">{{ item2.authName }} {{ item2.id }}</el-tag><i class="el-icon-arrow-right
                                "></i>
                            </el-col>
                            <!-- 三级权限 -->
                            <el-col :span="19">
                                <!-- 遍历生成三级权限 -->
                                <el-tag class="tag3" @close="delRigth(scope.row.id, item3.id, scope)" closable type="warning" v-for="(item3, index3) in item2.children"
                                    :key="index3">
                                    {{ item3.authName }} {{ item3.id }}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
        </template>
      </el-table-column>
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
            @click.prevent="del(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            round
          ></el-button>
          <el-button
          @click="openRole(scope.row.children,scope.row.id)"
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
        <el-button @click.prevent="editMsgFn(editMsg.roleId)" type="primary">确 定</el-button>
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
     <!-- 分配权限面板 -->
    <el-dialog title="分配权限" :visible.sync="roleDialog">
        <!-- 树形结构 -->
        <!-- data: 绑定数据源，数据源一定要是 树形 结构（会自动遍历） -->
        <!-- props：当前组个的配置信息 -->
        <!-- node-key: 设置唯一标识 -->
        <!-- default-checked-keys: 默认选中的数组 -->
        <el-tree ref='mytree' :default-checked-keys="defaultChecked" node-key="id" show-checkbox :data="rightsList" :default-expand-all="true" :props="defaultProps"></el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click.prevent="setRightFn">确 定</el-button>
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
      // dataList: [],
      // 弹窗的宽度
      formLabelWidth: '88px',
      // 添加弹窗显影
      adddialog: false,
      // 编辑弹窗显影
      eidtdialog: false,
      // 修改数据源
      editMsg: {
        roleId: '',
        roleName: '',
        roleDesc: ''
      },
      // 添加数据源
      addMsg: {
        roleName: '',
        roleDesc: ''
      },
      // 数据源
      tableData: [],
      // 权限弹窗显影
      roleDialog: false,
      // 所有的权限数据
      rightsList: [],
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 设置默认选中
      defaultChecked: [],
      // 设置权限的角色 id
      setRoleId: 0

    }
  },
  methods: {
    // 获取数据
    getRolesList () {
      this.$http({
        method: 'GET',
        url: `roles`
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data
      })
    },
    // 打开添加角色弹窗
    openadd () {
      // 每次打开清空之前的内容
      this.addMsg = {}
      this.adddialog = true
    },
    // 添加角色信息提交到服务器并渲染
    addMsgFn () {
      this.$http({
        method: 'POST',
        url: `roles`,
        data: {
          roleName: this.addMsg.roleName,
          roleDesc: this.addMsg.roleDesc
        }
      }).then(res => {
        if (res.data.meta.status === 201) {
          this.adddialog = false
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          this.getRolesList()
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    // 点击取消关闭添加弹窗
    addvisnone () {
      this.adddialog = false
    },
    // 打开编辑弹框
    openedit (id) {
      this.eidtdialog = true
      this.$http({
        method: 'GET',
        url: `roles/${id}`
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.editMsg.roleId = res.data.data.roleId
          this.editMsg.roleName = res.data.data.roleName
          this.editMsg.roleDesc = res.data.data.roleDesc
        }
      })
    },
    // 编辑角色后提交到服务器并渲染
    editMsgFn (id) {
      this.$http({
        method: 'put',
        url: `roles/${id}`,
        data: {
          roleName: this.editMsg.roleName,
          roleDesc: this.editMsg.roleDesc
        }
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.eidtdialog = false
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          this.getRolesList()
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    // 点击取消关闭编辑弹窗
    eidtvisnone () {
      this.eidtdialog = false
    },
    // 角色删除
    del (id) {
      this.$http({
        method: 'DELETE',
        url: `roles/${id}`
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: 'success'
          })
          this.getRolesList()
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    // 删除权限
    delRigth (roleId, rightId, scope) {
      this.$http({
        method: 'DELETE',
        url: `roles/${roleId}/rights/${rightId}`
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          this.getRolesList()
          this.$message({
            message: meta.msg,
            type: 'success'
          })
          // 已经返回了新的权限 在data中
          // 根据 roleId 得到当前要修改的数据源
          // for (var i = 0; i < this.tableData.length; i++) {
          //     // 找到当前修改权限的角色
          //     if (this.tableData[i].id === roleId) {
          //         this.tableData[i].son = data
          //     }
          // }
          scope.row.children = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 打开分配权限面板
    openRole (rightsData, id) {
      // 将当前角色的 id 保存起来
      this.setRoleId = id
      this.defaultChecked = []
      // 获取所有的权限数据
      this.$http({
        method: 'GET',
        url: 'rights/tree'
      }).then(res => {
        let { data, meta } = res.data
        if (meta.status === 200) {
          // 将权限数据保存起来
          this.rightsList = data
          this.roleDialog = true
          // 将所有三级权限的 id 添加到 defaultChecked 中
          // 遍历第一级
          rightsData.forEach(item1 => {
            // 遍历第二级
            item1.children.forEach(item2 => {
              // 遍历第三级
              item2.children.forEach(item3 => {
                // 得到 id 添加到 defaultChecked 中
                this.defaultChecked.push(item3.id)
              })
            })
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 设置权限
    setRightFn () {
      // 获取更新后权限
      // getCheckedKeys:
      //      特点：只会得到全选的 id，不会得到半选
      // getHalfCheckedKeys
      //      特点：只能得到半选的 id
      let idsAll = this.$refs.mytree.getCheckedKeys()
      let idsHarf = this.$refs.mytree.getHalfCheckedKeys()
      // 将全选与半选组合
      let ids = [...idsAll, ...idsHarf]
      // 将 ids 转为字符串
      ids = ids.join(',')
      // 提交到服务器
      this.$http({
        method: 'POST',
        url: `roles/${this.setRoleId}/rights`,
        data: {
          rids: ids
        }
      }).then(res => {
        let { meta } = res.data
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(meta.msg)
        }
      })
      this.roleDialog = false
      this.getRolesList()
    }
  },
  mounted () {
    this.getRolesList()
  },
  components: {
    Mybread: Mybread
  }
}
</script>

<style scoped>
    .mybtn {
        margin-top: 20px;
    }
    .mytable {
        margin-top: 20px;
    }
    .tag1, .tag2, .tag3 {
    margin-top: 10px;
}
.tag3 {
    margin-right: 10px;
}
</style>
