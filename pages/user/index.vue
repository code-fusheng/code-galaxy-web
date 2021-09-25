<template>
  <div>
    用户中心
    {{ userInfo }}
    <a
      href="https://aliyun-oss-model.oss-cn-beijing.aliyuncs.com/%E9%BB%84%E6%B2%BB%E5%8D%8E%E7%9A%84%E7%AE%80%E5%8E%86.pdf"
    >xxx</a>
  </div>
</template>

<script>
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>
