<template>
  <button v-on='$listeners' class='floating-action-button'>
    <slot name='prepend'></slot>
    <i class='material-icons' v-if='icon'>{{ icon }}</i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'floating-action-button',
  props: {
    icon: String
  }
};
</script>

<style scoped lang='scss'>
.floating-action-button {
  border-radius: 100%;
  align-items: center;
  padding: 0;
  width: 3rem;
  height: 3rem;
  line-height: 0rem;
  background-color: black;
  border: none;
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: fixed;
  bottom: 3.5rem;
  right: 1rem;
}
</style>