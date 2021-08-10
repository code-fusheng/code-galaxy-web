<template>
  <div>
    <mavon-editor
          ref="md"
          v-model="markdownContent"
          code-style="monokai"
          :ishljs="true"
          :style="{height: carouselStyle.height + 'px', zIndex: 1}"
          @save="saveMavon"
    />
  </div>
</template>

<script>
import '@/plugins/mavon-editor.js'
export default {
  data() {
    return {
      markdownContent: null,
      carouselStyle: {
        widht: '',
        height: ''
      },
    }
  },
  created() {
    this.carouselStyle.height = document.body.clientHeight - 115
    this.carouselStyle.widht = document.body.clientWidth - 115
    window.onresize = () => {
      return (() => {
        this.carouselStyle.height = document.body.clientHeight - 115
        this.carouselStyle.widht = document.body.clientWidth - 115
        console.log('高度' + document.body.clientHeight + '宽度' + document.body.clientWidth)
      })()
    }
  },
  methods: {
    saveMavon() {}
  }
}
</script>

<style>

</style>
