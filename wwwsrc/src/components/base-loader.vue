<template>
  <div class='loader'>
    <!-- Slot for loader -->
    <slot></slot>
    <p class='loading-text'>Loading...</p>
  </div>
</template>

<script>
export default {
  name: 'base-loader',
  props: {
    icon: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang='scss'>
.loader {
  display: grid;
  place-items: center;
  @supports not (display: grid) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  position: absolute;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(255, 255, 255, 0.5);
}
</style>