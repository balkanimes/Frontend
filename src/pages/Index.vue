<template>
  <q-page>
    <!-- when the query response is not received yet, data from it is undefined,
    so before referring to it we need to use v-if -->
    <div v-if="pipelines">GraphQL query result:<br />{{ pipelines[0].name }}</div>
    <div v-else>
      loading...
    </div>
  </q-page>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'PageIndex',
  apollo: {
    pipelines: {
      query: gql`
        query {
          pipelines {
            name
            provider
            config
          }
        }
      `
    }
  },
  watch: {
    test: function (val) {
      console.log(val)
    }
  }
}
</script>
