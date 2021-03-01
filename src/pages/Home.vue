<template>
  <q-page>
  <div class="q-mt-md row wrap justify-center items-center">
    <q-card class="col-xs-10 col-sm-6 col-md-4 col-lg-3 col-xl-3">
      <img src="https://cdn.quasar.dev/img/parallax2.jpg" class="mainImg">

      <q-card-section>
        <div class="text-h5">Balkanimes Downloader</div>
        <div class="text-subtitle2">
            <a href="https://github.com/balkanimes" class="link">Github Organization</a>
        </div>
      </q-card-section>
    </q-card>
    <div class="col-xs-10 col-sm-5 col-md-4 col-lg-3 col-xl-3 q-ml-xs-0 q-ml-sm-xl q-mt-xs-lg q-mt-sm-sm">
        <statCard icon="settings_ethernet" title="Pipelines" :value="pipelines.length" color="primary" class="q-mb-lg"/>
        <statCard icon="assessment" title="Entries" :value="entries.length" color="primary"/>
    </div>
    </div>
  </q-page>
</template>

<style scoped>
.mainImg {
    height: 20vh;
}
.link {
    text-decoration: none;
    color: white;
}
</style>

<script>
import Vue from 'vue'
import gql from 'graphql-tag'
import statCard from 'components/statCard'

export default Vue.extend({
  components: { statCard },
  apollo: {
    pipelines: {
      query: gql`
        query {
          pipelines {
            id
          }
        }
      `
    },
    entries: {
      query: gql`
        query {
          entries {
            id
          }
        }
      `
    }
  },
})
</script>
