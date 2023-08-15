<script>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import HeroArticle from './components/HeroArticle.vue';
import ArticlePage from './views/ArticlePage.vue';

export default {
  components: { NavBar, ArticlePage, HeroArticle },
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

<!-- <header>
  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

  <div class="wrapper">
    <HelloWorld msg="You did it!" />

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div>
</header>


<RouterView /> -->
