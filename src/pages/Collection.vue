<template>
    <div>
        <div class="collection-header">
            <h1 class="collection-name">{{ name }}</h1>
            <p class="collection-description"> {{ description }} </p>
        </div>
        <div class="collection-nfts">
            <a :href="`/asset/${nft.assetId}`" class="nft" v-for="(nft) in nfts" v-bind:key="nft.assetId">
                <img :src="nft.metadata.url">
                <div class="nft-name">
                    <p>{{ nft.name }}</p>
                </div>
                <div class="nft-price">
                    <p>{{ nft.price }} WAVES</p>
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
                name: "",
                description: "",
                issuer: "",
                nfts: []
            }
        },
        async mounted() {
            let params = this.$route.params["name"];
            this.name = collection[params].name;
            this.description = collection[params].description;
            this.issuer = collection[params].address_issuer;

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
        }
    }
</script>

<style scoped>
    .collection-header {
        margin: 55px;
    }

    .collection-name {
        text-align: center;
    }

    .collection-description {
        font-weight: 300;
        text-align: center;
    }

    .collection-nfts {
        margin: 55px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .nft {
        width: 357px;
        height: 450px;
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

    .nft-price {
        font-weight: 300;
    }
</style>
