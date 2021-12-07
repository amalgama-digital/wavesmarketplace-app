<template>
    <div class="wavesmarketplace-home">
        <header>
            <div class="wavesmarketplace-logo">
                <a href="/">
                    <img src="/img/logo-black.png">
                </a>
            </div>
            <div v-if="authorized" class="wavesmarketplace-links">
                <a href="/myNFT">MY NFT</a>
                <a href="#" @click="logout">LOG OUT</a>
            </div>
            <div v-else-if="!authorized" class="wavesmarketplace-links">
                <a href="#" @click="connect = true">LOG IN</a>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <div class="wavesmarketplace-com">
                © 2021 WavesMarketplace.com
            </div>
            <div class="wavesmarketplace-links">
                <a id="discord" target="_blank" href="https://discord.gg/gfpKDfRtvf">
                    <img src="/img/discord.svg">
                </a>
                <a id="telegram" target="_blank" href="https://t.me/wavespunks_en">
                    <img src="/img/telegram.svg">
                </a>
                <a id="instagram" target="_blank" href="https://instagram.com/waves.punks">
                    <img src="/img/instagram.svg">
                </a>
            </div>
        </footer>
        <connect-wallet v-if="connect" :connect="connect" v-on:close="connect = $event" v-on:success="login()"></connect-wallet>
    </div>
</template>

<script>
    import ConnectWallet from "../components/ConnectWallet.vue";

    export default {
        name: "Front",
        data() {
            return {
                authorized: false,
                connect: false
            }
        },
        components: {
            ConnectWallet
        },
        mounted() {
            const data = window.localStorage.getItem("loginChoice");
            if (!data) {
                this.authorized = false;
            } else {
                this.authorized = true;
            }
        },
        methods: {
            login() {
                this.authorized = true;
            },

            logout() {
                window.localStorage.removeItem("loginChoice");
                location.reload();
            }
        }
    }
</script>


<style scoped>
    header, footer {
        display: flex;
        justify-content: space-between;
        margin: 55px;
    }

    main {
        min-height: calc(100vh - 298px);
    }

    .wavesmarketplace-home {
        font-family: Inter;
        font-style: normal;
    }

    .wavesmarketplace-logo img {
        width: 400px;
    }

    .wavesmarketplace-links {
        display: flex;
        align-items: center;
    }

    .wavesmarketplace-links a, .wavesmarketplace-links a:hover, .wavesmarketplace-links a:active {
        text-decoration: none;
        color: black;
    }

    .wavesmarketplace-links > a {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        margin: 0px 15px;
    }

    .wavesmarketplace-com {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px 15px;
        font-weight: 300;
    }
</style>
