<template>
  <base-card v-bind='$attrs' v-on='$listeners'>
    <img :src='data.img' slot='image' />
    <template slot='content'>
      <p class='title'>{{ data.name }}</p>
      <p class='paragraph'>{{ description }}</p>
    </template>
    <template slot='actions'>
      <p>Views: {{ data.views }}</p>
      <p>Shares: {{ data.shares }}</p>
    </template>
  </base-card>
</template>

<script>
export default {
  name: 'keep',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    description() {
      if (this.$props.description.length > 25) {
        return this.$props.description.slice(0, 22) + '...';
      }
      return this.$props.description;
    }
  }
};
</script>

<style scoped lang='scss'>
</style>