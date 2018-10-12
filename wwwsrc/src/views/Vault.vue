<template>
  <div class='page vault'>
    <template v-if='vault'>
      <h1 class='page__title'>{{ vault.name }}</h1>
      <p class='page__subtitle'>{{ vault.description }}</p>
      <section class='keeps'>
        <keep-card v-for='keep in vault.keeps' :key='keep.id' v-bind='keep' :inVault='true'></keep-card>
      </section>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import KeepCard from '@/components/KeepCard.vue';

export default {
  name: 'Vault',
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      vault: undefined
    };
  },
  methods: {
    ...mapActions('vaults', ['getVaultById', 'fetchKeepsOnVault']),
    async init() {
      this.vault = await this.getVaultById(this.$props.id);
      vault.keeps = [];
      vault.keeps = await this.fetchKeepsOnVault(this.$props.id);
    }
  },
  watch: {
    '$store.state.auth.user.id'() {
      this.init();
    }
  },
  mounted() {
    this.init();
  },
  components: {
    KeepCard
  }
};
</script>

<style scoped lang='scss'>
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