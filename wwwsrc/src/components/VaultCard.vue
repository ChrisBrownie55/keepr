<template>
  <article class='vault-card' @click='$router.push({ name: "vault", params: { id } })'>
    <h3 class='vault-card__name'>{{ name }}</h3>
    <section class='vault-card__keeps'>
      <img v-for='keep in keeps.slice(0, 5)' :key='keep.id' :src='keep.img' class='vault-card__keeps__img' />
      <div v-for='n in 5 - keeps.slice(0, 5).length' :key='n' class='keep-skeleton vault-card__keeps__img'></div>
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
  padding: 0.25rem;
  overflow: hidden;

  display: flex;
  flex-direction: column-reverse;

  border-radius: 4px;

  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #efefef;
  }

  &__name {
    font-size: 1.175rem;
    margin-top: 0.5rem;
    margin-left: 0.25rem;
  }

  &__keeps {
    display: grid;
    grid-template: repeat(3, 1fr) / repeat(3, 1fr);
    grid-gap: 0.15rem;

    width: 15rem;
    max-width: 100%;
    height: 15rem;

    position: relative;

    border-radius: 2px;

    &__img {
      width: 100%;
      height: calc(15rem / 3);
      grid-area: span 1 / span 1;
      object-fit: cover;
      border-radius: 4px;

      &:nth-child(1) {
        grid-area: span 1 / span 2;
      }
      &:nth-child(4) {
        grid-area: span 2 / span 2;
        height: calc(calc(calc(15rem / 3) * 2) + 0.15rem);
      }

      &.keep-skeleton {
        background-color: rgba(black, 0.15);
      }
    }

    p {
      grid-area: span 3 / span 3;
      line-height: 15rem;
      text-align: center;
    }
  }
}
</style>