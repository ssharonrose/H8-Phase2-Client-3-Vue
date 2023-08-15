<script>

import Card from "../components/Card.vue"
import HeroArticle from '../components/HeroArticle.vue'
import NavBar from '../components/NavBar.vue'

import { useMainStore, useArticleStore } from '../stores/mainStore';
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia';

export default {
    name: "ArticlePage",
    data() {
        return {
            dataSearch: {
                title: ""
            }
        }
    },
    components: {
        NavBar, HeroArticle, Card,
    },
    methods: {
        ...mapActions(useMainStore, ["getAllCategory"]),
        ...mapActions(useArticleStore, ["readArticle", "renderSearch"]),
        handleSearch() {
            this.renderSearch(this.dataSearch.title)
        }

        // ini methods action buat pake function getAllArticle
    },
    async created() {
        await this.readArticle()
        await this.getAllCategory()
        console.log(this.articles);
        // ini buat data created yg dipake as display page ini
    },
    computed: {
        ...mapState(useMainStore, ["categories"]),
        ...mapState(useArticleStore, ["articles", "totalPage", "isBookmark"]),


        // ini buat nerima state articles dari useMainStore
    }
};
</script>
  
<template>
    <NavBar />
    <HeroArticle />
    <div class="bg-white">
        <div>
            <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style="padding-right: 50px;padding-left: 50px;">
                <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
                    style="padding-top: 20px;">
                    <h1 class="text-m font-bold tracking-tight text-gray-900">Filters Articles</h1>
                </div>

                <section aria-labelledby="products-heading" class="pb-24 pt-6">

                    <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                        <!-- Filters -->
                        <form class="hidden lg:block">
                            <h3 style="margin-bottom: 10px;">Category</h3>
                            <div v-for="category in categories" :key="category.id"
                                @click.prevent="readArticle(1, category.id)">
                                <div class="flex items-center mb-4">
                                    <input id="default-checkbox" type="checkbox"
                                        class="form-checkbox w-4 h-4 text-blue-600">

                                    <label for="default-checkbox"
                                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ category.name
                                        }}</label>
                                </div>
                            </div>



                            <form>
                                <label for="default-search"
                                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" v-model="dataSearch.title"
                                        class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search..." required>
                                    <div>
                                        <button @click.prevent="handleSearch()"
                                            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>

                                    </div>
                                </div>
                            </form>

                        </form>

                        <!-- Product grid -->
                        <div class="lg:col-span-3">
                            <!-- Your content -->
                            <div class="grid grid-cols-4 gap-4 h-full">
                                <Card v-for="article in articles" :key="article.id" :article="article" />
                            </div>
                        </div>
                    </div>
                    <!-- Pagination -->
                    <div class="flex justify-center mt-8">
                        <nav class="flex items-center">
                            <ul class="inline-flex items-center -space-x-px">
                                <li v-for="tp in totalPage" :key="tp.id" @click.prevent="readArticle(tp)">
                                    <a href="#"
                                        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{
                                            tp }}</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>


            </main>
        </div>
    </div>
</template>
