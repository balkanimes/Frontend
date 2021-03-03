<template>
  <div id="q-app">
    <MainLayout>
    </MainLayout>
  </div>
</template>

<style>
.link {
    text-decoration: none;
    color: white;
}
</style>

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
