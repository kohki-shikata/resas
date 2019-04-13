<template lang="pug">
.main
  .title
    h1 日本の人口推移
  .prefs
    ol
      li(v-for="item in this.$store.state.prefs")
        input(type="checkbox" :id="item.prefName" :data-pref-code="item.prefCode" :ref="item.prefCode" @click="getPrefPopulation(item.prefCode)")
        label(:for="item.prefName")
          | {{ item.prefName }}
  .chart
    highcharts(:options="this.$store.state.chartData")
</template>

<script>
import { mapState } from 'vuex'
import { Chart } from 'highcharts-vue'

export default {
  name: 'home',
  components: {
    highcharts: Chart,
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

