<template>
  <div class='page dashboard'>
    <h1 class='page__title'>Dashboard</h1>
    <section class='vaults'>
      <vault-card v-for='vault in vaults' :key='vault.id' v-bind='vault'></vault-card>
    </section>
    <floating-action-button icon='add' :to='{ name: "new-vault" }' title='New vault'></floating-action-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VaultCard from '@/components/VaultCard.vue';
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
    ...mapActions('keeps', ['getMyKeeps', 'storeInVault'])
  },
  computed: {
    ...mapState('vaults', ['vaults']),
    ...mapState('keeps', ['myKeeps'])
  },
  mounted() {
    if (!this.vaults.length) {
      this.getVaults();
    }
  },
  components: {
    VaultCard,
    FloatingActionButton
  }
};
</script>

<style scoped>
</style>