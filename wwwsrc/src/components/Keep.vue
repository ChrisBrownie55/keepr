<template>
  <base-card v-on='$listeners' class='keep'>
    <img :src='img' slot='image' />
    <template slot='content'>
      <p class='title'>{{ name }}</p>
      <p class='paragraph'>{{ description | truncate(70) }}</p>
    </template>
    <template slot='actions'>
      <p>Views: {{ views }}</p>
      <p>Shares: {{ shares }}</p>
    </template>
  </base-card>
</template>

<script>
export default {
  name: 'keep',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true
    },
    shares: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped lang='scss'>
  .keep {
    cursor: pointer;
  }
</style>