<script>
  export default {
    name: "SwapPage",
    mounted() {
      KeeperSwapWidget?.create(this.$refs.keeperwidget, {});
    }
  }
</script>

<template>
  <div class="widget" ref="keeperwidget"></div>
</template>

<style scoped>
  .widget {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
