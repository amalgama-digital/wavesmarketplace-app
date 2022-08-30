<template>
<button
    class="scroller"
>
    <svg
        viewBox="0 0 128 128" width="28" height="28"
        :style="left ? 'transform: rotate(180deg)': ''"
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
</template>

<script>
export default {
    name: "ButtonArrow",
    props: {
        "left": {
            required: false,
            type: Boolean
        }
    },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
    .scroller {
        height: 2.5rem !important;
        width: 2.5rem !important;
    }
}
.scroller {
    position: absolute;
    display: flex;
    align-items: center;

    font-size: 2.5rem;

    height: 4rem;
    width: 4rem;
    border-radius: 5rem;

    background-color: rgba(240, 240, 245, 0.7);
    color: #2c7dff;
    z-index: 1;
}
</style>
