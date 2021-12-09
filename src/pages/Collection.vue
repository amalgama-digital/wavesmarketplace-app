<template>
    <div>
        <div class="collection-header border-radius-18">
            <div class="collection-header-back border-radius-18">
                <div class="collection-name">
                    <h1>{{ name }}</h1>
                    <p>{{ description }}</p>
                </div>
                <img :src="`/collections/${params}/logo.png`">
            </div>
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
        }
    }
</script>

<style scoped>
    .border-radius-18 {
        border-radius: 18px;
    }

    .collection-header {
        margin-top: 70px;
        background: black;
        height: 550px;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2)
    }

    .collection-header-back {
        /* background: radial-gradient(96.9% 232.74% at 72.75% 136.22%, #7915A8 8.3%, rgba(0, 85, 255, 0) 100%); */
        background: radial-gradient(49.91% 258.29% at 84.66% 31.09%,#05f 0,#000 100%);
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .collection-header-back > img {
        height: 200px;
        border-radius: 50%;
        margin: auto;
        margin-right: 100px;
    }

    .collection-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60px;
        color: #FFFFFF;
    }

    .collection-name > p {
        font-weight: 300;
        font-size: 26px;
        line-height: 31px;
    }

    .collection-header {
        margin: 55px;
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