<template>
    <q-item style="padding: 0;">
      <q-item-section>
        <q-checkbox :value="val" @input="change" :label="schema.name" />
      </q-item-section>
      <q-item-section side v-if="schema.description !== null && schema.description !== ''">
        <q-avatar color="primary" text-color="white" icon="help" size="md" v-if="$q.screen.lt.sm">
            <q-tooltip anchor="top middle" self="bottom middle">
                {{ schema.description }}
            </q-tooltip>
        </q-avatar>
        <div class="text-subtitle2" v-if="$q.screen.gt.xs">{{ schema.description }}</div>
      </q-item-section>
    </q-item>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
export default defineComponent({
  name: 'inputBool',
  data () {
    return {
      val: (this.value ?? this.schema.default) ?? false,
      valid: false
    }
  },
  mounted () {
    this.change(this.val)
  },
  methods: {
    change: function (data) {
      this.val = data
      this.$emit('input', [data, true])
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