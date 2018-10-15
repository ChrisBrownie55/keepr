<template>
  <button v-bind='$attrs' v-on='listeners' class='base-button'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
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
button {
  color: black;
  background-color: var(--theme-primary);

  font-size: 1rem;
  font-weight: 500;

  border: none;
  border-radius: 4px;

  width: fit-content;
  padding: 0.25rem 0.5rem;

  opacity: 0.8;

  transition: opacity 0.2s, box-shadow 0.2s;
  will-change: opacity, box-shadow;
  cursor: pointer;

  &:disabled {
    cursor: default;

    &[coming-soon] {
      position: relative;
      overflow: hidden;

      &::after {
        content: 'Coming soon';
        display: grid;
        place-items: center;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: white;
        background-color: rgba(black, 0.85);
      }
    }
  }

  &:enabled {
    &:focus {
      box-shadow: 0px 0px 0px 3px #7fc1ff;
      outline: none;
    }
    &:active {
      opacity: 1;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
        0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    }
    &:hover {
      opacity: 1;
    }
  }
}
</style>