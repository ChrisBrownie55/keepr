<template>
  <div class='page keep-page'>
    <transition name='fade'>
      <section class='keep' v-if='keep.id'>
        <header>
          <img :src='keep.img' class='image' />
          <div class='actions'>
            <template v-if='user.id'>
              <icon-button title='Store in vault' v-if='!inVault' icon='add' @click.stop='openDialog()'></icon-button>
              <icon-button title='Remove from vault' v-else icon='remove' @click.stop='removeFromVault'></icon-button>
              <icon-button title='Delete' v-if='user.id === keep.userId && keep.isPrivate' icon='delete' @click.stop='deleteKeep(id)'></icon-button>
            </template>
            <icon-button title='Share on twitter' :iconHTML='twitterIcon' @click.stop='share'></icon-button>
          </div>
          <transition name='fade'>
            <form v-if='dialogOpen' @click.stop class='dialog' ref='dialog' @submit.prevent='addToVault'>
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
        </header>
        <main>
          <h2 class='name'>{{ keep.name }}</h2>
          <p class='description'>{{ keep.description }}</p>
          <div class='stats'>
            <div title='views'>
              <base-icon>remove_red_eye</base-icon>
              <p>{{ keep.views }}</p>
            </div>
            <div title='shares'>
              <base-icon>share</base-icon>
              <p>{{ keep.shares }}</p>
            </div>
            <div title='keeps'>
              <i v-html='keepIcon'></i>
              <p>{{ keep.keeps }}</p>
            </div>
          </div>
        </main>
      </section>
    </transition>
    <transition-group name='fade' mode='out-in'>
      <form v-if='editing' class='edit-form' ref='editForm' @submit.prevent='saveEdits' key='form'>
        <h2 style='margin-bottom: 0.5rem;' align='center'>Edit keep</h2>
        <base-input type='text' name='name' v-model='modifiedKeep.name' :value='modifiedKeep.name' label='Name' placeholder='Fast cars' hint='Maximum length is 20 characters.' maxlength='20' />
        <base-input type='text' name='description' v-model='modifiedKeep.description' :value='modifiedKeep.description' label='Description' placeholder='A racing car photo.' maxlength='255' />
        <base-input type='url' name='image' v-model='modifiedKeep.img' :value='modifiedKeep.img' label='Image URL' placeholder='https://example.com/example-img.jpg'></base-input>
        <toggle-input label='Private' hint="Once public, you can't go back." v-model='modifiedKeep.isPrivate' :value='modifiedKeep.isPrivate'></toggle-input>
        <div class='actions'>
          <outline-button type='submit'>Save</outline-button>
          <flat-button type='button' @click='cancelEdit()'>Cancel</flat-button>
        </div>
      </form>
      <floating-action-button key='fab' v-if='user.id == keep.userId && !editing && keep.isPrivate' icon='edit' @click='openEdit'>
      </floating-action-button>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ToggleInput from '@/components/ToggleInput.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import IconButton from '@/components/IconButton.vue';
import OutlineButton from '@/components/OutlineButton.vue';
import FlatButton from '@/components/FlatButton.vue';

import { traverseUpUntil } from '@/utils.js';

