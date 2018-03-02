<template>
  <el-row :gutter="20">
    <el-col :span="16" :offset="4">
      <el-card class="">
        <el-form :inline="true" :model="formRiskType" class="">
          <el-form-item label="Type Name">
            <el-input v-model="formRiskType.riskType.name" placeholder="risk type name"></el-input>
          </el-form-item>
          <div v-for="(field, index) in formRiskType.riskType.fields" :key="field.name">
            <el-form-item label="Field Name">
              <el-input v-model="field.name" placeholder="field name"></el-input>
            </el-form-item>
            <el-form-item label="Field Type">
              <el-select v-model="field.field_type" placeholder="field type">
                <el-option v-for="(option, index) in formRiskType.fieldOptions"
                           :label="option" :value="option" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="removeField(index)">Remove</el-button>
            </el-form-item>
          </div>
          <el-button type="primary" @click="addField">Add field</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RiskTypeDetails',

    data() {
      return {
        formRiskType: {
          riskType: {},
          fieldOptions: []
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
        axios.get("http://localhost:8000/api/risks/types/"+this.$route.params.name+'/')
          .then((resp) => {
            console.log(resp.data)
            this.formRiskType.riskType = resp.data
          })
          .catch((err) => {
            console.log(err)
          })
        axios.get("http://localhost:8000/api/risks/types/field-options/")
          .then((resp) => {
            console.log(resp.data)
            this.formRiskType.fieldOptions = resp.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      addField: function(){
        this.formRiskType.riskType.fields.push({name:"", field_type:""});
      },
      removeField: function(index){
        this.formRiskType.riskType.fields.splice(index, 1);
      }
    }
  }
</script>

<style scoped>

</style>
