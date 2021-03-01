<template>
  <div id="q-app">
    <MainLayout>
    </MainLayout>
  </div>
</template>
<script>
import MainLayout from './layouts/MainLayout.vue'

export default {
  components: { MainLayout },
  name: 'App',
  mounted: function () {
    this.$q.dark.set(true)
  }
}
</script>
