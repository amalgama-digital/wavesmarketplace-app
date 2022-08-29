<template>
    <div class="home">
        <div class="first">
            <div
                @click="goToCollection(new_selected)"
                class="first__cover"
            >
                <ribbon-top-right class="z-1">NEW!</ribbon-top-right>
                <img :src="`collections/${new_selected}/background.png`" alt="">
                <div class="first__text">
                    <a href="#">VIEW COLLECTION</a>
                </div>
            </div>
            <div class="dots">
                <span
                    v-for="(val, n) in new_collections"
                    :key="n"
                    :class="['dot', val.selected ? 'active': '']"
                    @click="selectNew(n)"
                ></span>
            </div>
        </div>

        <div class="highlights">
            <div class="highlights__blocks">
                <div class="highlights__block">
                    <img src="/img/highlights/item1.svg" />
                    <p>BE AMONG THE FIRST</p>
                    <p>
                        This is the world’s first multi-functional NFT
                        marketplace, based on Waves Platform
                    </p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item2.svg" />
                    <p>EASY TO USE</p>
                    <p>
                        Buying and selling NFTs was never that easy. Create your
                        account, and you’re in!
                    </p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item3.svg" />
                    <p>TRUE DIGITAL ART</p>
                    <p>
                        Waves Marketplace provides professional moderation for
                        almost every NFT listed on the platform.
                    </p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item4.svg" />
                    <p>CREATE YOUR OWN COLLECTION</p>
                    <p>
                        If you’re a digital artist, it’s your chance to step
                        into the top league of the NFT-industry.
                    </p>
                </div>
            </div>
            <div class="highlights__text">WAVES NFT RIDERS</div>
        </div>

        <div class="collections">
            <div class="collections__title">
                THE MOST NOTICEABLE COLLECTIONS
            </div>
            <div
                class="collections__blocks"
                @scroll="scrollCollections"
                ref="collectionsRef"
            >
                <button
                    class="collections__scroller scroller-left"
                    @click="scrollLeft"
                >
                    <svg
                        style="transform: rotate(180deg)"
                        viewBox="0 0 128 128"
                        width="28"
                        height="28"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="m71.41066,64.00002l-43.41066,-61.63161l28.58935,0l43.41066,61.63161l-43.41066,61.63156l-28.58935,0l43.41066,-61.63156z"
                                stroke="#2C7DFF"
                                fill="#2C7DFF"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    class="collections__scroller scroller-right"
                    @click="scrollRight"
                >
                    <svg
                        viewBox="0 0 128 128"
                        width="28"
                        height="28"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g>
                            <path
                                d="m71.41066,64.00002l-43.41066,-61.63161l28.58935,0l43.41066,61.63161l-43.41066,61.63156l-28.58935,0l43.41066,-61.63156z"
                                stroke="#2C7DFF"
                                fill="#2C7DFF"
                            />
                        </g>
                    </svg>
                </button>
                <a
                    class="collections__block"
                    v-for="(collection, n) in collections"
                    :key="n"
                    :href="collection.href"
                >
                    <img :src="collection.imgSrc" />
                </a>
            </div>
        </div>

        <div class="merch">WHAT ABOUT<br />IRL NFT?</div>
    </div>
</template>

<script>
import RibbonTopRight from '../components/RibbonTopRight.vue'

