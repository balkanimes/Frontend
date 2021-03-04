<template>
  <q-page v-if="pipelineID !== null">
    <h2 class="row justify-center">{{ (newPipeline ? 'New Pipeline' : pipelineName) }}</h2>
      <q-card class="q-ma-md q-pa-md">
        <q-input v-model="pipelineName" label="Name" class="q-mb-md"/>
        <providerSelect :value="providerName" @input="providerChange" class="q-mb-xl"/>
        <configCard :data="config" :schema="schema" v-if="loadConfigCard" @config="(data) => { this.config = data }"/>
        <q-btn color="secondary" class="full-width q-mt-xl" label="Save" @click="save"/>
        <q-btn color="red" class="full-width q-mt-xl" label="Delete Pipeline" @click="del" v-if="!newPipeline"/>
      </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

import configCard from 'components/configCard'
import providerSelect from 'components/providerSelect'

export default Vue.extend({
  components: { configCard, providerSelect },
  data () {
    return {
      pipelineName: '',
      providerName: '',
      schema: null,
      config: null,
      pipelineID: null,
      loadConfigCard: false,
      newPipeline: false
    }
  },
  methods: {
    save: function () {
      if (this.config !== null && this.pipelineName !== '' && this.providerName !== '') {
        this.$apollo.mutate({
          mutation : gql`
            mutation ($id: Int, $conf: PipelineInput!) {
              pipeline(id: $id, conf: $conf)
            }`,
          variables: {
            id: this.pipelineID,
            conf: {
              name: this.pipelineName,
              provider: this.providerName,
              config: this.config
            }
          }
        }).then((resp) => { 
          if (resp.data.pipeline) {
            this.$q.notify({
              message: 'Success',
              icon: 'done',
              position: 'bottom-left',
              color: 'teal'
            })
            if (this.newPipeline) {
              this.$router.push({ name: 'pipelines' })
            }
          } else {
            this.$q.notify({
              message: 'Error',
              icon: 'error',
              position: 'bottom-left',
              color: 'red'
            })
          }
        })
      } else {
        this.$q.notify({
          message: 'Invalid Fields',
          icon: 'error',
          position: 'bottom-left',
          color: 'red'
        })
      }
    },
    del: function () {
      this.$apollo.mutate({
        mutation : gql`
          mutation ($id: Int!) {
            deletePipeline(id: $id)
          }`,
        variables: {
          id: this.pipelineID
        }
      }).then((resp) => {
        if (resp.data.deletePipeline) {
          this.$q.notify({
            message: 'Success',
            icon: 'done',
            position: 'bottom-left',
            color: 'teal'
          })
          this.$router.push({ name: 'pipelines' })
        } else {
          this.$q.notify({
            message: 'Error',
            icon: 'error',
            position: 'bottom-left',
            color: 'red'
          })
        }
      })
    },
    loadSchema: function (resetConfig = false) {
      this.$apollo.query({
        query: gql`
          query ($name: String!) {
            schema(provider: $name) {
              name,
              type,
              array,
              description,
              required,
              default
            }
          }`,
        variables: {
          name: this.providerName
        }
      }).then((resp) => {
        this.schema = resp.data.schema
        if (resetConfig) {
          this.createDefaultConfig()
        } else {
          this.loadConfigCard = true
        }
      })
    },
    createDefaultConfig: function () {
      this.config = {}
      this.schema.forEach(s => {
        this.config[s.name] = s.default ?? ''
      })
      console.log(this.schema)
      console.log(this.config)
      this.loadConfigCard = true
    },
    providerChange: function (val) {
      if (val !== this.providerName) {
        this.loadConfigCard = false
        this.providerName = val
        this.loadSchema(true)
      }
    },
    loadData: function () {
      // load pipeline data
      this.$apollo.query({
        query: gql`
          query ($id: Int!) {
            pipeline(id: $id) {
              name,
              provider,
              config
            }
          }`,
        variables: {
          id: this.pipelineID
        }
      }).then((resp) => {
        this.pipelineName = resp.data.pipeline.name
        this.providerName = resp.data.pipeline.provider
        this.config = resp.data.pipeline.config
        // load schema 
        this.loadSchema()
      })
    }
  },
  mounted () {
    this.newPipeline = this.$route.name === 'new_pipeline'
    if (this.newPipeline) {
      this.pipelineID = undefined
      this.loadSchema(true)
    } else {
      this.pipelineID = parseInt(this.$route.params.id)
      this.loadData()
    }
  },
})
</script>
