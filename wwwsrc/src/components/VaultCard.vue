<template>
  <article class='vault-card' @click='$router.push({ name: "vault", params: { id } })'>
    <h3>{{ name }}</h3>
    <section class='vault-card__keeps'>
      <img v-for='keep in keeps.slice(0, 9)' :key='keep.id' :src='keep.img' class='vault-card__keeps__img' />
      <p v-if='!keeps.length'>No keeps on this vault</p>
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
.vault-card {
  width: 16rem;
  height: 18rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border-radius: 4px;

  cursor: pointer;

  &__keeps {
    display: flex;
    flex-wrap: wrap;

    &__img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 4px;
      margin: 0.15rem;
    }
  }
}
</style>