<template>
    <div class="preloader">
        <div class="water"></div>
        <span>Surfing on waves...</span>
    </div>
</template>

<script>
    export default {
        name: "PreLoader"
    }
</script>

<style scoped>
.preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.preloader > span {
    position: absolute;
    font-size: 1.3rem;
    color: white;
    text-shadow: 2px 2px 3px #0091cb;
}
.water{
    width:400px;
    height: 400px;
    background-color: #87ceeb;
    border-radius: 18px;
    position: relative;
    overflow: hidden;
}

.water:before, .water:after{
    content:'';
    position: absolute;
    width: 550px;
    height: 550px;
    top: -260px;
    background-color: #fff;
}
.water:before{
    border-radius: 45%;
    background:rgba(255,255,255,.7);
    animation:wave 5s linear infinite;
}
.water:after{
    border-radius: 35%;
    background:rgba(255,255,255,.3);
    animation:wave 5s linear infinite;
}
    @keyframes wave{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
