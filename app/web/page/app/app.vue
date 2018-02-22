<template>
  <div>
    {{ message + 13 }}
  </div>
</template>

<script>
export default {
  data() {
    message: 'ttt@'
  },

  mounted() {
    console.warn(1)
  }
}
</script>
