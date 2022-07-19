<template>
    <div class="front">
        <header>
            <div class="header__logo">
                <a href="/">
                    <img src="/img/header/logo.svg" />
                </a>
            </div>
            <div v-if="authorized" class="header__links">
                <a href="/news">NEWS</a>
                <a :href="`/user/${wallet.address}`">MY NFT</a>
                <a href="#" @click="logout">LOG OUT</a>
            </div>
            <div v-else-if="!authorized" class="header__links">
                <a href="/news">NEWS</a>
                <a href="#" @click="connect = true">LOG IN</a>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
        <footer>
            <div class="footer__text">NFT TSUNAMI IS HERE</div>
            <div class="footer__blocks">
                <div class="footer__logo">
                    <a href="/">
                        <img src="/img/footer/logo.svg" />
                    </a>
                </div>
                <div class="footer__links">
                    <a id="discord" target="_blank" href="https://discord.gg/gfpKDfRtvf">
                        <img src="/img/footer/discord.svg" />
                    </a>
                    <a id="telegram" target="_blank" href="https://t.me/wavespunks_en">
                        <img src="/img/footer/telegram.svg" />
                    </a>
                    <a id="instagram" target="_blank" href="https://instagram.com/waves.punks">
                        <img src="/img/footer/instagram.svg" />
                    </a>
                </div>
                <div class="footer__company">
                    <a href="https://wavesassociation.org/">
                        <img src="/img/footer/wa.svg" />
                    </a>
                    <a href="https://picsell.art/">
                        <img src="/img/footer/psc.svg" />
                    </a>
                </div>
            </div>
        </footer>
        <connect-wallet
            :connect="connect"
            v-if="connect"
            v-on:close="connect = $event"
            v-on:success="login()"
        ></connect-wallet>
    </div>
</template>

<script>
import ConnectWallet from "../components/ConnectWallet.vue";

export default {
    name: "Front",
    data() {
        return {
            authorized: false,
            connect: false,
            wallet: {},
        };
    },
    components: {
        ConnectWallet,
    },
    mounted() {
        const data = window.localStorage.getItem("loginChoice");
        if (!data) {
            this.authorized = false;
        } else {
            this.authorized = true;
            this.wallet = JSON.parse(data);
        }
    },
    methods: {
        login() {
            this.authorized = true;
        },

        logout() {
            window.localStorage.removeItem("loginChoice");
            location.reload();
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 1140px) {
    .footer__text {
        font-size: 6.1vw !important;
    }
}

@media only screen and (max-width: 768px) {
    header {
        flex-direction: column;
        justify-content: center !important;
        align-items: center !important;
    }

    .header__logo img {
        width: 300px !important;
    }

    .header__links {
        margin-top: 20px;
    }

    .footer__blocks {
        flex-direction: column !important;
    }

    .footer__links {
        margin: 20px 0px;
    }
}

@media only screen and (max-width: 640px) {
    /* .header__logo img {
        width: 300px !important;
    } */
}

@media only screen and (max-width: 500px) {
    .header__logo img {
        width: 225px !important;
    }
}

@media only screen and (max-width: 425px) {
    .header__links > a {
        margin: 0px 5px !important;
    }

    .footer__text {
        font-size: 5.1vw !important;
    }
}

header {
    display: flex;
    justify-content: space-between;
    margin: 65px;
}

main {
    min-height: calc(100vh - 298px);
}

footer {
    margin: 65px;
    margin-bottom: 25px;
}

.front {
    font-family: Inter;
    font-style: normal;
}

.header__links {
    display: flex;
    align-items: center;
}

.header__links a,
.header__links a:hover,
.header__links a:active {
    text-decoration: none;
    color: black;
}

.header__links > a {
    margin: 0px 15px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
}

.footer__text {
    font-weight: 900;
    font-size: 8.1vw;
    line-height: 182px;
    text-align: center;
    text-transform: uppercase;
    color: #f0f0f3;
    text-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
}

.footer__blocks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.footer__links > a:first-child,
.footer__links > a:nth-child(2) {
    margin-right: 10px;
}

.footer__company {
    display: flex;
}

.footer__company > a:first-child {
    margin-right: 10px;
}
</style>
