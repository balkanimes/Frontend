<template>
    <q-input @input="change" :label="schema.name" :value="val" :error="!valid">
        <template v-slot:append v-if="schema.description !== null && schema.description !== ''">
        <q-avatar color="primary" text-color="white" icon="help" size="md">
            <q-tooltip anchor="top middle" self="bottom middle">
                {{ schema.description }}
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
      val: (this.value ?? this.schema.default) ?? '',
      valid: false
    }
  },
  mounted () {
    this.change(this.val)
  },
  methods: {
    change: function (data) {
      this.val = data
      if ((data !== '' && data !== null) || !(this.schema.required ?? true)) {
        this.valid = true
        this.$emit('input', [data.toString(), true])
      } else {
        this.valid = false
        this.$emit('input', [data.toString(), false])
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