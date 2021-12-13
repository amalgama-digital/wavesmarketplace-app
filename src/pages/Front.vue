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
            <div class="wavesmarketplace-footer-wrapper">
                <h2>GET ON THE LIST</h2>
                <p>Send a request and get an early access for the Waves Marketplace</p>
                <button>EARLY ACCESS</button>
                <div class="wavesmarketplace-links">
                    <a id="discord" target="_blank" href="https://discord.gg/gfpKDfRtvf">
                        <img src="/img/discord-footer.svg">
                    </a>
                    <a id="telegram" target="_blank" href="https://t.me/wavespunks_en">
                        <img src="/img/telegram-footer.svg">
                    </a>
                    <a id="instagram" target="_blank" href="https://instagram.com/waves.punks">
                        <img src="/img/instagram-footer.svg">
                    </a>
                </div>
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
    @media only screen and (max-width: 640px) {
        .wavesmarketplace-logo img {
            width: 300px !important;
        }

        .wavesmarketplace-footer-wrapper > h2 {
            font-size: 25px !important;
            line-height: 32px !important;
        }

        .wavesmarketplace-footer-wrapper > p {
            text-align: center;
            font-size: 14px !important;
            line-height: 18px !important;
        }
    }

    @media only screen and (max-width: 500px) {
        .wavesmarketplace-logo img {
            width: 225px !important;
        }
    }

    header {
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

    footer {
        font-family: Inter;
        font-style: normal;
        background: black;
        color: white;
        height: 500px;
    }

    .wavesmarketplace-footer-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        /* background: radial-gradient(46.38% 222.62% at 47.18% 167.45%, #7915A8 0.22%, rgba(0, 85, 255, 0) 100%); */
        background: radial-gradient(48.56% 121.64% at 48.37% 117%, #7915A8 0.22%, rgba(0, 85, 255, 0) 100%);
    }

    .wavesmarketplace-footer-wrapper > h2 {
        font-weight: 500;
        font-size: 35px;
        line-height: 42px;
    }

    .wavesmarketplace-footer-wrapper > p {
        font-weight: 300;
        font-size: 18px;
        line-height: 22px;
    }

    .wavesmarketplace-footer-wrapper > button {
        background: #FFD645;
        border-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        padding: 10px 35px;
        margin: 50px 0;
        border: 0;
        box-shadow: 2px 2px 2px 0px rgba(255, 214, 69, 0.6);
    }

    .wavesmarketplace-footer-wrapper > button:hover {
        cursor: pointer;
    }
</style>
