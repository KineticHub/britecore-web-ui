<template>
  <el-row :gutter="20">
    <el-col :span="8" :offset="8">
      <el-card class="">
        <el-form :inline="true" :model="riskForm" class="" label-width="120px">
          <el-form-item label="Risk Name">
            <el-input v-model="riskForm.risk.name" placeholder="risk name"></el-input>
          </el-form-item>
          <el-row v-for="field in riskForm.risk.fields" :key="field.name">
            <el-form-item v-if="field.name !== undefined" :label="field.name">
              <el-input v-if="field.field_type==='text'"
                        v-model="field.value" :placeholder="field.name"></el-input>
              <el-input-number v-if="field.field_type==='number'"
                               :controls="false" v-model="field.value" :placeholder="field.name"></el-input-number>
              <el-date-picker v-if="field.field_type==='date'"
                              type="date" v-model="field.value" :placeholder="field.name"></el-date-picker>
              <el-select v-if="field.field_type==='enum'"
                         v-model.trim="field.value" :placeholder="field.name" @change="onChange()">
                <el-option
                  v-for="choice in field.field_choices"
                  :key="choice"
                  :label="choice"
                  :value="choice">
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <el-button type="primary" @click="submitForm">Save changes</el-button>
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
          risk: {fields:[{name:"", field_type:"", value:"", field_choices:[]}]},
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
        if (this.$route.params.uuid) {
          this.getRisk()
        } else {
          this.getRiskType(this.$route.params.type)
        }
      },
      getRisk() {
        axios.get("http://localhost:8000/api/risks/" + this.$route.params.uuid + "/")
          .then((resp) => {
            console.log(resp.data)
            this.riskForm.risk = resp.data
            this.getRiskType(this.riskForm.risk.type)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      getRiskType(type_name) {
        axios.get("http://localhost:8000/api/risks/types/" + type_name + "/")
          .then((resp) => {
              console.log(resp.data)
              this.riskForm.riskType = resp.data
              let tempFields = {}
              this.riskForm.risk.fields.forEach(function (field, index) {
                tempFields[field.name] = field.value;
              })
              this.riskForm.risk.fields = this.riskForm.riskType.fields.slice()
              this.riskForm.risk.fields = this.riskForm.risk.fields.map(function (field) {
                if (field.name in tempFields) {
                  field.value = tempFields[field.name]
                }
                field.field_choices = field.field_choices.split(',')
                return field
              })
            }
          )
          .catch((err) => {
            console.log(err)
          })
      },
      submitForm: function () {
        if (this.$route.params.uuid) {
          this.putData()
        }
        else {
          this.postData()
        }
      },
      postData() {
        this.riskForm.risk['type'] = this.$route.params.type
        axios.post("http://localhost:8000/api/risks/", this.riskForm.risk)
          .then((resp) => {
            console.log(resp.data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      putData() {
        axios.put("http://localhost:8000/api/risks/" + this.$route.params.uuid + "/", this.riskForm.risk)
          .then((resp) => {
            console.log(resp.data)
          })
          .catch((err) => {
            console.log(err)
          })
      },
      onChange() {
        // enum field was failing to reload
        this.$forceUpdate()
      }
    }
  }
</script>

<style scoped>

</style>
