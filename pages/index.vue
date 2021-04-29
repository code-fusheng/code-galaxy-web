<template>
  <div class="container">
    <div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      port: ''
    }
  },
  // 方式一
  // asyncData({ $axios }) {
  //   return $axios.$get('http://localhost:9999/test-server/debug/getPort').then(res => {
  //     console.log(res)
  //     const port = res.data
  //     return { port }
  //   })
  // }
  // 方式二
  // async asyncData({ $axios }) {
  //   const res = await $axios.$get('/test-server/debug/getPort')
  //   return {port: res.data}
  // }
    async asyncData({ $axios, app}) {
      // const res = await app.$getPort()
      // return {port: res.data}
    },

    async mounted() {
      // const res = await this.$getPort()
    },

    methods: {
      getPort() {
        // const res = this.$getPort()
      }
    }


}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
