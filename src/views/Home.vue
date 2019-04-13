<template lang="pug">
.main
  .prefs
    ol
      li(v-for="item in this.$store.state.prefs")
        input(type="checkbox" :data-pref-code="item.prefCode" :ref="item.prefCode" @click="getPrefPopulation(item.prefCode)")
        | {{ item.prefCode }} - {{ item.prefName }}
  .chart
    highcharts(:options="this.$store.state.chartData")
</template>

<script>
import { mapState } from 'vuex'
import { Chart } from 'highcharts-vue'

export default {
  name: 'home',
  components: {
    highcharts: Chart
  },
  data () {
    return {
      chartOpts  
    }
  },
  computed: mapState([
    'prefs',
    'chartData'
  ]),
  methods: {
    getPrefPopulation(id) {
      this.$store.dispatch('getPopulation',id)
    }
  },
  mounted () {
    this.$store.dispatch('loadPrefs')
    this.$store.dispatch('loadYears')
    // this.$store.state.chartData = JSON.parse(localStorage.getItem('prefData'))
  }
}
</script>

<style lang="stylus">
.prefs
  display flex
  flex-flow row wrap
  li
    list-style-type none
    display inline-block
    width 20%
</style>

