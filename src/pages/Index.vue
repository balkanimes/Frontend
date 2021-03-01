<template>
  <q-page>
    <!-- when the query response is not received yet, data from it is undefined,
    so before referring to it we need to use v-if -->
    <div v-if="pipeline">GraphQL query result:<br />{{ pipeline.name }}</div>
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
    pipeline: {
      query: gql`
        query {
          pipeline(id: 1) {
            name
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
