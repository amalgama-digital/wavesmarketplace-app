<template>
    <div>
        <div class="block">
            <div class="nft">
                <NFT v-if="nft.name" :nft="nft"></NFT>
                <div class="nft__info">
                    <div>
                        <a :href="nft.collectionURL" class="nft__collection">
                            {{ nft.collectionName }}
                        </a>
                        <div class="nft__name">
                            <p>{{ nft.name }}</p>
                        </div>
                        <div v-if="owner" class="nft__owner">
                            <p>Owned by
                                <a :href="`/user/${owner}`">{{ owner }}</a>
                            </p>
                        </div>
                    </div>
                    <button v-if="offerButton" @click="offer = true">
                        Offer for sale
                    </button>
                    <div v-else-if="cancelButton" class="nft__buy">
                        <p>{{ this.viewCurrentPrice }} <img src="/img/waves-token.svg" /></p>
                        <button @click="cancelSelling">
                            Cancel selling
                        </button>
                    </div>
                    <div v-else-if="buyButton" class="nft__buy">
                        <p>{{ this.viewCurrentPrice }} <img src="/img/waves-token.svg" /></p>
                        <button @click="buy">
                            Buy now
                        </button>
                    </div>
                    <button v-else-if="!walletStatus" @click="connect = true">
                        Connect wallet
                    </button>
                </div>
            </div>
        </div>
        <offer
            :assetId="assetId"
            v-if="offer"
            v-on:close="offer = $event"
        ></offer>
        <connect-wallet
            :connect="connect"
            v-if="connect"
            v-on:close="connect = $event"
            v-on:success="getInfo($event)"
        ></connect-wallet>
    </div>
</template>

<script>
import axios from "axios";
import collection from "../collection.json";

import { ProviderKeeper } from "@waves/provider-keeper";
import { ProviderCloud } from "@waves.exchange/provider-cloud";

import ConnectWallet from "../components/ConnectWallet.vue";
import NFT from "../components/NFT.vue";
import Offer from "../components/Offer.vue";

export default {
    name: "Asset",
    data() {
        return {
            connect: false,
            walletStatus: false,
            assetId: "",
            nft: {},
            currentPrice: 0,
            owner: "",
            offer: false,
            offerButton: false,
            cancelButton: false,
            buyButton: false,
        };
    },
    components: {
        ConnectWallet,
        NFT,
        Offer,
    },
    async mounted() {
        this.assetId = this.$route.params["id"];
        const data = window.localStorage.getItem("loginChoice");
        if (!data) {
            this.getInfo("");
        } else {
            this.wallet = JSON.parse(data);
            this.getInfo(this.wallet.address);
        }
        this.getNFT();
    },
    computed: {
        viewCurrentPrice() {
            return this.currentPrice / 100000000;
        },
    },
    methods: {
        async getInfo(address) {
            if (address !== "") {
                this.walletStatus = true;
            }

            await axios
                .get(
                    `${window.nodeURL}/assets/balance/${address}/${this.assetId}`
                )
                .then((res) => {
                    if (this.walletStatus && res.data.balance == 1) {
                        this.owner = address;
                        this.offerButton = true;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            if (!this.offerButton) {
                await axios
                    .get(
                        `${window.nodeURL}/addresses/data/${window.contractAddress}?key=${this.assetId}_owner&key=${this.assetId}_price`
                    )
                    .then((res) => {
                        this.owner = res.data[0].value;
                        this.currentPrice = res.data[1].value;
                        if (this.walletStatus) {
                            if (this.owner == address) {
                                this.cancelButton = true;
                            } else {
                                this.buyButton = true;
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        },

        async getNFT() {
            await axios
                .get(`${window.nodeURL}/assets/details/${this.assetId}`)
                .then((res) => {
                    try {
                        let data = {};

                        data.name = res.data.name;

                        data.metadata = JSON.parse(res.data.description);

                        const collectionName = Object.values(collection).find(
                            (item) => item.address_issuer == res.data.issuer
                        );

                        data.collectionName = collectionName ? collectionName.name : "";

                        data.collectionURL =
                            "/collection/" +
                            Object.keys(collection).find(
                                (key) => collection[key].address_issuer == res.data.issuer
                            );

                        this.nft = data;
                    } catch (err) {
                        console.error(err);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        async provider() {
            const data = JSON.parse(window.localStorage.getItem("loginChoice"));
            if (data.choice == "keeper") {
                const authData = { data: "https://wavesmarketplace.com/" };
                await window.signer.setProvider(new ProviderKeeper(authData))
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else if (data.choice == "email") {
                window.signer.setProvider(new ProviderCloud());
            }
        },

        async cancelSelling() {
            await this.provider();

            await window.signer
                .invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [],
                    call: {
                        function: "cancelSelling",
                        args: [
                            {
                                type: "string",
                                value: this.assetId,
                            },
                        ],
                    },
                })
                .broadcast()
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async buy() {
            await this.provider();

            await window.signer
                .invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [
                        {
                            assetId: "WAVES",
                            amount: this.currentPrice,
                        },
                    ],
                    call: {
                        function: "buy",
                        args: [
                            {
                                type: "string",
                                value: this.assetId,
                            },
                        ],
                    },
                })
                .broadcast()
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>

<style scoped>
@import '../assets/styles/button.css';

@media only screen and (min-width: 769px) {
    .nft__info {
        margin-left: 40px;
    }
}

@media only screen and (max-width: 768px) {
    .block {
        max-width: 100% !important;
        margin: 15px !important;
        padding: 10px !important;
    }

    .nft {
        flex-direction: column;
        align-items: flex-start !important;
    }

    .nft__info {
        width: 100%;
        margin-top: 40px;
    }

    .nft__collection {
        font-size: 14px !important;
        line-height: 17px !important;
    }

    .nft__name {
        font-size: 25px !important;
        line-height: 30px !important;
    }

    .nft__owner > p > a {
        display: block;
        max-width: 200px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.block {
    max-width: max-content;
    margin: auto;
    padding: 60px;
    border-radius: 20px;
    background-color: white;
    box-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25), -3px -3px 6px rgba(255, 255, 255, 0.6);
}

.nft {
    display: flex;
    justify-content: center;
    align-items: center;
    height: min-content;
}

.nft__collection {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
}

.nft__collection,
.nft__collection:hover,
.nft__collection:active {
    color: #0055ff;
    text-decoration: none;
    cursor: pointer;
}

.nft__name {
    font-weight: 500;
    font-size: 35px;
    line-height: 42px;
}

.nft__owner > p {
    margin-bottom: 90px;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
}

.nft__owner > p > a,
.nft__owner > p > a:hover,
.nft__owner > p > a:active {
    color: #0055ff;
    text-decoration: none;
    cursor: pointer;
}

.nft__buy {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 26px;
    background: #F0F0F3;
    box-shadow: inset 0px -2px 4px rgba(255, 255, 255, 0.5), inset 0px 4px 4px rgba(7, 7, 7, 0.15);
}

.nft__buy > p {
    margin: 0;
    margin-left: 20px;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
}
</style>
