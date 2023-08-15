<script>
import { useMainStore } from '../stores/mainStore';
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia';

import NavBar from '../components/NavBar.vue'

import Card from '../components/Card.vue';

export default {
    methods: {
        ...mapActions(useMainStore, ["readBookmark"]),
    },
    async created() {
        await this.readBookmark()
        console.log(this.bookmark);
        // ini buat data created yg dipake as display page ini
    },
    computed: {
        ...mapState(useMainStore, ["bookmark", "isBookmark"]),
        // ini buat nerima state articles dari useMainStore
    },
    components: { Card, NavBar }
}

</script>

<template>
    <NavBar />
    <div class="container mx-auto py-8">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl text-center font-bold mb-4">MY BOOKMARK LIST!</h1>
            <div class="lg:col-span-3">
                <!-- Your content -->
                <div class="grid grid-cols-4 gap-4 h-full" v-if="bookmark.length >= 1">
                    <!-- {{ bookmark }}  -->
                    <!-- ini array -->
                    <!-- {{ bookmark.Article }} -->
                    <Card v-for="article in bookmark" :key="article.id" :article="article.Article" />
                </div>
                <div v-else class="flex flex-col items-center mt-10">
                    <h1 class="text-xl text-gray-800 mb-4">Cukup dompet mu saja yang kosong</h1>
                    <h1 class="text-xl text-gray-800 mb-4">jangan biarkan bookmark mu juga :P</h1>
                    <img src="https://i.pinimg.com/originals/27/12/92/2712927f1f01d14bc3a67cecc9b92d09.jpg" alt="Funny Meme"
                        class="w-64 h-auto">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>