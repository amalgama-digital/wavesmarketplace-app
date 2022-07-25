<template>
    <div class="modal">
        <div>
            <button class="close" @click="close"></button>
            <div class="connect" @click="connectKeeper">
                <p>Waves Keeper</p>
                <img src="@/assets/images/connect/keeper.png" />
            </div>
            <div class="connect" @click="connectEmail">
                <p>Waves Exchange Email</p>
                <img src="@/assets/images/connect/exchange.svg" />
            </div>
            <p class="error" v-if="error">{{ error_text }}</p>
        </div>
    </div>
</template>

<script>
import { ProviderKeeper } from "@waves/provider-keeper";
import { ProviderCloud } from "@waves.exchange/provider-cloud";

export default {
    name: "ConnectWallet",
    data() {
        return {
            error: false,
            error_text: "",
        };
    },
    mounted() {
        this.error = false;
    },
    methods: {
        async connectKeeper() {
            this.error = false;
            if (window.signer) {
                const authData = { data: "https://wavesmarketplace.com/" };

                await window.signer.setProvider(new ProviderKeeper(authData))
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.error = true;
                        this.error_text = error;
                    });

                await window.signer.login()
                    .then((res) => {
                        console.log(res);

                        let data = {};
                        data.choice = "keeper";
                        data.address = res.address;
                        data.publicKey = res.publicKey;

                        window.localStorage.setItem("loginChoice", JSON.stringify(data));

                        this.close();
                        this.success(data.address);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.error = true;
                        this.error_text = error;
                    });
            }
        },
        async connectEmail() {
            this.error = false;
            if (window.signer) {
                window.signer.setProvider(new ProviderCloud());

                await window.signer.login()
                    .then((res) => {
                        console.log(res);

                        let data = {};
                        data.choice = "email";
                        data.address = res.address;
                        data.publicKey = res.publicKey;

                        window.localStorage.setItem("loginChoice", JSON.stringify(data));

                        this.close();
                        this.success(data.address);
                    })
                    .catch((error) => {
                        console.error(error);
                        this.error = true;
                        this.error_text = error;
                    });
            }
        },
        success(address) {
            this.$emit("success", address);
        },
        close() {
            this.$emit("close", false);
        },
    },
};
</script>

<style scoped>
@import '../assets/styles/button.css';
@import '../assets/styles/modal.css';

.modal > div {
    flex-direction: column;
}

.connect {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    padding: 0px 20px;
    border: 1px solid rgb(241, 242, 254);
    border-radius: 20px;
    cursor: pointer;
}

.connect > img {
    width: 40px;
}

.error {
    position: absolute;
    bottom: 10px;
    font-size: 14px;
    font-weight: 300;
    color: red;
}
</style>