<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-card class="">
        <el-form :inline="true" :model="riskForm" class="" label-width="120px">
          <el-form-item label="Risk Name">
            <el-input v-model="riskForm.risk.name" placeholder="risk name"></el-input>
          </el-form-item>
          <el-row v-for="field in riskForm.risk.fields" :key="field.name">
            <el-form-item :label="field.name[0].toUpperCase() + field.name.slice(1)">
              <el-input v-model="field.value" :placeholder="field.name"></el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RiskDetails',

    data() {
      return {
        riskForm: {
          risk: {},
          riskType: {}
        }
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
        axios.get("http://localhost:8000/api/risks/" + this.$route.params.uuid + "/")
          .then((resp) => {
            this.riskForm.risk = resp.data
            this.getRiskType()
            console.log(resp)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getRiskType() {
        axios.get("http://localhost:8000/api/risks/types/" + this.riskForm.risk.type + "/")
          .then((resp) => {
              console.log(resp.data)
              this.riskForm.riskType = resp.data

              if (this.riskForm.riskType.fields.length !== this.riskForm.risk.fields.length) {
                let tempFields = {}
                this.riskForm.risk.fields.forEach(function (field, index) {
                  tempFields[field.name] = field.value;
                })
                this.riskForm.risk.fields = this.riskForm.riskType.fields.slice()
                this.riskForm.risk.fields = this.riskForm.risk.fields.map(function (field) {
                  if (field.name in tempFields) { field.value = tempFields[field.name] }
                  return field
                })
              }
            }
          )
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }
</script>

<style scoped>

</style>
