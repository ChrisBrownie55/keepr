<template>
  <div class='page vault'>
    <template v-if='vault'>
      <h1 class='page__title'>{{ vault.name }}</h1>
      <p class='page__subtitle'>{{ vault.description }}</p>
      <section class='keeps'>
        <keep-card v-for='keep in vault.keeps' :key='keep.id' v-bind='keep' :inVault='true'></keep-card>
      </section>
    </template>
    <transition name='fade' mode='out-in'>
      <form v-if='editing' class='edit-form' ref='editForm' @submit.prevent='saveEdits' key='form'>
        <h2 style='margin-bottom: 0.5rem;' align='center'>Edit vault</h2>
        <base-input autocomplete='off' type='text' name='name' v-model='modifiedVault.name' :value='modifiedVault.name' label='Name' placeholder='Fast cars' hint='Maximum length is 20 characters.' maxlength='20' />
        <base-input autocomplete='off' type='text' name='description' v-model='modifiedVault.description' :value='modifiedVault.description' label='Description' placeholder='A racing car photo.' maxlength='255' />
        <div class='actions'>
          <outline-button type='submit'>Save</outline-button>
          <flat-button type='button' @click='cancelEdit()'>Cancel</flat-button>
        </div>
      </form>
      <floating-action-button key='fab' v-else icon='edit' @click='openEdit'>
      </floating-action-button>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import KeepCard from '@/components/KeepCard.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import FlatButton from '@/components/FlatButton.vue';
import OutlineButton from '@/components/OutlineButton.vue';
import ToggleInput from '@/components/ToggleInput.vue';

export default {
  name: 'Vault',
  props: {
    id: {
      validator: value => !isNaN(value),
      required: true
    }
  },
  data() {
    return {
      editing: false,
      modifiedVault: {}
    };
  },
  methods: {
    ...mapActions('vaults', ['getVaults', 'editVault']),
    ...mapActions('keeps', ['getMyKeeps']),
    ...mapActions('snacks', ['notify']),
    async init() {
      if (!this.vault) {
        await this.getVaults();
        if (!this.vault) {
          this.$router.push({ name: 'dashboard' });
        }
      }
    },
    async saveEdits() {
      this.editing = false;
      const success = await this.editVault(this.modifiedVault);

      if (!success) {
        this.notify({ message: 'Unable to update vault.', type: 'error' });
        this.modifiedVault = { ...this.vault };
      } else {
        this.notify({ message: 'Vault updated!', type: 'info' });
      }
    },
    openEdit(event) {
      document.body.click();
      this.modifiedVault = { ...this.vault };
      this.editing = true;
    },
    cancelEdit(event) {
      if (
        !event ||
        traverseUpUntil(node => node.tagName === 'FORM', event.target) !==
          this.$refs.editForm
      ) {
        this.editing = false;
        this.modifiedKeep = { ...this.keep };
      }
    }
  },
  computed: {
    ...mapState('vaults', ['vaults']),
    vault() {
      return this.vaults.find(vault => vault.id === parseInt(this.$props.id));
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
    KeepCard,
    FloatingActionButton,
    FlatButton,
    OutlineButton,
    ToggleInput
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

.edit-form {
  position: fixed;
  top: 50%;
  left: 50%;

  display: flex;
  flex-direction: column;

  width: calc(calc(100% - 4rem) - 2rem);
  max-width: 20rem;
  padding: 1rem 2rem;

  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  transform: translate(-50%, -50%);

  .input {
    margin-bottom: 0.125rem;
  }

  .toggle {
    margin-left: 0.35rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
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
</style>