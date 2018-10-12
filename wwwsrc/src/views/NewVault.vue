<template>
  <div class='page new-vault'>
    <h1 class='page__title' style='color: black; background-color: white;'>Create Vault</h1>
    <h5 class='page__subtitle' style='color: white; font-weight: 400;'>Store your ideas 😎</h5>
    <form class='new-vault__form' @submit.prevent='submit' ref='form'>
      <h2 style='font-weight: 400; margin-bottom: 1rem' align='center'>New vault</h2>
      <base-input required label='Name' placeholder='Pretty room ideas' v-model='vault.name'></base-input>
      <base-input required label='Description' placeholder='Lots of ideas for decorations for rooms and whatnot.' v-model='vault.description'></base-input>
      <div class='actions'>
        <base-button type='submit'>Submit</base-button>
        <base-button type='reset'>Reset</base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'New-Vault',
  data() {
    return {
      vault: {
        name: '',
        description: ''
      }
    };
  },
  methods: {
    ...mapActions('vaults', ['createVault']),
    submit() {
      this.createVault(this.vault);
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped lang='scss'>
.new-vault {
  background-image: url(https://images8.alphacoders.com/485/thumb-1920-485221.jpg);
  background-color: rgba(0, 0, 0, 0.35);
  background-size: cover;
  background-blend-mode: color;

  &__form {
    display: flex;
    flex-direction: column;
    margin: calc(50vh - 15rem) auto 0;
    max-width: 23rem;
    width: calc(calc(100% - 4rem) - 2rem);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    background-color: white;
    border-radius: 4px;
    padding: 1rem 2rem;

    .input {
      margin-bottom: 0.125rem;
    }

    .actions {
      margin-top: 0.5rem;
      padding: 0.35rem;
      display: flex;
      & > *:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>