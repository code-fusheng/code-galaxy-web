<template>
  <div>
    测试 {{ port }}
    <el-button type="primary">测试</el-button>
  </div>
</template>

<script>

export default {
  middleware: 'auth',
  data() {
    return {
      port: "",
    };
  },
  async asyncData({ app }) {
    const { data } = await app.$getPort()
    console.log(data)
    return {port: data};
  }
};
</script>
