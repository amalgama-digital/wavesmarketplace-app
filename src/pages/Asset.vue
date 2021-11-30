<template>
    <div>
        <div class="nft">
            <img class="nft-url" :src="nft.metadata.url">
            <div class="nft-button">
                <div>
                    <div class="nft-name">
                        <p>{{ nft.name }}</p>
                    </div>
                </div>
                <button v-if="offerButton" @click="offerForSale">Offer For Sale</button>
                <button v-else-if="cancelButton">Cancel Selling</button>
                <button v-else-if="buyButton">Buy</button>
                <button v-else-if="!walletStatus" @click="connect = true">Connect wallet</button>
            </div>
        </div>
        <connect-wallet v-if="connect" :connect="connect" v-on:close="connect = $event" v-on:success="getInfo($event)"></connect-wallet>
    </div>
</template>

<script>
    import axios from "axios";

    import { ProviderKeeper } from '@waves/provider-keeper';
    import { ProviderCloud } from '@waves.exchange/provider-cloud';

    import ConnectWallet from "../components/ConnectWallet.vue";

    export default {
        name: "Asset",
        data() {
            return {
                connect: false,
                walletStatus: false,
                assetId: "",
                nft: {},
                price: 0,
                currentPrice: 0,
                address: "",
                offerButton: false,
                cancelButton: false,
                buyButton: false
            }
        },
        components: {
            ConnectWallet
        },
        async mounted() {
            this.assetId = this.$route.params["id"];
            const data = window.localStorage.getItem("loginChoice");
            if (!data) {
                this.connect = true;
            } else {
                this.wallet = JSON.parse(data);
                this.getInfo(this.wallet.address);
            }
            this.getNFT();
        },
        methods: {
            async getInfo(address) {
                this.walletStatus = true;
                this.address = address;
                await axios.get(`${window.nodeURL}/assets/balance/${address}/${this.assetId}`)
                    .then(res => {
                        if (res.data.balance == 1) {
                            this.offerButton = true;
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });

                if (!this.offerButton) {
                    await axios.get(`${window.nodeURL}/addresses/data/${window.contractAddress}?key=${this.assetId}_owner&key=${this.assetId}_price`)
                        .then(res => {
                            this.currentPrice = res.data[1].value;
                            if (res.data[0].value == address) {
                                this.cancelButton = true;
                            } else {
                                this.buyButton = true;
                            }
                        })
                        .catch(err => {
                            console.error(err);
                        });
                }
            },

            async getNFT() {
                await axios.get(`${window.nodeURL}/assets/details/${this.assetId}`)
                    .then(res => {
                        try {
                            let data = {};
                            data.name = res.data.name;
                            data.metadata = JSON.parse(res.data.description);
                            this.nft = data;
                        } catch (err) {
                            console.error(err);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            },

            async offerForSale() {
                const data = JSON.parse(window.localStorage.getItem("loginChoice"));
                if (data.choice == "keeper") {
                    const authData = { data: 'https://wavesmarketplace.com/' };
                    await window.signer.setProvider(new ProviderKeeper(authData)).then(res => {
                        console.log(res);
                    }).catch(error => {
                        console.error(error);
                    });
                } else if (data.choice == "email") {
                    window.signer.setProvider(new ProviderCloud());
                }

                await window.signer.invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [{
                        assetId: this.assetId,
                        amount: 1,
                    }],
                    call: {
                        function: 'offerForSale',
                        args: [{
                            type: 'integer',
                            value: this.price,
                        }],
                    },
                }).broadcast().then(res => {
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
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

    .nft {
        margin: 55px;
        height: min-content;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nft-url {
        width: 357px;
        border-radius: 18px;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
    }

    .nft-button {
        margin-left: 40px;
    }

    .nft-name {
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
    }
</style>