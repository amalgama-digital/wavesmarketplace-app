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
                <button v-if="offerButton" @click="offer = true">Offer For Sale</button>
                <button v-else-if="cancelButton" @click="cancelSelling">Cancel Selling</button>
                <button v-else-if="buyButton" @click="buy">Buy {{ this.viewCurrentPrice }} WAVES</button>
                <button v-else-if="!walletStatus" @click="connect = true">Connect wallet</button>
            </div>
        </div>
        <div v-if="offer" class="modal">
            <div class="wrapper">
                <div class="close" @click="offer = false"></div>
                <p>Price (WAVES)</p>
                <input v-model="price" placeholder="Enter price" type="number">
                <button @click="offerForSale">Submit</button>
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
                offer: false,
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
        computed: {
            viewCurrentPrice() {
                return this.currentPrice / 100000000;
            }
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

            async provider() {
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
            },

            async offerForSale() {
                await this.provider();

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
                            value: this.price * 100000000,
                        }],
                    },
                }).broadcast().then(res => {
                    console.log(res);
                    this.offer = false;
                }).catch(error => {
                    console.error(error);
                });
            },

            async cancelSelling() {
                await this.provider();

                await window.signer.invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [],
                    call: {
                        function: 'cancelSelling',
                        args: [{
                            type: 'string',
                            value: this.assetId,
                        }],
                    },
                }).broadcast().then(res => {
                    console.log(res);
                }).catch(error => {
                    console.error(error);
                });
            },

            async buy() {
                await this.provider();

                await window.signer.invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [{
                        assetId: 'WAVES',
                        amount: this.currentPrice,
                    }],
                    call: {
                        function: 'buy',
                        args: [{
                            type: 'string',
                            value: this.assetId,
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
        height: 200px;
        background-color: white;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 18px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        text-align: center;
    }

    .wrapper > input {
        height: 30px;
        font-size: 20px;
        margin-bottom: 15px;
    }

    .close {
        position: absolute;
        top: 10px;
        right: 25px;
        border: 0;
        background-color: white;
    }

    .close:hover {
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
</style>