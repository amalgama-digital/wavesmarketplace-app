<template>
    <div>
        <div class="wallet" v-if="!walletStatus">
            <h2>Connect your Waves wallet</h2>
            <button @click="connect = true">Connect wallet</button>
        </div>
        <div class="my-nft" v-if="nfts.length > 0">
            <a :href="`asset/${nft.assetId}`" class="nft" v-for="(nft) in nfts" v-bind:key="nft.id">
                <img :src="nft.metadata.url">
                <div>
                    <div class="nft-name">
                        <p>{{ nft.name }}</p>
                    </div>
                </div>
            </a>
        </div>
        <div class="no-my-nft" v-else-if="walletStatus && nfts.length <= 0">
            <p>?</p>
            <p>You don't have NFT yet</p>
        </div>
        <connect-wallet v-if="connect" :connect="connect" v-on:close="connect = $event" v-on:success="getMyNFT($event)"></connect-wallet>
    </div>
</template>

<script>
    import axios from "axios";
    import ConnectWallet from "../components/ConnectWallet.vue";

    export default {
        name: "MyNFT",
        data() {
            return {
                connect: false,
                wallet: {},
                walletStatus: false,
                nfts: []
            }
        },
        components: {
            ConnectWallet
        },
        async mounted() {
            const data = window.localStorage.getItem("loginChoice");
            if (!data) {
                this.connect = true;
            } else {
                this.wallet = JSON.parse(data);
                this.getMyNFT(this.wallet.address);
            }
        },
        methods: {
            async getMyNFT(address) {
                this.walletStatus = true;
                this.wallet.address = address;
                await axios.get(`${window.nodeURL}/assets/nft/${address}/limit/1000`)
                    .then(res => {
                        for(let i = 0; i < res.data.length; i++) {
                            try {
                                let data = {};
                                data.name = res.data[i].name;
                                data.assetId = res.data[i].assetId;
                                data.metadata = JSON.parse(res.data[i].description);
                                this.nfts.push(data);
                            } catch (err) {
                                console.error(err);
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },
            logout () {
                window.localStorage.removeItem("loginChoice");
                location.reload();
            }
        }
    }
</script>

<style scoped>
    button {
        background: #0055FF;
        border: 0;
        box-shadow: 2px 2px 2px 0px rgba(6, 59, 166, 0.6), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 8px;
        color: white;
        padding: 10px 20px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
    }

    button:hover {
        cursor: pointer;
    }

    .wallet, .my-nft, .no-my-nft {
        font-family: Inter;
        font-style: normal;
    }

    .wallet {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .wallet > h2 {
        font-weight: 500;
    }

    .my-nft {
        margin: 55px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .nft {
        width: 357px;
        height: 420px;
        background: #F1F1F1;
        border-radius: 18px;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        margin-top: 20px;
        padding: 20px;
    }

    .nft, .nft:hover, .nft:active {
        color: black;
        text-decoration: none;
    }

    .nft > img {
        width: 100%;
        margin: auto;
    }

    .nft-name {
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
    }

    .no-my-nft {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #F1F1F1;
        border-radius: 18px;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        width: 357px;
        height: 500px;
        padding: 20px;
        margin: auto;
    }

    .no-my-nft > p:first-child {
        font-size: 130px;
    }

    .no-my-nft > p:nth-child(2) {
        text-align: center;
    }
</style>