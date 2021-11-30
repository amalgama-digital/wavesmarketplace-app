<template>
    <div class="modal">
        <div class="wrapper">
            <button class="close" @click="close"></button>
            <button class="button" @click="connectKeeper">Waves Keeper</button>
            <button class="button" @click="connectEmail">Waves Email</button>
            <p class="error" v-if="error">{{ error_text }}</p>
        </div>
    </div>
</template>

<script>
    import { ProviderKeeper } from '@waves/provider-keeper';
    import { ProviderCloud } from '@waves.exchange/provider-cloud';
    export default {
        name: "ConnectWallet",
        data(){
            return {
                error_text: '',
                error: false,
            }
        },
        mounted() {
            this.error = false;
        },
        methods: {
            async connectKeeper() {
                this.error = false;
                if (window.signer) {
                    const authData = { data: 'https://wavespunks.com/' };
                    await window.signer.setProvider(new ProviderKeeper(authData)).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.error(error);
                        this.error = true;
                        this.error_text = error;
                    });
                    await window.signer.login().then(res => {
                        console.log(res);
                        let data = {};
                        data.choice = "keeper";
                        data.address = res.address;
                        data.publicKey = res.publicKey;
                        window.localStorage.setItem("loginChoice", JSON.stringify(data));
                        this.close();
                        this.success(data.address);
                    }).catch(error => {
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
                    await window.signer.login().then(res => {
                        console.log(res);
                        let data = {};
                        data.choice = "email";
                        data.address = res.address;
                        data.publicKey = res.publicKey;
                        window.localStorage.setItem("loginChoice", JSON.stringify(data));
                        this.close();
                        this.success(data.address);
                    }).catch(error => {
                        console.error(error);
                        this.error = true;
                        this.error_text = error;
                    });
                }
            },
            success(address) {
                this.$emit('success', address);
            },
            close() {
                this.$emit('close', false);
            }
        }
    }
</script>

<style scoped>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Inter;
        font-style: normal;
    }
    .wrapper {
        width: 340px;
        height: 160px;
        background-color: white;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 18px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
    }
    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        border: 0;
        background-color: white;
    }
    .button:hover, .close:hover {
        cursor: pointer;
    }
    .close:before, .close:after {
        position: absolute;
        left: 0px;
        content: ' ';
        height: 23px;
        width: 2px;
        background-color: #333;
    }
    .close:before {
        transform: rotate(45deg);
    }
    .close:after {
        transform: rotate(-45deg);
    }
    .button {
        background: #0055FF;
        border: 0;
        box-shadow: 2px 2px 2px 0px rgba(6, 59, 166, 0.6), -2px -2px 2px 0px rgba(255, 255, 255, 0.8);
        border-radius: 8px;
        color: white;
        padding: 10px 20px;
    }
    .error {
        position: absolute;
        bottom: 10px;
        font-size: 14px;
        font-weight: 300;
        color: red;
    }
</style>