<template>
    <div class="home">
        <FirstComponent />

        <HighLights />

        <CollectionsComponent />

        <div class="merch">WHAT ABOUT<br />IRL NFT?</div>
    </div>
</template>

<script>
import FirstComponent from '../components/home/FirstComponent.vue'
import HighLights from '../components/home/HighLights.vue'
import CollectionsComponent from '../components/home/CollectionsComponent.vue'

export default {
    name: 'Home',
    components: {
        FirstComponent,
        HighLights,
        CollectionsComponent,
    },
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
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

</style>
