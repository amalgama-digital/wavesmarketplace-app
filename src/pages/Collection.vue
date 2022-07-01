<template>
    <div>
        <div class="collection-header">
            <div class="collection-header-back">
                <img :src="`/collections/${params}/background.png`">
            </div>
            <div class="collection-desc">
                <div class="collection-name">
                    <h1>{{ name }}</h1>
                    <p>{{ description }}</p>
                </div>
            </div>
        </div>

        <div class="collection-sort">
            Sort by
            <select @change="onChange($event)">
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="id-low-to-high">Lowest NFT ID</option>
                <option value="id-high-to-low">Highest NFT ID</option>
            </select>
        </div>

        <div class="collection-nfts">
            <a :href="`/asset/${nft.assetId}`" class="nft" v-for="(nft) in nfts" v-bind:key="nft.assetId">
                <img :src="nft.metadata.url">
                <div class="nft-desc">
                    <div class="nft-name">
                        <p>{{ nft.name }}</p>
                    </div>
                    <div class="nft-price">
                        <p>{{ nft.price }} <img src="/img/waves-token.svg" /></p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import collection from "../collection.json";

    export default {
        name: "Collection",
        data() {
            return {
                params: "",
                name: "",
                description: "",
                issuer: "",
                nfts: []
            }
        },
        async mounted() {
            this.params = this.$route.params["name"];
            this.name = collection[this.params].name;
            this.description = collection[this.params].description;
            this.issuer = collection[this.params].address_issuer;

            await axios.get(`${window.nodeURL}/addresses/data/${window.contractAddress}`)
                .then(res => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].key.endsWith("_issuer") && res.data[i].value == this.issuer) {
                            let data = {};

                            let l = res.data[i].key.length;
                            data.assetId = res.data[i].key.substring(0, l - 7);
                            data.name = res.data.find(item => item.key == data.assetId + "_name").value;
                            data.metadata = JSON.parse(res.data.find(item => item.key == data.assetId + "_description").value);
                            data.price = res.data.find(item => item.key == data.assetId + "_price").value / 100000000;

                            this.nfts.push(data);
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });

            this.sortLowestPrice();
        },
        methods: {
            onChange(event) {
                let v = event.target.value;
                if (v == "price-low-to-high") {
                    this.sortLowestPrice();
                } else if (v == "price-high-to-low") {
                    this.sortHighestPrice();
                } else if (v == "id-low-to-high") {
                    this.sortLowestId();
                } else if (v == "id-high-to-low") {
                    this.sortHighestId();
                }
            },
            sortLowestPrice() {
                this.nfts = this.nfts.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
            },
            sortHighestPrice() {
                this.nfts = this.nfts.sort((a,b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0));
            },
            sortLowestId() {
                this.nfts = this.nfts.sort((a,b) => (a.metadata.id > b.metadata.id) ? 1 : ((b.metadata.id > a.metadata.id) ? -1 : 0));
            },
            sortHighestId() {
                this.nfts = this.nfts.sort((a,b) => (a.metadata.id < b.metadata.id) ? 1 : ((b.metadata.id < a.metadata.id) ? -1 : 0));
            }
        }
    }
</script>

<style scoped>
    .collection-header {
        margin-top: 70px;
        height: 550px;
    }

    .collection-header-back {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 0;
        height: 550px;
        max-width: max-content;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
        border-radius: 18px;
        overflow: hidden;
        margin: auto;
    }

    .collection-header-back > img {
        height: 100%;
    }

    .collection-desc {
        background-color: #fff;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
        border-radius: 18px;
        position: relative;
        z-index: 1;
        max-width: 880px;
        margin: auto;
        margin-top: -90px;
    }

    .collection-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60px;
        color: #000;
    }

    .collection-name > h1 {
        text-align: center;
    }

    .collection-name > p {
        font-weight: 300;
        font-size: 1rem;
        line-height: 31px;
        text-align: center;
    }

    .collection-header {
        margin: 55px;
    }

    .collection-sort {
        margin: 55px 105px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .collection-sort > select {
        background: #F0F0F0;
        color: #0055FF;
        font-family: Inter;
        font-size: 14px;
        font-weight: 500;
        border: 0;
        padding: 10px;
    }

    .collection-sort > select:hover, .collection-sort > select:active {
        border: 0;
    }

    .collection-sort > select:focus-visible {
        outline: none;
    }

    .collection-nfts {
        margin: 65px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .nft {
        width: 357px;
        height: 450px;
        margin-top: 20px;
    }

    .nft, .nft:hover, .nft:active {
        color: black;
        text-decoration: none;
    }

    .nft > img {
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
        border-radius: 18px;
        width: 100%;
        margin: auto;
    }

    .nft-desc {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .nft-name {
        font-weight: 500;
        font-size: 22px;
        line-height: 27px;
    }

    .nft-price {
        font-weight: 300;
    }

    .nft-price > p {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .nft-price > p > img {
        margin-left: 10px;
    }
</style>