export default {
    name: 'Home',
    data: () => {
        return {
            new_selected: "empire_of_progress",
            new_collections: [
                {
                    name: "empire_of_progress",
                    selected: true
                },
                {
                    name: "free_nomads",
                    selected: false
                },
                {
                    name: "mutation_adepts",
                    selected: false
                },
            ],
            curOffset: 0, // used to scroll the collection
            collections: [
                {
                    href: '/collection/empire_of_progress',
                    imgSrc: '/img/collections/mad_empire.png'
                },
                {
                    href: '/collection/mutation_adepts',
                    imgSrc: '/img/collections/mad_mutation.png'
                },
                {
                    href: '/collection/free_nomads',
                    imgSrc: '/img/collections/mad_nomads.png'
                },
                {
                    href: '/collection/memaliens',
                    imgSrc: '/img/collections/memaliens.png',
                },
                {
                    href: '/collection/zombiepunks',
                    imgSrc: '/img/collections/zombie.png',
                },
                {
                    href: '/collection/wavespunks',
                    imgSrc: '/img/collections/punks.png',
                },
                {
                    href: '/collection/wavesducks_incubator',
                    imgSrc: '/img/collections/wavesducks_incubator.jpg',
                },
                {
                    href: '/collection/wavesducks_breeding',
                    imgSrc: '/img/collections/wavesducks_breeding.jpg',
                },
            ],
        };
    },
    components: {
        RibbonTopRight,
    },
    methods: {
        scrollCollections(ev) {
            this.curOffset = ev.target.scrollLeft;
        },

        scrollLeft() {
            const clientWidth = this.$refs.collectionsRef.clientWidth;
            // there are 2 buttons at the moment and already 1st element is visible, so -3
            const childCount = this.$refs.collectionsRef.childElementCount - 3;

            const step = clientWidth
                ? Math.ceil(clientWidth / childCount) + 500
                : -550;
            const maxOffset = 0;
            if (this.curOffset > maxOffset) {
                this.curOffset -= step;
                setTimeout(
                    // `fix` chromium-based browsers flaw
                    () => {
                        this.$refs.collectionsRef.scrollTo({
                            behavior: 'smooth',
                            top: 0,
                            left: this.curOffset,
                        });
                    },
                    5
                );
            }
        },

        scrollRight() {
            const scrollWidth = this.$refs.collectionsRef.scrollWidth;
            const clientWidth = this.$refs.collectionsRef.clientWidth;
            // there are 2 buttons at the moment and already 1st element is visible, so -3
            const childCount = this.$refs.collectionsRef.childElementCount - 2;

            const step = clientWidth
                ? Math.ceil(scrollWidth / childCount)
                : 450;

            // some browsers doesn't have `scrollLeftMax` element property
            // there are 2 buttons at the moment and already 1st element is visible, so -3
            const maxOffset =
                this.$refs.collectionsRef.scrollLeftMax ??
                scrollWidth - clientWidth;

            if (this.curOffset < maxOffset) {
                this.curOffset += step;
                setTimeout(
                    // fix` chromium-based browsers flaw
                    () => {
                        this.$refs.collectionsRef.scrollTo({
                            behavior: 'smooth',
                            top: 0,
                            left: this.curOffset,
                        });
                    },
                    5
                );
            }
        },
        goToCollection(name) {
            this.$router.push({
                name: 'Collection',
                params: { name },
            });
        },
        selectNew(coll_n) {
            this.new_selected = this.new_collections[coll_n].name;
            this.new_collections.forEach(v => v.selected = false);
            this.new_collections[coll_n].selected = true;
        }
    },
};
</script>

<style scoped>
@media only screen and (max-width: 1080px) {
    .scroller-left {
        left: 0 !important;
    }

    .scroller-right {
        right: 0 !important;
    }
}

@media only screen and (max-width: 768px) {
    .first__cover {
        background-position: left !important;
    }

    .first__text > h2 {
        font-size: 42px !important;
    }

    .collections__block {
        min-width: 460px !important;
    }

    .collections__block > img {
        height: 170px !important;
    }
}

@media only screen and (max-width: 425px) {
    .first__cover {
        justify-content: center !important;
    }

    .first__text {
        padding: 0 !important;
    }

    .first__text > h2 {
        font-size: 32px !important;
        text-align: center;
    }

    .highlights__blocks {
        gap: 15px !important;
    }

    .highlights__block {
        width: 228px !important;
    }

    .highlights__text {
        left: -55px;
        width: max-content;
        max-width: initial !important;
        font-size: 11.1vw !important;
    }

    .collections__block {
        display: flex !important;
        justify-content: center;
        min-width: 230px !important;
    }

    .merch {
        font-size: 38px !important;
        line-height: 61px !important;
        text-align: center !important;
    }
}

