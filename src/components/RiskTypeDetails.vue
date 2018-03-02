<template>
  <el-row :gutter="20">
    <el-col :span="16" :offset="4">
      <el-card class="">
        <el-form :inline="true" :model="riskTypeForm" class="">
          <el-form-item label="Type Name">
            <el-input v-model="riskTypeForm.riskType.name" placeholder="risk type name"></el-input>
          </el-form-item>
          <br>
          <el-row v-for="(field, index) in riskTypeForm.riskType.fields" :key="index">
            <el-form-item label="Field Name">
              <el-input v-model="field.name" placeholder="field name"></el-input>
            </el-form-item>
            <el-form-item label="Field Type">
              <el-select v-model="field.field_type" placeholder="field type">
                <el-option v-for="(option, index) in riskTypeForm.fieldOptions"
                           :label="option" :value="option" :key="index"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="removeField(index)">Remove</el-button>
            </el-form-item>
          </el-row>
          <el-button type="primary" @click="addField">Add field</el-button>
        </el-form>
      </el-card>
      <br>
      <el-button type="primary" @click="submitForm">Save changes</el-button>
    </el-col>
  </el-row>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'RiskTypeDetails',

    data() {
      return {
        riskTypeForm: {
          riskType: {fields:[{name:"", field_type:""}]},
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
        if (this.$route.params.name) {
          axios.get("http://localhost:8000/api/risks/types/" + this.$route.params.name + '/')
            .then((resp) => {
              console.log(resp.data)
              this.riskTypeForm.riskType = resp.data
            })
            .catch((err) => {
              console.log(err)
            })
        }
        axios.get("http://localhost:8000/api/risks/types/field-options/")
          .then((resp) => {
            console.log(resp.data)
            this.riskTypeForm.fieldOptions = resp.data
          })
          .catch((err) => {
            console.log(err)
          })
      },
      addField: function() {
        this.riskTypeForm.riskType.fields.push({name:"", field_type:""});
      },
      removeField: function(index) {
        this.riskTypeForm.riskType.fields.splice(index, 1);
      },
      submitForm: function() {
        if (this.$route.params.name) {
          this.putData()
        }
        else {
          this.postData()
        }
      },
      postData: function() {
        axios.post("http://localhost:8000/api/risks/types/", {
            name: this.riskTypeForm.riskType.name,
            fields: this.riskTypeForm.riskType.fields
          })
          .then((resp) => {
            console.log(resp.data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      putData: function() {
        axios.put("http://localhost:8000/api/risks/types/"+this.riskTypeForm.riskType.name+"/", {
          name: this.riskTypeForm.riskType.name,
          fields: this.riskTypeForm.riskType.fields
        })
        .then((resp) => {
          console.log(resp.data)
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
