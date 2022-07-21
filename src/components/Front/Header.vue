<template>
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
        <connect-wallet
            :connect="connect"
            v-if="connect"
            v-on:close="connect = $event"
            v-on:success="login()"
        ></connect-wallet>
    </header>
</template>

<script>
import ConnectWallet from "../ConnectWallet.vue";

export default {
    name: "Header",
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
@media only screen and (max-width: 1440px) {
    header {
        margin: 65px !important;
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
}

header {
    display: flex;
    justify-content: space-between;
    max-width: 1360px;
    margin: auto;
    margin-top: 65px;
    margin-bottom: 65px;
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
</style>