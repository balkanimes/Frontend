<template>
  <q-page v-if="entryID !== null">
    <h2 class="row justify-center">{{ (newEntry ? 'New Entry' : entryName) }}</h2>
      <q-card class="q-ma-md q-pa-md">
        <q-input v-model="entryName" label="Name" class="q-mb-md"/>
        <q-input v-model="directory" label="Directory" class="q-mb-md"/>
        <pipelineSelect :value="pipeline" @input="pipelineSelect" class="q-mb-xl"/>
        <configCard :data="config" :schema="schema" v-if="loadConfigCard" @config="(data) => { this.config = data }"/>
        <q-btn color="secondary" class="full-width q-mt-xl" label="Save" @click="save"/>
        <q-btn color="red" class="full-width q-mt-xl" label="Delete Entry" @click="del" v-if="!newEntry"/>
      </q-card>
  </q-page>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

import configCard from 'components/configCard'
import pipelineSelect from 'components/pipelineSelect'

export default Vue.extend({
  components: { configCard, pipelineSelect },
  data () {
    return {
      entryName: '',
      pipeline: '',
      directory: '',
      schema: null,
      config: null,
      entryID: null,
      loadConfigCard: false,
      newEntry: false
    }
  },
  methods: {
    save: function () {
      if (this.config !== null && this.entryName !== '' && this.pipeline !== '' && this.directory !== '') {
        this.$apollo.mutate({
          mutation : gql`
            mutation ($id: Int, $conf: EntryInput!) {
              entry(id: $id, conf: $conf)
            }`,
          variables: {
            id: this.entryID,
            conf: {
              name: this.entryName,
              pipeline: this.pipeline,
              config: this.config,
              directory: this.directory
            }
          }
        }).then((resp) => { 
          if (resp.data.entry) {
            this.$q.notify({
              message: 'Success',
              icon: 'done',
              position: 'bottom-left',
              color: 'teal'
            })
            if (this.newEntry) {
              this.$router.push({ name: 'entry', id: resp.data.entry })
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
            deleteEntry(id: $id)
          }`,
        variables: {
          id: this.entryID
        }
      }).then((resp) => {
        if (resp.data.deleteEntry) {
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
          query ($id: Int!) {
            pipeline(id: $id) {
              provider
            }
          }`,
        variables: {
          id: this.pipeline
        }
      }).then((response) => {
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
            name: response.data.pipeline.provider
          }
        }).then((resp) => {
            this.schema = resp.data.schema
            if (resetConfig) {
              this.createDefaultConfig()
            } else {
              this.loadConfigCard = true
            }
        })
      })
    },
    createDefaultConfig: function () {
      this.config = {}
      this.schema.forEach(s => {
        this.config[s.name] = s.default ?? ''
      })
      this.loadConfigCard = true
    },
    pipelineSelect: function (val) {
      if (val !== this.pipeline) {
        this.loadConfigCard = false
        this.pipeline = val
        this.loadSchema(true)
      }
    },
    loadData: function () {
      // load entry data
      this.$apollo.query({
        query: gql`
          query ($id: Int!) {
            entry(id: $id) {
              name,
              pipeline {id},
              config,
              directory
            }
          }`,
        variables: {
          id: this.entryID
        }
      }).then((resp) => {
        this.entryName = resp.data.entry.name
        this.pipeline = resp.data.entry.pipeline.id
        this.config = resp.data.entry.config
        this.directory = resp.data.entry.directory
        // load schema 
        this.loadSchema()
      })
    }
  },
  mounted () {
    this.newEntry = this.$route.name === 'new_entry'
    if (this.newEntry) {
      this.entryID = undefined
      this.loadSchema(true)
    } else {
      this.entryID = parseInt(this.$route.params.id)
      this.loadData()
    }
  },
})
</script>