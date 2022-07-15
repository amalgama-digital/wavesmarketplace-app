<template>
    <div class="news">
        <div class="news__articles">
            <a :href="article.guid" class="article" v-for="article in articles" v-bind:key="article.title">
                <img :src="article.thumbnail" />
                <p class="article__title">{{ article.title }}</p>
                <p class="article__date">
                    {{
                        new Date(article.pubDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })
                    }}
                </p>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "News",
    data() {
        return {
            articles: [],
        };
    },
    async mounted() {
        try {
            const res = await this.$http.get(
                "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40wavespunks"
            );
            if (res.status == 200) {
                this.articles = res.data.items;
            }
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style scoped>
.news {
    margin: 55px;
}

.news__articles {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 32px;
    grid-auto-flow: dense;
    max-width: 1200px;
    margin: auto;
}

.article:nth-child(31n + 1) {
    grid-column: 1 / -2;
}

.article,
.article:hover,
.article:active {
    text-decoration: none;
    color: black;
}

.article,
.article > img {
    width: 100%;
}

.article__title {
    width: 100%;
    margin-top: 10px;
    color: #0055FF !important;
    font-size: 20px;
    font-weight: 500;
    text-overflow: clip;
}

.article__date {
    margin-top: -10px;
    font-size: 14px;
}
</style>
