<template>
    <component :is="nft.assetId ? 'a' : 'div'" @click="gotoNft" class="nft">
        <vue-load-image v-if="url">
            <img
                :src="url"
                :alt="nft.name"
                :style="nft.metadata.style"
                slot="image"
                class="nft__img"
            />
            <div slot="preloader" class="nft__img nft__img--preloader"></div>
            <div slot="error" class="nft__img nft__img--preloader"></div>
        </vue-load-image>
        <div v-else class="nft__img nft__img--preloader"></div>
        <div v-if="viewInfo" class="nft__info">
            <div class="nft__name">
                <p>{{ nft.name }}</p>
            </div>
            <div v-if="nft.price" class="nft__price">
                <p>{{ nft.price }}</p>
            </div>
        </div>
    </component>
</template>

<script>
import axios from 'axios';
import VueLoadImage from 'vue-load-image';

import { createStyle, createURL, parseName } from '../helpers/ducks';

export default {
    name: 'NFT',
    props: ['nft', 'viewInfo'],
    data () {
        return {
            url: "",
        };
    },
    components: {
        'vue-load-image': VueLoadImage,
    },
    async created() {
        // WavesDucks
        const ducks = parseName(this.nft.name);
        try {
            if (ducks.length > 1) {
                if (ducks[1] === 'BABY') {
                    this.nft.metadata = {};
                }
                this.nft.metadata.url = createURL(
                    this.nft.name,
                    this.nft.assetId
                );
                this.nft.metadata.style = createStyle(this.nft.name);
            }
        } catch {
            console.debug(this.nft.name + ': Not a duck!');
        }
        if (this.nft.metadata.url === undefined) {
            try {
                const response = await axios.post(
                    `${window.nodeURL}/addresses/data/${this.nft.issuer}`,
                    {
                        "keys": [
                            `${this.nft.assetId}_url`
                        ]
                    }
                );
                this.url = response.data[0]?.value;
            } catch (error) {
                console.error(error);
            }
        } else {
            this.url = this.nft.metadata.url;
        }
    },
    computed: {
        link() {
            if (this.url) {
                console.debug(this.nft.metadata.url);
                return `${this.url}/asset/${this.nft.assetId}`;
            } else {
                return `/asset/${this.nft.assetId}`;
            }
        },
    },
    methods: {
        gotoNft() {
            if (this.nft.assetId) {
                this.$router.push({
                    name: 'Asset',
                    params: { id: this.nft.assetId },
                });
            }
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
    a.nft .nft__img {
        width: 170px !important;
    }

    a.nft .nft__img {
        height: 170px !important;
    }

    div.nft .nft__img {
        width: 340px !important;
    }

    div.nft .nft__img {
        height: 340px !important;
    }

    .nft__info {
        flex-direction: column !important;
    }

    .nft__name {
        font-size: 14px !important;
    }

    .nft__price > p {
        margin-top: 0;
    }
}

@keyframes AnimateBG {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

a.nft {
    cursor: pointer;
}

.nft {
    font-family: Inter;
    max-width: 357px;
    max-height: 450px;
}

.nft,
.nft:hover,
.nft:active {
    color: black;
    text-decoration: none;
}

.nft__img {
    width: 375px;
    margin: auto;
    border-radius: 18px;
    box-shadow: 2px 2px 2px 0px rgb(206, 206, 206),
        -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
}

.nft__img {
    height: 375px;
}

.nft__img--preloader {
    background-size: 300% 300%;
    background-image: linear-gradient(
        -45deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(102, 135, 200, 1) 25%,
        rgba(6, 59, 166, 1) 51%,
        rgba(0, 0, 0, 1) 100%
    );
    animation: AnimateBG 5s ease infinite;
}

.nft__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.nft__name {
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;
}

.nft__price {
    font-weight: 300;
}

.nft__price > p {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.nft__price > p::after {
    content: url('../assets/images/waves-token.svg');
    margin-top: 5px;
    margin-left: 10px;
}
</style>
