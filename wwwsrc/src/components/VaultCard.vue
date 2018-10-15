<template>
  <article class='vault-card' @click='$router.push({ name: "vault", params: { id } })'>
    <h3 class='vault-card__name'>{{ name }}</h3>
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
  height: 17.9rem;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  border-radius: 4px;

  cursor: pointer;

  &__name {
    font-size: 1.175rem;
    margin-bottom: 0.15rem;
  }

  &__keeps {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    width: 16rem;
    max-width: 100%;
    height: 16rem;

    position: relative;

    border-radius: 2px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border-radius: 4px;

      background-color: rgba(black, 0.5);
    }

    &__img {
      width: 5rem;
      height: 5rem;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
</style>