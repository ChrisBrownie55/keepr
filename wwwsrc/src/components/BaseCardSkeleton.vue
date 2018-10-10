<template>
  <base-card class='skeleton-card'>
    <div class='img' slot='image'></div>
    <template slot='content'>
      <p class='title skeleton'></p>
      <p class='paragraph skeleton'></p>
    </template>
  </base-card>
</template>

<script>
export default {
  name: 'base-card-skeleton'
};
</script>

<style scoped lang='scss'>
.skeleton-card {
  $color: #e1e9f3;
  background-color: $color;
  min-height: 200px;

  & > :global(.content) {
    opacity: 1 !important;
    & > .title,
    & > .paragraph {
      display: block;
      height: 0.8rem;
      background-color: hsl(hue($color), saturation($color), 85%);
      margin: 0.25rem 0;
      border-radius: 4px;
    }
    & > .title {
      width: 50% !important;
    }
    & > .paragraph {
      width: 100% !important;
    }
  }
}
</style>