<template>
  <i class='material-icons' v-on='$listeners'>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'icon'
};
</script>

<style scoped lang='scss'>
</style>