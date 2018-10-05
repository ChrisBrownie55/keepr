<template>
  <label>
    <span v-if='label'>{{ label }}</span>
    <input v-bind='$attrs' v-on='$listeners' />
  </label>
</template>

<script>
export default {
  name: 'base-input',
  props: {
    label: String
  }
};
</script>

<style scoped lang='scss'>
</style>