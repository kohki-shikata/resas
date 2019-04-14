<template lang="pug">
.main
  globalHeader
  router-view
</template>

<script>
import globalHeader from '@/components/globalHeader'
export default {
  components: {
    globalHeader
  }
}
</script>


<style lang="stylus">

</style>