.home {
    margin: 40px;
    font-family: Inter;
    font-style: normal;
}

.first {
    max-width: 1360px;
    height: 550px;
    margin: auto;
    margin-top: 70px;
    border-radius: 18px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.first__cover {
    display: block;
    position: relative;
    height: 100%;
    border-radius: 18px;
    overflow: hidden;
    cursor: pointer;
}

.first__cover > img {
    border-radius: inherit;
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
}


.first__cover:hover img {
    transform: scale(110%, 110%);
}

.first__cover:hover .first__text {
    visibility: visible;
}

.first__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: inherit;

    position: absolute;
    top: 0;
    
    background-color: rgba(240, 255, 255, 0.5);

    transition: -webkit-backdrop-filter .7s, backdrop-filter .7s;
    visibility: hidden;
    z-index: 2;
}

.first__text:hover {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.first__text > h2 {
    margin: 0;
    font-weight: 500;
    font-size: 52px;
    line-height: 63px;
}

.first__text > a {
    width: max-content;
    border: 0;
    border-radius: 8px;
    color: #ffd645;
    font-weight: 500;
    font-size: 23px;
    line-height: 24px;
    text-align: center;
    text-shadow: 2px 2px 3px #685100;
}

.first__text > a,
.first__text > a:hover,
.first__text > a:active {
    text-decoration: none;
    color: #ffd645;
}

.highlights {
    position: relative;
    margin-top: 100px;
}

.highlights__blocks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
}

.highlights__block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 246px;
    height: 246px;
    padding: 35px;
    border-radius: 20px;
    background: #f0f0f3;
    box-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
    text-align: center;
}

.highlights__block > p {
    margin: 0;
}

.highlights__block > p:nth-child(2) {
    font-weight: 500;
    /* font-size: 30px; */
    font-size: 26px;
    /* line-height: 36px; */
    line-height: 30px;
}

.highlights__block > p:last-child {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
}

.highlights__text {
    position: relative;
    /* left: -10px;
    width: max-content; */
    max-width: 1360px;
    margin: auto;
    font-weight: 900;
    font-size: 8.1vw;
    line-height: 182px;
    text-align: center;
    text-transform: uppercase;
    color: #f0f0f3;
    text-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
}

.collections {
    margin-top: 100px;
}

.collections__title {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 35px;
    line-height: 42px;
    text-align: center;
}

.collections__blocks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0 40px;
    max-width: 1360px;
    margin: auto;
    padding: 10px 0px;
    overflow: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none;
}

.collections__blocks::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

.collections__block {
    display: block;
    min-width: 665px;
    border-radius: 20px;
    overflow: hidden;
    filter: drop-shadow(3px 3px 5px rgba(9, 12, 31, 0.25))
        drop-shadow(-3px -3px 6px rgba(255, 255, 255, 0.6));
}

.collections__scroller {
    position: absolute;
    display: flex;
    align-items: center;

    font-size: 2.5rem;

    min-height: 4rem;
    min-width: 4rem;
    border-radius: 5rem;
    max-height: 4rem;
    max-width: 4rem;

    background-color: rgba(240, 240, 245, 0.7);
    color: #2c7dff;
    z-index: 1;
}

.scroller-left {
    left: 14rem;
}

.scroller-right {
    right: 14rem;
}

.collections__block > img {
    height: 246px;
    width: 100%;
}

.merch {
    max-width: 1240px;
    height: 196px;
    margin: auto;
    margin-top: 100px;
    padding: 60px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 50px;
    line-height: 90px;
    color: #ffffff;
    background-image: url('../assets/images/merch.png');
    background-size: cover;
    background-position: center;
    text-align: right;
}


/* The dots/bullets/indicators */
.dots {
    margin-top: 5px;
    text-align:center;
}
.dot {
  cursor: pointer;
  height: 17px;
  width: 17px;
  margin: 0 3px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

.z-1 {
    z-index: 1;
}
</style>
