<template>
    <q-input @input="change" :label="schema.name" :value="val" :error="!valid">
        <template v-slot:append>
        <q-avatar color="primary" text-color="white" icon="help">
            <q-tooltip anchor="top middle" self="bottom middle">
                {{ schema.description || '' }}
            </q-tooltip>
        </q-avatar>
        </template>
    </q-input>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'inputString',
  data () {
    return {
      val: this.value ?? this.schema.default ?? '',
      valid: false
    }
  },
  mounted () {
    this.change(this.val)
  },
  methods: {
    change: function (data) {
      this.val = data
      this.$emit('input', data.toString())
      if ((data !== '' && data !== null) && (this.schema.required ?? false)) {
        this.valid = true
        this.$emit('valid', true)
      } else {
        this.valid = false
        this.$emit('valid', false)
      }
    }
  },
  props: {
    schema: {
      required: true
    },
    value: {
      required: false
    }
  }
})
</script>