<template>
  <div class="page home">
    <base-input class='search' placeholder='🔎 Search' :debounce='500' @input='search'></base-input>
    <section class='keeps'>
      <transition-group name='fade-up'>
        <keep-card v-if='!loading' v-for='keep in keeps' :key='keep._id' v-bind='keep'>
        </keep-card>
      </transition-group>
    </section>
    <base-loader></base-loader>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import KeepCard from '@/components/KeepCard';

export default {
  name: 'Home',
  methods: {
    ...mapActions('keeps', ['getKeeps', 'searchKeeps']),
    search(value) {
      value = value.trim();
      if (!value) {
        this.getKeeps();
      } else {
        this.searchKeeps(value);
      }
    }
  },
  computed: {
    ...mapState('keeps', ['keeps', 'loading'])
  },
  mounted() {
    if (!this.keeps.length) {
      this.getKeeps();
    }
  },
  components: {
    KeepCard
  }
};
</script>

<style lang='scss' scoped>
.home {
  overflow: hidden;
}

.search {
  --width: 15rem;
  margin: 0.5rem calc(50% - calc(var(--width) / 2));
  width: var(--width);

  @media (min-width: 382px) {
    --width: calc(calc(calc(15rem / 1.5) * 2) + 0.4rem);
  }
  @media (min-width: 570px) {
    --width: calc(30rem + 0.4rem);
  }
  @media (min-width: 845px) {
    --width: calc(45rem + 0.8rem);
  }
  @media (min-width: 1115px) {
    --width: calc(60rem + 1.2rem);
  }
  @media (min-width: 1400px) {
    --width: calc(75rem + 1.6rem);
  }
}

.keeps {
  display: block;
  width: 15rem;

  column-width: 15rem;
  column-count: 1;
  column-gap: 0.4rem;

  margin: auto;
  padding: 0.4rem;

  @media (min-width: 382px) {
    width: calc(calc(calc(15rem / 1.5) * 2) + 0.4rem);
    column-width: calc(15rem / 1.5);
    column-count: 2;
  }
  @media (min-width: 570px) {
    column-width: 15rem;
    column-count: 2;
    width: calc(30rem + 0.4rem);
  }
  @media (min-width: 845px) {
    column-count: 3;
    width: calc(45rem + 0.8rem);
  }
  @media (min-width: 1115px) {
    column-count: 4;
    width: calc(60rem + 1.2rem);
  }
  @media (min-width: 1400px) {
    column-count: 5;
    width: calc(75rem + 1.6rem);
  }

  & > *:not(:first-child) {
    margin: 0.4rem auto;
    break-inside: avoid;
  }
}
</style>