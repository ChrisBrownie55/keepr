<template>
  <div class="page home">
    <h1 class='page__title' v-if='!initialLoad'>Home</h1>
    <h1 class='page__title skeleton skeleton-color' v-else></h1>
    <h5 class='page__subtitle' v-if='!initialLoad'>Check out everyone's keeps here 👇</h5>
    <h5 class='page__subtitle skeleton skeleton-color' v-else></h5>
    <base-input v-show='!initialLoad' class='search' name='search' placeholder='🔎 Search' :debounce='500' @input='search'></base-input>
    <base-input-skeleton class='search' v-if='initialLoad'></base-input-skeleton>
    <section class='keeps'>
      <transition-group name='keep-list' :duration='{ enter: 250, leave: 250, move: 500 }'>
        <!-- TODO: Make transitions work! -->
        <keep-card v-for='keep in keeps' :key='keep.id' v-bind='keep' :inVault='!!vaultKeeps[keep.id]' class='keep-list-item' v-if='!initialLoad'>
        </keep-card>
        <base-card-skeleton v-if='initialLoad' v-for='n in 10' :key='n'></base-card-skeleton>
        <!-- <base-button @click.once='$store.dispatch("keeps/generateRandomKeeps")' key='uh'>Generate Random Keeps</base-button> -->
      </transition-group>
    </section>
    <floating-action-button icon='add' title='Create keep' :to='{ name: "new-keep" }'></floating-action-button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import KeepCard from '@/components/KeepCard';
import FloatingActionButton from '@/components/FloatingActionButton';

export default {
  name: 'Home',
  methods: {
    ...mapActions('keeps', ['getKeeps', 'searchKeeps']),
    ...mapActions('vaults', ['getVaults']),
    search(value) {
      value = value.trim();
      if (!value) {
        this.getKeeps();
      } else {
        this.searchKeeps(value);
      }
    },
    init() {
      if (!this.vaults.length) {
        this.getVaults();
      }
    }
  },
  computed: {
    ...mapState('keeps', ['keeps', 'loading', 'initialLoad']),
    ...mapState('vaults', ['vaults', 'vaultKeeps'])
  },
  mounted() {
    if (!this.keeps.length) {
      this.getKeeps();
    }
    this.init();
  },
  watch: {
    '$store.state.auth.user.id'() {
      this.init();
    }
  },
  components: {
    KeepCard,
    FloatingActionButton
  }
};
</script>

<style lang='scss' scoped>
.keep-list-enter,
.keep-list-leave-to {
  opacity: 0 !important;
  transform: translateY(30px);
}
.keep-list-enter-active,
.keep-list-leave-active {
  transition: all 0.25s;
}
.keep-list-move {
  transition: all 0.5s;
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