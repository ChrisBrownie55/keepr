<template>
  <base-card v-on='$listeners' class='keep-card' @click='$router.push({ name: "keep", params: { id } })'>
    <img :src='img' slot='image' />
    <template slot='content'>
      <p class='title'>{{ name }}</p>
      <p class='paragraph'>{{ description | truncate(50) }}</p>
    </template>
    <template slot='actions'>
      <icon-button icon='add' @click.stop='openDialog()'></icon-button>
    </template>
    <transition name='fade'>
      <section class='dialog' ref='dialog' v-if='dialogOpen' @click.stop>
        <form @submit.prevent='addKeepToVault({ vaultId, keepId: id })'>
          <h2>Select a vault</h2>
          <select required v-model='vaultId' v-if='vaults.length'>
            <option v-for='vault in vaults' :key='vault.id' :value='vault.id'>
              {{ vault.name }}
            </option>
          </select>
          <base-button v-if='vaults.length' type='submit' style='margin-top: 0.5rem;'>Add to vault</base-button>
          <p v-else>You need to create a vault first.</p>
        </form>
      </section>
    </transition>
  </base-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import IconButton from '@/components/IconButton.vue';

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
    }
  },
  data() {
    return {
      dialogOpen: false,
      vaultId: ''
    };
  },
  methods: {
    ...mapActions('keeps', ['addKeepToVault']),
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
    ...mapState('vaults', ['vaults'])
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
    IconButton
  }
};
</script>

<style scoped lang='scss'>
.keep-card {
  cursor: pointer;
}

.dialog {
  width: calc(100% - 2rem);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  background-color: white;
}
</style>