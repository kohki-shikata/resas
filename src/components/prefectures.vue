<template lang="pug">
.prefs
  ol
    li(v-for="item in this.$store.state.prefs")
      input(type="checkbox" :id="item.prefName" :data-pref-code="item.prefCode" :ref="item.prefCode" @click="getPrefPopulation(item.prefCode)")
      label(:for="item.prefName")
        | {{ item.prefName }}
</template>

<script>
export default {
    name: 'prefectures',
    methods: {
    getPrefPopulation(id) {
      this.$store.dispatch('getPopulation',id)
    }
  }
}
</script>

