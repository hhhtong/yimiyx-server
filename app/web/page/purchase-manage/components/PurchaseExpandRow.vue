<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'purchase-details',

  props: {
    row: Object
  },

  data() {
    return {
      curData: this.$route.params
    }
  },

  created() {
    console.log(this.curData)
  }
}
</script>
