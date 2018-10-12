<template>
  <button v-on='listeners' class='floating-action-button'>
    <slot name='prepend'></slot>
    <i class='material-icons' v-if='icon'>{{ icon }}</i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'floating-action-button',
  props: {
    icon: String,
    to: [Object, String]
  },
  computed: {
    listeners() {
      const listeners = {
        ...this.$listeners
      };

      if (this.$props.to) {
        const router = this.$router;
        listeners['click'] = () => router.push(this.$props.to);
      }

      return listeners;
    }
  }
};
</script>

<style scoped lang='scss'>
.floating-action-button {
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 3rem;
  min-height: 3rem;
  padding: 0;

  position: fixed;
  bottom: 3.5rem;
  right: 1rem;

  background-color: black;
  color: white;

  border: none;
  border-radius: 27px;

  line-height: 0rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;

  &:focus,
  &:active {
    outline: none;
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.16), 0 3px 9px rgba(0, 0, 0, 0.23);
  }
  @media (hover: hover) {
    &:hover {
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.16), 0 3px 9px rgba(0, 0, 0, 0.23);
    }
  }

  .material-icons {
    font-size: 1.6rem;
    cursor: pointer;
  }
}
</style>