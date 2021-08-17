export default({ $axios }, inject) => {
    inject('saveDraft', article => $axios.$post('/article-server/article/saveDraft', article))
  }