<template>
  <div class='page dashboard'>
    <h1 class='page__title'>Dashboard</h1>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import VaultCard from '@/components/VaultCard.vue';

export default {
  name: 'Dashboard',
  methods: {
    ...mapActions('vaults', [''])
  },
  components: {
    VaultCard
  }
};
</script>

<style scoped>
</style>