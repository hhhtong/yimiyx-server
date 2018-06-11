<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'purchase-details',

  props: {
    details: Object
  },

  data() {
    return {
    }
  },

  watch: {
    details(val) {
      console.warn(val)
    }
  }
}
</script>
