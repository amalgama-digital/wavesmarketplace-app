<template>
    <div class="news">
        <div class="news-articles">
            <a v-for="(article) in articles" v-bind:key="article.title" :href="article.guid" class="news-article">
                <img :src="article.thumbnail">
                <p class="news-article-title">{{ article.title }}</p>
                <p class="news-article-date">{{ new Date(article.pubDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "News",
    data() {
        return {
            articles: []
        }
    },
    async mounted() {
        try {
            let res = await this.$http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40wavespunks');
            if (res.status == 200) {
                this.articles = res.data.items;
            }
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<style scoped>
    .news {
        margin: 55px;
    }

    .news-articles {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        grid-gap: 32px;
        grid-auto-flow: dense;
        max-width: 1200px;
        margin: auto;
    }

    .news-article:nth-child(31n + 1) {
        grid-column: 1 / -2;
    }

    .news-article, .news-article:hover, .news-article:active {
        text-decoration: none;
        color: black;
    }

    .news-article, .news-article > img {
        width: 100%;
    }

    .news-article-title {
        color: #ff00ce !important;
        font-size: 20px;
        font-weight: 500;
        margin-top: 10px;
        text-overflow: clip;
        width: 100%;
    }

    .news-article-date {
        font-size: 14px;
        margin-top: -10px;
    }    
</style>
