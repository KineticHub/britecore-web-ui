<template>
  <div>
    <el-card v-for="risk in risks" :key="risk.name" class="" style="width: 30%;">
      <div slot="header">
        <router-link v-bind:to="'/risks/' + risk.uuid + '/'">{{ risk.name }}</router-link>
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
    name: 'Risks',

    data() {
      return {
        risks: {}
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
        axios.get("http://localhost:8000/api/risks/")
          .then((resp) => {
            this.risks = resp.data
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
