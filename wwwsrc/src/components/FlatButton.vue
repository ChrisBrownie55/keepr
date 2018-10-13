<template>
  <outline-button v-on='$listeners' class='flat-button'>
    <slot></slot>
  </outline-button>
</template>

<script>
import OutlineButton from '@/components/OutlineButton.vue';
export default {
  name: 'flat-button',
  components: {
    OutlineButton
  }
};
</script>

<style scoped lang='scss'>
.flat-button {
  border: none;
  box-shadow: none !important;
}
</style>