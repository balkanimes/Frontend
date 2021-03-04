<template>
  <q-page>
    <h1 class="row justify-center">Entries</h1>
    <div class="row wrap justify-center items-center">
      <q-card class="bg-primary col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-3 q-ma-md" v-for="e in entries" :key="e.id">
          <q-card-section>
            <router-link :to="{ name: 'entry', params: { id: e.id, pipeline: e.pipeline.id } }" class="link">
                <div class="text-h4">{{ e.name }}</div>
            </router-link>
            <router-link :to="{ name: 'pipeline', params: { id: e.pipeline.id } }" class="link">
                <div class="text-subtitle2">Pipeline: {{ e.pipeline.name }}</div>
            </router-link>
          </q-card-section>
      </q-card>
      <q-card class="bg-secondary col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-3 q-ma-md">
        <router-link :to="{ name: 'new_entry' }" class="link">
          <q-card-section>
            <div class="text-h4">NEW</div>
            <div class="text-subtitle2">Add a new entry</div>
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
    entries: {
      query: gql`
        query {
          entries {
            id,
            name,
            pipeline {id, name}
          }
        }
      `
    }
  },
})
</script>
