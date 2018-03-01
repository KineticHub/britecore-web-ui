<template>
  <div>
    <el-card class="" style="width: 30%;">
      <div slot="header">
        {{ risk.name }}
        <!--<span style="float: right; padding: 3px;">{{ risk.type }}</span>-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>-->
      </div>
      <div v-for="field in risk.fields" :key="field.name">
        {{ field.name }} : {{ field.value }}
      </div>
    </el-card>
  </div>
</template>

<script>
    import axios from 'axios'

    export default {
      name: 'RiskDetails',

      data() {
        return {
          risk: {}
        }
      },

      created() {
        this.fetchData()
      },

      watch: {
        '$route': 'fetchData'
      },

      methods: {
        fetchData() {
          axios.get("http://localhost:8000/api/risks/"+this.$route.params.uuid+'/')
            .then((resp) => {
              this.risk = resp.data
              console.log(resp)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      }
    }
</script>

<style scoped>

</style>
