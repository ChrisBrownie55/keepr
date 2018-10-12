<template>
  <base-button v-on='$listeners' class='flat-button'>
    <slot></slot>
  </base-button>
</template>

<script>
export default {
  name: 'flat-button'
};
</script>

<style scoped lang='scss'>
.flat-button {
  border: none;
  box-shadow: none !important;
}
</style>