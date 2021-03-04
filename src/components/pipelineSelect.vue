<template>
    <q-select :value="val" @input="change" :options="options" label="Pipeline" />
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import gql from 'graphql-tag'

export default defineComponent({
  name: 'pipelineSelect',
  data () {
    return {
      options: [],
      val: null
    }
  },
  mounted () {
    this.$apollo.query({
      query: gql`
        query {
          pipelines {
            id,
            name
          }
        }`
    }).then((resp) => {
      this.options = []
      resp.data.pipelines.forEach(el => {
        this.options.push({ label: el['name'], value: el['id'] })
        if (el['id'] === this.value) {
          this.val = { label: el['name'], value: el['id'] }
        }
      })
    })
  },
  methods: {
    change: function (data) {
      this.val = data
      this.$emit('input', data.value)
    }
  },
  props: {
    value: {
      required: false,
      default: 0
    }
  }
})
</script>