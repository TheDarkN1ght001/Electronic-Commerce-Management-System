<template>
    <el-menu
          class="el-menu-vertical-demo mymenu"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          :router='true'
        >
          <!-- 菜单选项 -->
          <el-submenu v-for='item in rightList' :key='item.id' :index="'/'+item.path">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>

              <el-menu-item v-for='son in item.children' :key='son.id' :index="'/'+son.path">
                <i class="el-icon-menu"></i>
                {{son.authName}}
                </el-menu-item>
          </el-submenu>

        </el-menu>
</template>

<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  methods: {
    getData () {
      this.$http({
        method: 'GET',
        url: 'menus'
      }).then(res => {
        const {data, meta} = res.data
        if (meta.status === 200) {
          this.rightList = data
        } else {
          this.$message.error(meta.msg)
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style>

</style>
