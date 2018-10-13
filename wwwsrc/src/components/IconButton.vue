<template>
  <flat-button v-on='$listeners' class='icon-button'>
    <base-icon v-if='icon'>{{ icon }}</base-icon>
    <div v-if='iconHTML' v-html='iconHTML' class='custom-html'></div>
    <slot></slot>
  </flat-button>
</template>

<script>
import FlatButton from '@/components/FlatButton.vue';
export default {
  name: 'icon-button',
  props: {
    icon: {
      type: String
    },
    iconHTML: {
      type: String
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
  padding: 0.1rem;
  color: black;
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

  .custom-html {
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.125rem;
  }
  .custom-html :global(*) {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>