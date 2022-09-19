<script>
  export default {
    name: "PopupComponent",
    props: ["popupShow"],
    data() {
      return {
        popupClass: "popup-hide",
        popupClasses: {
          show: "popup-show",
          hide: "popup-hide",
        },
      };
    },
    watch: {
      "this.popupShow": () => {
        this.popupClass = this.popupShow ? this.popupClasses.show : this.popupClasses.hide;
      },
    }
  }
</script>

<template>
  <div :class="['popup', popupClass]">
    <div class="popup__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 810px) {
  .popup__content {
    height: 100vh !important;
    width: 100vw !important;
  }
}
.popup {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(250, 250, 250, 0.11);
  backdrop-filter: blur(5px);

  position: absolute;
  width: 100%;
  height: 100%;

  z-index: 1;
}

.popup__content {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  height: 80vh;
  width: 70vw;

  background-color: black;
  border-radius: 8px;
}
.popup-show {
  visibility: visible;
}
.popup-hide {
  visibility: hidden;
}
</style>
