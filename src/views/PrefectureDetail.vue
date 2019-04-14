<template lang="pug">
.chart
    highcharts(:options="this.chartOptions")
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
    name: 'PrefectureDetail',
    components: {
        highcharts: Chart
    },
    data () {
        return {
            prefDetailData: {},
            chartOptions: {
                type: 'bar',
                title: {
                    text: ''
                },
                xAxis: {
                    categories: this.$store.state.years
                },
                series: []
            }
        }
    },
    components: {
        highcharts: Chart
    },
    mounted() {
        this.$store.dispatch('loadYears')
        
        const endpoint = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'
        this.axios
          .get(endpoint + '?prefCode=' + this.$route.params.id, {
            headers: {
              'X-API-KEY': process.env.VUE_APP_API_KEY,
            }
          })
          .then(response => {
            console.log(response.data.result.data)
            console.log(this.chartOptions)
          })
    }
}
</script>
