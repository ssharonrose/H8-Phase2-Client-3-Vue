<script>
import { useMainStore } from '../stores/mainStore';
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia';
import HeroArticle from '../components/HeroArticle.vue'
import NavBar from '../components/NavBar.vue'

import Card from '../components/Card.vue';
export default {
  name: "DetailArticlePage",
  methods: {
    ...mapActions(useMainStore, ["getOneArticle"]),
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    }
    // ini methods action buat pake function 
  },
  async created() {

    // if (this.$route.params.articleId) {
    await this.getOneArticle(this.$route.params.articleId);
    console.log("masuk if <<<<<<<<<");
    // } 
    // else {
    //   await this.getOneArticle();
    //   console.log("masuk else <<<<<<<<<");
    // }
    // ini buat data created yg dipake as display page ini
  },
  computed: {
    ...mapState(useMainStore, ["articleOne", "picqr"])
    // ini buat nerima state articles dari useMainStore
  },
  components: { Card, NavBar, HeroArticle }
};
</script>

<template>
  <div class="bg-gray-100">
    <NavBar />
    <div class="container mx-auto py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-4">{{ articleOne.title }}</h1>
        <img class="w-full mb-4" :src="articleOne.imgUrl" alt="Article Image">

        <div class="flex items-center text-sm text-gray-500 mb-4">
          <p>By: {{ articleOne.User.email }}</p>
          <span class="mx-2">•</span>
          <p>Date: {{ formatDate(articleOne.User.createdAt) }}</p>
        </div>
        <h3 class="text-lg leading-relaxed mb-8">{{ articleOne.content }}</h3>
        <div v-html="picqr" class="w-64 h-auto" />
      </div>
    </div>
  </div>
</template>


<style scoped></style>
