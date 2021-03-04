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
      console.log('save')
      console.log(this.config)
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
