import { defineStore } from 'pinia'
import axios from "axios"
import Swal from 'sweetalert2';

// const baseUrl = "http://localhost:3000"
const baseUrl = "https://kampas-news.sharonrose.dev"

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export const useMainStore = defineStore("main", {
  state: () => ({
    isLogin: localStorage.getItem('access_token') ? true : false,
    isBookmark: false,
    articles: [],
    articleOne: [],
    bookmark: [],
    categories: [],
    totalPage: 0,
    picqr: ''
  }),
  actions: {
    async loginHandler(email, password) {
      try {
        console.log(email, password);
        const { data } = await axios({
          url: `${baseUrl}/customers/login`,
          method: "POST",
          data: {
            email, password
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })

        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true


        this.router.push("/")

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },
    async registerHandler(email, password) {
      try {
        console.log(email, password);
        const { data } = await axios({
          url: `${baseUrl}/customers/register`,
          method: "POST",
          data: {
            email, password
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Register in successfully'
        })

        this.router.push("/login")
        
      } catch (error) {
        console.log(error);
        // console.log(error.response, "ini errors");
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },

    

    async handleCredentialResponse(response) {
      try {
        const google_token = response.credential;
        const { data } = await axios({
          method: "POST",
          url: `${baseUrl}/customers/glogin`,
          data: {
            google_token: google_token,
          },
        });

        localStorage.setItem("access_token", data.access_token);
        this.isLogin = true
        this.router.push("/")
        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })

      } catch (err) {
        console.log(err);
        Swal.fire({
          title: 'Error!',
          text: `${err.response.data.message}`,
          icon: 'error',
        })
      }
    },

    //-------- ARTICLE --------- //



    async getAllArticle() {
      try {

        const { data } = await axios({
          url: `${baseUrl}/customers/articles`,
          method: "GET",
        })

        this.articles = data.message

        console.log(this.articles);
        this.isBookmark = true

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },



    async getOneArticle(id) {
      try {


        console.log(id);

        const { data } = await axios({
          url: `${baseUrl}/customers/articles/${id}`,
          method: "GET",
        })

        this.articleOne = data.message
        this.picqr = data.qr
        // this.detail = data.getOne

        this.router.push(`/article/${id}`)

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },

    async addBookmark(id) {
      try {
        console.log(id);
        const { data } = await axios({
          url: `${baseUrl}/customers/bookmark/${id}`,
          method: "POST",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Article successfully added to bookmarks'
        })

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },

    async readBookmark() {
      try {
        const { data } = await axios({
          url: `${baseUrl}/customers/bookmark`,
          method: "GET",
          headers: {
            access_token: localStorage.getItem("access_token")
          }
        })

        if (data.length < 1) {
          Swal.fire({
            text: `No articles found in the bookmark page"`,
            icon: 'error',
          })
        }

        // console.log(data.message);
        this.bookmark = data
        console.log(this.bookmark);
        this.isBookmark = true
        console.log(this.isBookmark);

      } catch (error) {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
        })
      }
    },

    async logoutHandler() {
      localStorage.clear()
      this.isLogin = false
      Toast.fire({
        icon: 'success',
        title: 'Logout in successfully'
      })
    },

    async getAllCategory() {
      try {

        const { data } = await axios({
          url: `${baseUrl}/customers/categories`,
          method: "GET",
        })

        this.categories = data.message

        console.log(this.categories);

      } catch (error) {
        console.log(error);
      }
    },










  }
})

export const useArticleStore = defineStore('articles', {
  state: () => ({
    articles: [],
    totalPage: 0,
    category: '',
    isBookmark: false
  }),
  actions: {
    async readArticle(page = 1, categoryId = "") {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${baseUrl}/customers/articles?page=${page}&limit=${8}&category=${categoryId}`
        })
        console.log(data);

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
          url: `${baseUrl}/customers/articles?page=1&limit=${8}&title=${title}`
        })
        console.log(data);
        this.articles = data.message
        this.isBookmark = true
        this.totalPage = data.totalPage
        this.articles = data.data.rows
        console.log(this.articles);
        if (this.totalPage === 0) {
          this.readArticle()
        }

      } catch (err) {
        console.log(err)
      }
    }
  },
})
