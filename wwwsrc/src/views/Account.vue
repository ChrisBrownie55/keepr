<template>
  <div class='page account'>
    <h1 class='page__title'>Account</h1>
    <p class='page__subtitle'>Hello {{ user.name }}</p>
    <div class='menu'>
      <base-button class='menu__button' @click='logout'>Logout</base-button>
      <base-button class='menu__button' disabled coming-soon>Settings</base-button>
      <base-button class='menu__button' disabled coming-soon>Change Password</base-button>
      <base-button class='menu__button' disabled coming-soon>Delete Account</base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Account',
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>

<style scoped lang='scss'>
.menu {
  display: flex;
  flex-direction: column;
  width: 20rem;
  max-width: calc(100% - 1rem);
  margin: 3rem auto 0;

  &__button {
    width: 100%;
    padding: 0.5rem 0;
    margin: 0.25rem 0;
  }
}
</style>