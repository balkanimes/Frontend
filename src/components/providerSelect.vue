<template>
    <q-select :value="value" @input="change" :options="providers" label="Provider" v-if="providers !== undefined" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import gql from 'graphql-tag'

export default defineComponent({
  name: 'providerSelect',
  mounted () {
    if (this.value === null) {
        this.value = this.providers[0]
    }
    this.change(this.value)
  },
  methods: {
    change: function (data) {
      this.$emit('input', data.toString())
    }
  },
  props: {
    value: {
      required: false,
      default: null
    }
  },
  apollo: {
    providers: {
      query: gql`
        query {
          providers
        }
      `
    }
  }
})
</script>