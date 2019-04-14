<template lang="pug">
.home
  prefectures
  .chart
    highcharts(:options="this.$store.state.chartData")
</template>

<script>
import prefectures from '@/components/prefectures'
import { mapState } from 'vuex'
import { Chart } from 'highcharts-vue'

export default {
  name: 'home',
  components: {
    prefectures,
    highcharts: Chart,
  },
  computed: mapState([
    'prefs',
    'chartData'
  ]),
  mounted () {
    this.$store.dispatch('loadPrefs')
    this.$store.dispatch('loadYears')
    // this.$store.state.chartData = JSON.parse(localStorage.getItem('prefData'))
  }
}
</script>

<style lang="stylus">
h1
  padding .5em
  background #bee2f1
  margin-top 0
  text-align center
.prefs
  display flex
  flex-flow row wrap
  li
    list-style-type none
    display inline-block
    width 10%
    margin-bottom 1em
  input
    display none
  label
    position relative
    padding-left 1.5em
    &:before
      content '■'
      color #eee
      position absolute
      top 0
      left 0
  input:checked + label
    &:after
      content '✔'
      color red
      font-size 70%
      position absolute
      top 3px
      left 3px

</style>

