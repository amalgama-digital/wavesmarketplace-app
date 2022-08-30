<template>
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
</template>

<script>
export default {
    name: "CollectionsComponent",
    data: () => {
        return {
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
    },
}
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
    .collections__block {
        min-width: 460px !important;
    }

    .collections__block > img {
        height: 170px !important;
    }
}

@media only screen and (max-width: 425px) {
    .collections__block {
        display: flex !important;
        justify-content: center;
        min-width: 230px !important;
    }
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

</style>
