export default({ $axios }, inject) => {
  inject('listAllCategory', () => $axios.$get('/article-server/category/listAll'))
}
