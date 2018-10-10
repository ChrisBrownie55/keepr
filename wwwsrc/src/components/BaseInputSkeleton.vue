<template>
  <div class='skeleton input-skeleton'></div>
</template>

<script>
export default {
  name: 'base-input-skeleton'
};
</script>

<style scoped lang='scss'>
.input-skeleton {
  $color: #e1e9f3;
  margin: 14px auto;
  background-color: $color;
  height: 34px;
  border-radius: 4px;
}
</style>