<template>
    <div>
        <div class="wallet" v-if="!walletStatus">
            <h2>Connect your Waves wallet</h2>
            <button @click="connect = true">Connect Wallet</button>
        </div>
        <div class="nfts" v-if="nfts.length > 0">
            <NFT :nft="nft" v-for="nft in nfts" v-bind:key="nft.assetId"></NFT>
        </div>
        <div class="empty" v-else-if="walletStatus && nfts.length <= 0">
            <p>?</p>
            <p>You don't have NFT yet</p>
        </div>
        <connect-wallet
            :connect="connect"
            v-if="connect"
            v-on:close="connect = $event"
            v-on:success="getMyNFT($event)"
        ></connect-wallet>
    </div>
</template>

<script>
import axios from "axios";

import ConnectWallet from "../components/ConnectWallet.vue";
import NFT from "../components/NFT.vue";

export default {
    name: "MyNFT",
    data() {
        return {
            connect: false,
            wallet: {},
            walletStatus: false,
            nfts: [],
        };
    },
    components: {
        ConnectWallet,
        NFT,
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

            await axios
                .get(`${window.nodeURL}/assets/nft/${address}/limit/1000`)
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
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
                .catch((err) => {
                    console.error(err);
                });

            await axios
                .get(
                    `${window.nodeURL}/addresses/data/${window.contractAddress}`
                )
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (
                            res.data[i].key.endsWith("_owner") &&
                            res.data[i].value == address
                        ) {
                            let data = {};

                            let l = res.data[i].key.length;

                            data.assetId = res.data[i].key.substring(0, l - 6);

                            data.name = res.data.find(
                                (item) => item.key == data.assetId + "_name"
                            ).value;

                            data.metadata = JSON.parse(
                                res.data.find(
                                    (item) => item.key == data.assetId + "_description"
                                ).value
                            );

                            this.nfts.push(data);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style scoped>
@import '../assets/styles/button.css';

.wallet,
.nfts,
.empty {
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

.nfts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 65px;
    gap: 0px 40px;
}

.empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 357px;
    height: 500px;
    padding: 20px;
    margin: auto;
    border-radius: 18px;
}

.empty > p:first-child {
    font-size: 130px;
}

.empty > p:nth-child(2) {
    text-align: center;
}
</style>
