<template>
  <div class='page dashboard'>
    <h1 class='page__title'>Dashboard</h1>
    <h2 class='subheader'>My Vaults</h2>
    <section class='vaults'>
      <vault-card v-for='vault in vaults' :key='vault.id' v-bind='vault'></vault-card>
      <p v-if='!vaults.length'>You don't have any vaults. Try that button in the bottom right corner to make a new one.</p>
    </section>
    <h2 class='subheader'>My Keeps</h2>
    <section :class='{ myKeeps: myKeeps && myKeeps.length }'>
      <keep-card v-for='keep in myKeeps' :key='keep.id' :inVault='!!vaultKeeps[keep.id]' v-bind='keep'></keep-card>
      <p v-if='!myKeeps.length'>You don't have any keeps. You can create them from the home page.</p>
    </section>
    <floating-action-button icon='add' :to='{ name: "new-vault" }' title='New vault'></floating-action-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VaultCard from '@/components/VaultCard.vue';
import KeepCard from '@/components/KeepCard.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions('vaults', [
      'getVaults',
      'createVault',
      'deleteVault',
      'editVault'
    ]),
    ...mapActions('keeps', ['getMyKeeps', 'storeInVault']),
    init() {
      if (!this.vaults.length) {
        this.getVaults();
      }
      if (!this.myKeeps.length) {
        this.getMyKeeps();
      }
    }
  },
  computed: {
    ...mapState('vaults', ['vaults', 'vaultKeeps']),
    ...mapState('keeps', ['myKeeps'])
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
    VaultCard,
    KeepCard,
    FloatingActionButton
  }
};
</script>

<style scoped lang='scss'>
.dashboard {
  padding-left: 2rem;
  padding-right: 2rem;
  width: calc(100% - 4rem);
}

.page__title {
  margin-bottom: 1.5rem;
}

.subheader {
  margin-top: 1.25rem;
}

.vaults {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  & > * {
    margin: 0.5rem;
  }
}

.myKeeps {
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