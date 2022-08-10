<template>
    <div class="front">
        <Header></Header>
        <main>
            <router-view></router-view>
        </main>
        <div class="footer__text">NFT TSUNAMI IS HERE</div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Front/Header.vue';
import Footer from '../components/Front/Footer.vue';

export default {
    name: 'Front',
    components: {
        Header,
        Footer,
    },
};
</script>

<style scoped>
main {
    min-height: calc(100vh - 298px);
}

.front {
    font-family: Inter;
    font-style: normal;
    overflow: hidden;
}

.footer__text {
    position: relative;
    width: max-content;
    margin: auto;
    font-weight: 900;
    font-size: 8.6vw;
    line-height: 182px;
    text-align: center;
    text-transform: uppercase;
    color: #f0f0f3;
    text-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
}
</style>
