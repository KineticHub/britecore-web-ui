<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-card v-for="risk in risks" :key="risk.uuid" class="">
        <div slot="header">
          <router-link v-bind:to="'/risks/edit/' + risk.uuid + '/'">{{ risk.name }}</router-link>
          <span style="float: right;">
            type: {{ risk.type }}
          </span>
        </div>
        <div v-for="field in risk.fields" :key="field.name">
          {{ field.name }} : {{ field.value }}
        </div>
      </el-card>
      <br>
      <el-select v-model="riskTypeChoice" placeholder="Risk type">
        <el-option
          v-for="type in riskTypes"
          :key="type.name"
          :label="type.name"
          :value="type.name">
        </el-option>
      </el-select>
      <router-link :to="'/risks/new/'+riskTypeChoice"><el-button type="primary" @click="">Create new risk</el-button></router-link>
    </el-col>
  </el-row>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'Risks',

    data() {
      return {
        risks: {},
        riskTypes: [],
        riskTypeChoice: ''
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
        axios.get("http://localhost:8000/api/risks/types/")
          .then((resp) => {
            this.riskTypes = resp.data
            this.riskTypeChoice = this.riskTypes[0].name
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>
