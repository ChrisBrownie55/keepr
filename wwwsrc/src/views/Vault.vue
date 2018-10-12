<template>
  <div class='page vault'>
    <template v-if='vault'>
      <h1 class='page__title'>{{ vault.name }}</h1>
      <p class='page__subtitle'>{{ vault.description }}</p>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

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
    ...mapActions('vaults', ['getVaultById'])
  },
  watch: {
    '$store.state.auth.user.id'() {
      this.getVaultById();
    }
  }
};
</script>

<style scoped>
</style>