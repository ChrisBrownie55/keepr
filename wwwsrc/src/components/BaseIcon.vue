<template>
  <i class='material-icons icon' v-on='$listeners'>
    <slot></slot>
  </i>
</template>

<script>
export default {
  name: 'base-icon'
};
</script>

<style scoped lang='scss'>
.material-icons {
  font-size: 1.5rem;
}
</style>