<template>
  <el-row>
    <el-row id="app">
      <el-row>
        <img src="./assets/logo.png">
      </el-row>
      <br>
      <el-col :span="12" :offset="6">
        <router-link to="/risks/"><el-button type="primary">All risks</el-button></router-link>
        <router-link to="/risks/types/"><el-button type="primary">All types</el-button></router-link>
      </el-col>
    </el-row>
    <br><br>
      <router-view/>
  </el-row>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0;
  text-align: center;
}
</style>
