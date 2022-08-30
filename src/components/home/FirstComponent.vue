<template>
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
</template>

<script>
import RibbonTopRight from '../RibbonTopRight.vue'

export default {
    name: "FirstComponent",
    components: {
        RibbonTopRight,
    },
    data() {
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
        }
    },
    methods: {
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
    }
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
    .first__text > h2 {
        font-size: 42px !important;
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
