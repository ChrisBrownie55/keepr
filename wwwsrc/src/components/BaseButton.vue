<template>
  <button v-on='listeners' class='base-button'>
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
  background: transparent;
  color: var(--theme-secondary);

  font-size: 1rem;
  font-weight: bold;

  border: solid 2px var(--theme-secondary);
  border-radius: 4px;

  width: fit-content;
  padding: 0.25rem 0.5rem;

  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;

  &:focus {
    box-shadow: 0px 0px 0px 3px #7fc1ff;
    outline: none;
  }
  &:active {
    background-color: rgba(#0b107b, 0.15) !important;
  }
  &:focus {
    background-color: rgba(#0b107b, 0.075);
  }
  @media (hover: hover) {
    &:hover {
      background-color: rgba(#0b107b, 0.075);
    }
  }
}
</style>