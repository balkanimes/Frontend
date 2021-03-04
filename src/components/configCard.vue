<template>
    <div>
      <q-form class="q-gutter-md">
        <div v-for="s in schema" :key="s.name">
          <inputString v-if="s.type === 'string'" :value="data[s.name]" :schema="s" @input="data => input(s.name, data)"/>
          <inputBool v-if="s.type === 'boolean'" :value="data[s.name]" :schema="s" @input="data => input(s.name, data)"/>
          <inputNumber v-if="s.type === 'float' || s.type === 'number'" :value="data[s.name]" :schema="s" @input="data => input(s.name, data)" :float="true"/>
          <inputNumber v-if="s.type === 'integer'" :value="data[s.name]" :schema="s" @input="data => input(s.name, data)" :float="false"/>
        </div>
      </q-form>
    </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

import inputString from 'components/inputs/inputString'
import inputBool from 'components/inputs/inputBool'
import inputNumber from 'components/inputs/inputNumber'

export default defineComponent({
  name: 'configCard',
  components: { inputString, inputBool, inputNumber },
  data () {
    return {
      validation: {},
      config: {}
    }
  },
  mounted () {
    console.log(this.data)
    // this.change()
  },
  methods: {
    change: function () {
      let conf = {}
      let ok = true
      this.schema.forEach(s => {
        if (this.validation[s.name] || !(s.required ?? true)) {
          conf[s.name] = this.config[s.name]
        } else {
          ok = false
        }
      })
      if (ok) {
        this.$emit('config', conf)
      } else {
        this.$emit('config', null)
      }
    },
    input: function (name, data) {
      this.config[name] = data[0]
      this.validation[name] = data[1]
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