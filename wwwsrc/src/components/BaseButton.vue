<template>
  <button v-bind='$attrs' v-on='$listeners'>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button'
};
</script>

<style scoped lang='scss'>
</style>