import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    prefs: [],
    chartData:{
      title: {
        text: '日本の人口推移'
      },
      chart: {
        type: 'line'
      },
      xAxis: {
        categories: []
      },
      yAxis: {
        title: {
          text: '人口'
        }
      },
      series: [],
    }
  },
  mutations: {
    SET_PREFS (state, prefs) {
      state.prefs = prefs
      localStorage.setItem('ksr-prefs', JSON.stringify(prefs))
    },
    SET_YEARS (state, years) {
      state.chartData.xAxis.categories = years
      localStorage.setItem('ksr-years', JSON.stringify(years))
    },
    async SET_CHARTDATA (state, data) {
      await state.chartData.series.push({
        id: data.id,
        name: state.prefs[data.id - 1].prefName,
        data: data.values
      })
    },
    async DELETE_CHARTDATA (state, id) {
      // console.log(state.chartData.series)
      await state.chartData.series.filter((elem,i) => {
        if(elem.id == id) this.state.chartData.series.splice(i,1)
      })
    }
  },
  actions: {
    async loadPrefs ({ commit }) {
      // Get all prefs from API
      const localPrefs = localStorage.getItem('ksr-prefs')
      if(!localPrefs) {
        await axios
        .get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
          headers: {
            'X-API-KEY': process.env.VUE_APP_API_KEY,
          },
        })
        .then(response => {
          // console.log(response.data.result)
          commit('SET_PREFS', response.data.result)
        })
      } else {
        commit('SET_PREFS', JSON.parse(localPrefs))
      }
    },

    async loadYears ({ commit }) {
      // Get year from API for X-axis
      const localYears = localStorage.getItem('ksr-years')
      if(!localYears) {
        await axios
        .get('https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=1', {
          headers: {
            'X-API-KEY': process.env.VUE_APP_API_KEY
          }
        })
        .then(response => {
          const years = _.map(response.data.result.data[0].data, 'year')
          // console.log(years)
          commit('SET_YEARS', years)
        })
      } else {
        commit('SET_YEARS', JSON.parse(localYears))
      }
    },

    getPopulation({commit}, id) {
      // check the data of the prefecture
      let checkExist = this.state.chartData.series.filter(elem => elem.id === id)

      // console.log(checkExist)

      if(checkExist.length) {
        // console.log("the data of this prefecture already exists.")
        commit('DELETE_CHARTDATA', id)
      } else {
        const endpoint = 'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear'
        axios
          .get(endpoint + '?prefCode=' + id, {
            headers: {
              'X-API-KEY': process.env.VUE_APP_API_KEY,
            }
          })
          .then(response => {
            // Get population data of the prefecture
            let population = response.data.result.data[0].data
            population = _.map(population, 'value')

            const data = {
              id: id,
              values: population,
              chartType: 'bar',
            }
            commit('SET_CHARTDATA', data)
          })
      }
    }
  }
})
