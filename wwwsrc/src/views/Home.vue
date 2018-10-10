<template>
  <div class="page home">
    <h1 class='page__title' v-if='!loading'>Home</h1>
    <h1 class='page__title skeleton skeleton-color' v-else></h1>
    <h5 class='page__subtitle' v-if='!loading'>Check out everyone's keeps here</h5>
    <h5 class='page__subtitle skeleton skeleton-color' v-else></h5>
    <base-input v-show='!loading' class='search' placeholder='🔎 Search' :debounce='500' @input='search'></base-input>
    <base-input-skeleton class='search' v-if='loading'></base-input-skeleton>
    <section class='keeps'>
      <transition-group name='keep-list-item'>
        <!-- TODO: Make transitions work! -->
        <keep-card class='keep-list-item' v-if='!loading' v-for='keep in keeps' :key='keep.id' v-bind='keep'>
        </keep-card>
        <base-card-skeleton v-if='loading' v-for='n in 10' :key='n'></base-card-skeleton>
      </transition-group>
    </section>
    <base-button title='Create keep' style='border-radius: 100%; align-items: center; padding: 0; width: 3rem; height: 3rem; line-height: 0rem; background-color: black; border: none; color: white; box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); position: fixed; bottom: 3.5rem; right: 1rem;'><i class='material-icons' style='font-size: 1.8rem;'>add</i></base-button>
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
.keep-list-item {
  transition: all 1s;
}
.keep-list-enter,
.keep-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.keep-list-leave-active {
  position: absolute;
}

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

  .keep-card:not(:first-child),
  .skeleton-card:not(:first-child) {
    margin: 0.4rem auto;
    break-inside: avoid;
  }
  @for $i from 0 through 9 {
    .skeleton-card:nth-child(#{$i}) {
      @if $i % 8 == 1 {
        height: 200px;
      } @else if $i % 4 == 2 {
        height: 250px;
      } @else {
        height: 300px;
      }
    }
  }
}
</style>