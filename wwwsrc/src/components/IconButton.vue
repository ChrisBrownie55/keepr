<template>
  <flat-button v-on='$listeners' class='icon-button'>
    <base-icon>{{ icon }}</base-icon>
    <slot></slot>
  </flat-button>
</template>

<script>
import FlatButton from '@/components/FlatButton.vue';
export default {
  name: 'icon-button',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  components: {
    FlatButton
  }
};
</script>

<style scoped lang='scss'>
.icon-button {
  // background-color: rgba(#fccf5d, 0.5);
  background-color: var(--theme-primary);
  opacity: 0.65;
  padding: 0;
  color: white;
  :global(.material-icons) {
    vertical-align: top;
  }
  transition: opacity 0.2s;

  &:hover,
  &:active,
  &:focus {
    background-color: var(--theme-primary) !important;
    opacity: 1;
  }
}
</style>