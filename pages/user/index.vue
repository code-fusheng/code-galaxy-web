<template>
  <div>
    用户中心
    {{ userInfo }}
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  }
}
</script>
