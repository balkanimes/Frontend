<template>
  <q-page>
    <h1 class="row justify-center">Pipelines</h1>
    <div class="row wrap justify-center items-center">
      <q-card class="bg-primary col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-3 q-ma-md" v-for="p in pipelines" :key="p.id">
        <router-link :to="{ name: 'pipeline', params: { id: p.id } }" class="link">
          <q-card-section>
            <div class="text-h4">{{ p.name }}</div>
            <div class="text-subtitle2">Provider: {{ p.provider }}</div>
          </q-card-section>
        </router-link>
      </q-card>
      <q-card class="bg-secondary col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-3 q-ma-md">
        <router-link :to="{ name: 'new_pipeline' }" class="link">
          <q-card-section>
            <div class="text-h4">NEW</div>
            <div class="text-subtitle2">Add a new pipeline</div>
          </q-card-section>
        </router-link>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'

export default Vue.extend({
  apollo: {
    pipelines: {
      query: gql`
        query {
          pipelines {
            id,
            name,
            provider
          }
        }
      `
    }
  },
})
</script>
