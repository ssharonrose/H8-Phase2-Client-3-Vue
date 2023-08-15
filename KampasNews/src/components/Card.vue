<script>

import { mapActions, mapState } from 'pinia'
import { useMainStore } from "../stores/mainStore"

export default {
    name: "Card",
    props: ["article"],
    methods: {
        ...mapActions(useMainStore, ["getOneArticle", "addBookmark"]),
        handleDetailArticle(id) {
            this.getOneArticle(id)
            // console.log(id);
        },
        handleBookmark(id){
            this.addBookmark(id)
        }
        
        // ...mapActions(useMainStore, ["readBookmark"]),
    },
    computed: {
        ...mapState(useMainStore, ['isLogin', 'isBookmark'])
    },
}
</script>

<template>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <img class="rounded-t-lg" :src="article.imgUrl" alt="" />
        </a>
        <div class="p-5">
            <a href="#">
                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{{ article.title }}</h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ article.content }}</p>
            <div class="flex items-center">
                <a href="#" @click.prevent="handleDetailArticle(article.id)"
                    class="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more
                    <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </a>
                <a href="#" v-if="isLogin" @click.prevent="handleBookmark(article.id)" 
                    class="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-yellow-300 rounded-lg hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-yellow-500 dark:bg-yellow-200 dark:hover:bg-yellow-300 dark:focus:ring-yellow-400"
                    style="margin-left: 5px;">
                    Bookmark
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>