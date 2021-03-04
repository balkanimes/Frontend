<template>
  <q-page v-if="pipeline !== null">
    <h2 class="row justify-center">{{ pipelineName }}</h2>
      <q-card class="q-ma-md q-pa-md">
        <q-input v-model="pipelineName" label="Name" class="q-mb-md"/>
        <providerSelect v-model="providerName" class="q-mb-xl"/>
        <configCard :data="pipeline.config" :schema="schema" v-if="schema !== null" @config="(data) => { this.config = data }"/>
        <q-btn color="secondary" class="full-width q-mt-xl" label="Save" @click="save"/>
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
      pipeline: null,
      schema: null,
      config: null
    }
  },
  methods: {
    save: function () {
      if (this.config !== null && this.pipelineName !== '') {
        this.$apollo.mutate({
          mutation : gql`
            mutation ($id: Int!, $conf: PipelineInput!) {
              pipeline(id: $id, conf: $conf)
            }`,
          variables: {
            id: parseInt(this.$route.params.id),
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
    }
  },
  mounted () {
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
        id: parseInt(this.$route.params.id)
      }
    }).then((resp) => {
      this.pipeline = resp.data.pipeline
      this.pipelineName = this.pipeline.name
      this.providerName = this.pipeline.provider
      // load schema 
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
          name: this.pipeline.provider
        }
      }).then((resp) => {
        this.schema = resp.data.schema
      })
    })
  },
})
</script>
