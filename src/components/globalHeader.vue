<template lang="pug">
.header
    h1 日本の人口推移
    Dropdown
        template(slot="btn") 都道府県詳細
        template(slot="body" v-for="item in this.$store.state.prefs")
            router-link(to="/prefecture-detail/1" tag="li") {{ item.prefName }}
</template>

<script>
import Dropdown from 'bp-vuejs-dropdown'
export default {
    name: 'globalHeader',
    components: {
        Dropdown,
    },
    mounted() {
        this.$store.dispatch('loadPrefs')
    }
}
</script>

