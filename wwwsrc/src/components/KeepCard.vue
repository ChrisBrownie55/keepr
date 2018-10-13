<template>
  <base-card v-on='$listeners' class='keep-card' @click='$router.push({ name: "keep", params: { id } })'>
    <img :src='img' slot='image' />
    <template slot='content'>
      <p class='title'>{{ name }}</p>
      <p class='paragraph'>{{ description | truncate(50) }}</p>
    </template>
    <template slot='actions' v-if='user.id'>
      <icon-button title='Store in vault' v-if='!inVault' icon='add' @click.stop='openDialog()'></icon-button>
      <icon-button title='Remove from vault' v-else icon='remove' @click.stop='removeKeepFromVault(id)'></icon-button>
      <icon-button title='Delete' v-if='user.id === userId' icon='delete' @click.stop='deleteKeep(id)'></icon-button>
    </template>
    <transition name='fade'>
      <form v-if='dialogOpen' @click.stop class='dialog' ref='dialog' @submit.prevent='addKeepToVault({ vaultId, keepId: id })'>
        <h2 style='margin-bottom: 0.5rem;'>Store keep in vault</h2>
        <select required style='font-size: 1rem; cursor: pointer; border-radius: 4px; padding: 0.15rem 0.35rem;' v-model='vaultId' v-if='vaults.length'>
          <option selected disabled value=''>Please select a vault</option>
          <option v-for='vault in vaults' :key='vault.id' :value='vault.id'>
            {{ vault.name }}
          </option>
        </select>
        <outline-button v-if='vaults.length' type='submit' style='margin-top: 0.5rem;'>Store in vault</outline-button>
        <p v-else>You need to create a vault first.</p>
      </form>
    </transition>
  </base-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import IconButton from '@/components/IconButton.vue';
import OutlineButton from '@/components/OutlineButton.vue';

export default {
  name: 'keep-card',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    },
    views: {
      type: Number,
      required: true
    },
    shares: {
      type: Number,
      required: true
    },
    inVault: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogOpen: false,
      vaultId: ''
    };
  },
  methods: {
    ...mapActions('keeps', [
      'addKeepToVault',
      'deleteKeep',
      'removeKeepFromVault'
    ]),
    ...mapActions('vaults', ['getVaults']),
    openDialog(event) {
      document.body.click();
      this.dialogOpen = true;
    },
    closeDialog(event) {
      if (event.target !== this.$refs.dialog) {
        this.dialogOpen = false;
      }
    }
  },
  computed: {
    ...mapState('vaults', ['vaults']),
    ...mapState('auth', ['user'])
  },
  watch: {
    dialogOpen(newState) {
      if (newState) {
        document.body.addEventListener('click', this.closeDialog);
      } else {
        document.body.removeEventListener('click', this.closeDialog);
      }
    }
  },
  components: {
    IconButton,
    OutlineButton
  }
};
</script>

<style scoped lang='scss'>
.keep-card {
  cursor: pointer;
}

.dialog {
  display: flex;
  flex-direction: column;

  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;

  position: absolute;
  top: 50%;

  background-color: white;

  transform: translateY(-50%);
  cursor: default;
}
</style>