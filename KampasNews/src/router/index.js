import { createRouter, createWebHistory } from 'vue-router'
import ArticlePage from "../views/ArticlePage.vue"
import LoginPage from "../views/LoginPage.vue"
import RegisterPage from "../views/RegisterPage.vue"
import BookmarkPage from "../views/BookmarkPage.vue"
import DetailArticlePage from "../views/DetailArticlePage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'ArticlePage',
      component: ArticlePage,
    },
    {
      path: "/bookmarks",
      name: "BookmarkPage",
      component: BookmarkPage,
    },
    {
      path: "/article/:articleId",
      name: "ArticleDetailPage",
      component: DetailArticlePage,
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'RegisterPage',
      component: RegisterPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);

  if ((to.name === "LoginPage" || to.name === "RegisterPage") && localStorage.getItem("access_token")) {
    next({ name: "ArticlePage" })
  } else if (to.name === "BookmarkPage" && !localStorage.getItem("access_token")) {
    next({ name: "ArticlePage" })
  } else {
    next()
  }
})



export default router
