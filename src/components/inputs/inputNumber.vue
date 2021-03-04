<template>
    <q-input @input="change" :label="schema.name" :value="val" :error="!valid" type="number">
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
  name: 'inputNumber',
  data () {
    return {
      val: this.value ?? this.schema.default ?? false,
      valid: false
    }
  },
  mounted () {
    console.log(this.schema)
    this.change(this.val)
  },
  methods: {
    change: function (data) {
      this.val = data
      if (((this.float && !isNaN(data)) || (!this.float && Number.isInteger(Number(data)))) && (this.schema.min === undefined || (this.schema.min !== undefined && data >= this.schema.min)) && (this.schema.max === undefined || (this.schema.max !== undefined && data >= this.schema.max))) {
        this.valid = true
        this.$emit('input', [Number(data), true])
      } else {
        console.log(data)
        console.log(Number.isInteger(parseInt(data)))
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
    },
    float: {
      required: false,
      default: true
    }
  }
})
</script>