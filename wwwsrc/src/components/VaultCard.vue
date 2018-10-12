<template>
  <article class='vault-card' @click='$router.push({ name: "vault", params: { id } })'>
    <p>{{ name }}</p>
    <section class='vault-keeps'>
      <img v-for='keep in keeps.slice(0, 5)' :key='keep.id' :src='keep.img' />
    </section>
  </article>
</template>

<script>
export default {
  name: 'vault-card',
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
    keeps: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped lang='scss'>
</style>