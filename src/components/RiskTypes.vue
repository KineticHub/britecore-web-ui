<template>
  <el-row>
    <el-card v-for="type in types" :key="type.name" class="" style="width: 30%;">
      <div slot="header">
        <router-link v-bind:to="'/risks/types/edit/' + type.name + '/'">{{ type.name }}</router-link>
        <!--<span style="float: right; padding: 3px;">{{ risk.type }}</span>-->
        <!--<el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>-->
      </div>
      <div v-for="field in type.fields" :key="field.name">
        {{ field.name }} : {{ field.field_type }}
      </div>
    </el-card>
    <router-link to="/risks/types/edit/"><el-button type="primary" @click="">New risk type</el-button></router-link>
  </el-row>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'RiskTypes',

    data() {
      return {
        types: {}
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
        axios.get("http://localhost:8000/api/risks/types/")
          .then((resp) => {
            this.types = resp.data
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
