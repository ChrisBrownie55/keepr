<template>
  <base-button class='outline-button' v-on='$listeners'>
    <slot></slot>
  </base-button>
</template>

<script>
export default {
  name: 'outline-button'
};
</script>

<style scoped lang='scss'>
.outline-button {
  color: var(--theme-secondary);
  background: transparent;

  border: solid 2px var(--theme-secondary);

  transition: background-color 0.2s, box-shadow 0.2s;

  &:enabled {
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
}
</style>