export default {
  name: 'Keep',
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      keep: {},
      modifiedKeep: {},
      editing: false,
      keepIcon: `
        <svg aria-hidden="true" data-prefix="fab" data-icon="kickstarter-k" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="svg-inline--fa fa-kickstarter-k fa-w-12 fa-2x"><path fill="currentColor" d="M147.3 114.4c0-56.2-32.5-82.4-73.4-82.4C26.2 32 0 68.2 0 113.4v283c0 47.3 25.3 83.4 74.9 83.4 39.8 0 72.4-25.6 72.4-83.4v-76.5l112.1 138.3c22.7 27.2 72.1 30.7 103.2 0 27-27.6 27.3-67.4 7.4-92.2l-90.8-114.8 74.9-107.4c17.4-24.7 17.5-63.1-10.4-89.8-30.3-29-82.4-31.6-113.6 12.8L147.3 185v-70.6z" class=""></path></svg>
      `,
      twitterIcon: `
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300.00006 244.18703" height="244.18703" width="300.00006">
          <g transform="translate(-539.17946,-568.85777)">
            <path d="m 633.89823,812.04479 c 112.46038,0 173.95627,-93.16765 173.95627,-173.95625 0,-2.64628 -0.0539,-5.28062 -0.1726,-7.90305 11.93799,-8.63016 22.31446,-19.39999 30.49762,-31.65984 -10.95459,4.86937 -22.74358,8.14741 -35.11071,9.62551 12.62341,-7.56929 22.31446,-19.54304 26.88583,-33.81739 -11.81284,7.00307 -24.89517,12.09297 -38.82383,14.84055 -11.15723,-11.88436 -27.04079,-19.31655 -44.62892,-19.31655 -33.76374,0 -61.14426,27.38052 -61.14426,61.13233 0,4.79784 0.5364,9.46458 1.58538,13.94057 -50.81546,-2.55686 -95.87353,-26.88582 -126.02546,-63.87991 -5.25082,9.03545 -8.27852,19.53111 -8.27852,30.73006 0,21.21186 10.79366,39.93837 27.20766,50.89296 -10.03077,-0.30992 -19.45363,-3.06348 -27.69044,-7.64676 -0.009,0.25652 -0.009,0.50661 -0.009,0.78077 0,29.60957 21.07478,54.3319 49.0513,59.93435 -5.13757,1.40062 -10.54335,2.15158 -16.12196,2.15158 -3.93364,0 -7.76596,-0.38716 -11.49099,-1.1026 7.78383,24.2932 30.35457,41.97073 57.11525,42.46543 -20.92578,16.40207 -47.28712,26.17062 -75.93712,26.17062 -4.92898,0 -9.79834,-0.28036 -14.58427,-0.84634 27.05868,17.34379 59.18936,27.46396 93.72193,27.46396"/>
          </g>
        </svg>
      `,
      dialogOpen: false,
      vaultId: ''
    };
  },
  computed: {
    ...mapState('auth', ['user']),
    ...mapState('vaults', ['vaults', 'vaultKeeps']),
    inVault() {
      return !!this.vaultKeeps[this.$props.id];
    }
  },
  methods: {
    ...mapActions('vaults', [
      'getVaults',
      'addKeepToVault',
      'removeKeepFromVault'
    ]),
    ...mapActions('keeps', ['getKeep', 'shareKeep', 'deleteKeep', 'editKeep']),
    ...mapActions('snacks', ['notify']),
    addToVault() {
      this.addKeepToVault({ vaultId: this.vaultId, keep: this.keep }).then(
        result => result && ++this.keep.keeps
      );
      this.closeDialog();
    },
    removeFromVault() {
      this.removeKeepFromVault(this.id).then(
        result => result && --this.keep.keeps
      );
    },
    async share() {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          window.location.href
        )}`
      );
      const shares = await this.shareKeep(this.$props.id);
      if (!shares) {
        return;
      }
      this.keep.shares = shares;
    },
    async init() {
      this.keep = await this.getKeep(this.$props.id);
      if (!this.keep.id) {
        this.$router.push({ name: 'home' });
      } else {
        this.modifiedKeep = { ...this.keep };
      }

      if (!this.vaults.length) {
        this.getVaults();
      }
    },
    async saveEdits() {
      this.editing = false;
      const success = await this.editKeep(this.modifiedKeep);

      if (!success) {
        this.notify({ message: 'Unable to update keep.', type: 'error' });
        this.modifiedKeep = { ...this.keep };
      } else {
        this.notify({ message: 'Keep updated!', type: 'info' });
        this.keep = { ...this.modifiedKeep };
      }
    },
    openEdit(event) {
      document.body.click();
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
    },
    openDialog(event) {
      if (!this.vaults.length) {
        this.getVaults();
      }
      document.body.click();
      this.dialogOpen = true;
    },
    closeDialog(event) {
      if (!event || event.target !== this.$refs.dialog) {
        this.dialogOpen = false;
        this.vaultId = '';
      }
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    '$props.id': 'init',
    dialogOpen(newState) {
      if (newState) {
        document.body.addEventListener('click', this.closeDialog);
      } else {
        document.body.removeEventListener('click', this.closeDialog);
      }
    },
    editing(newState) {
      if (newState) {
        document.body.addEventListener('click', this.cancelEdit);
      } else {
        document.body.removeEventListener('click', this.cancelEdit);
      }
    }
  },
  components: {
    ToggleInput,
    FloatingActionButton,
    IconButton,
    OutlineButton,
    FlatButton
  }
};
</script>

<style scoped lang='scss'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.keep-page {
  width: 100%;
  height: 100%;
}

.keep {
  width: 30rem;
  max-width: 100%;

  margin: 0 auto;
  overflow: hidden;

  @media (min-width: 600px) {
    margin-top: 2rem;
    border-radius: 4px;

    > header > .image {
      border-radius: 4px;
    }

    > main {
      .name,
      .description {
        text-align: left !important;
      }
    }
  }

  > header {
    position: relative;

    width: 100%;
    height: 20rem;

    > .image {
      width: 100%;
      height: 100%;

      object-fit: cover;
      object-position: center;
    }

    > .actions {
      position: absolute;
      top: 0;
      left: 0;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;

      width: calc(100% - 1.5rem);
      padding: 0.75rem;

      > *:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }

  > main {
    padding: 0.5rem;

    .name {
      text-transform: capitalize;
    }
    .name,
    .description {
      text-align: center;
    }

    .stats {
      display: flex;
      justify-content: space-evenly;

      margin-top: 2rem;

      @media (max-width: 440px) and (max-height: 650px) {
        flex-direction: column;
        margin-top: 0.5rem;

        i {
          margin-right: 0.5rem !important;
        }
      }

      > * {
        display: flex;
        align-items: center;

        margin-right: 1rem;

        > i {
          width: 1.15rem;
          padding: 0.5rem;
          margin-right: 0.1rem;
          > svg {
            width: 100%;
          }
        }
      }
    }
  }
}

.dialog {
  display: flex;
  flex-direction: column;
  align-items: center;

  width: calc(100% - 2rem);
  padding: 1rem 1rem;

  position: absolute;
  top: 50%;

  background-color: white;

  transform: translateY(-50%);
  cursor: default;

  select {
    max-width: 15rem;
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