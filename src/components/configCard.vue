<template>
    <div>
      <q-form class="q-gutter-md">
        <div v-for="s in schema" :key="s.name">
          <inputString v-if="s.type === 'string'" :value="data[s.name]" :schema="s" @valid="data => validate(s.name, data)" @input="data => input(s.name, data)"/>
        </div>
      </q-form>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import inputString from 'components/inputs/inputString'

export default defineComponent({
  name: 'configCard',
  components: { inputString },
  data () {
    return {
      validation: {},
      config: {}
    }
  },
  mounted () {
    this.change()
  },
  methods: {
    change: function () {
      if (!Object.values(this.validation).includes(false)) {
        this.$emit('config', this.config)
      } else {
        this.$emit('config', null)
      }
    },
    input: function (name, data) {
      this.config[name] = data
      this.change()
    },
    validate: function (name, data) {
      this.validation[name] = data
      this.change()
    }
  },
  props: {
    schema: {
      required: true
    },
    data: {
      required: true
    }
  }
})
</script>