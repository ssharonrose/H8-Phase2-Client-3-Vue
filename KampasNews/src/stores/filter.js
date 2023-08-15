export const useRenderArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    totalPage: 0,
    category: '',
    isFavorite: false
  }),
  actions: {
    async renderArticle(page = 1, categoryId = "") {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/customers/pub/renderPagination?page=${page}&limit=${6}&category=${categoryId}`
        })
        console.log(data);
        this.isFavorite = false
        this.totalPage = data.totalPage
        this.articles = data.data.rows
      } catch (err) {
        console.log(err)
      }
    },
    async renderSearch(title = "") {
      try {
        console.log('disini')
        console.log(title)
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/customers/pub/renderPagination?page=1&limit=${6}&title=${title}`
        })
        console.log(data);
        this.isFavorite = false
        this.totalPage = data.totalPage
        this.articles = data.data.rows
        if (this.totalPage === 0) {
          this.renderArticle()
          Swal.fire({
            icon: "error",
            title: `Sorry we couldn't find news with this criteria. But don't worry, you can find plenty of other news on our homepage!`,
          });
        }

      } catch (err) {
        console.log(err)
      }
    }
  },
})