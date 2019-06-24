<template>
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{one}}
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{two}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
  name: 'mybread', // 给当前组件设置名称
  props: ['one', 'two']// 子收

}
</script>

<style>

</style>
