<template>
  <base-card v-on='$listeners' class='keep-card' @click='$router.push({ name: "keep", params: { id } })'>
    <img :src='img' slot='image' />
    <template slot='content'>
      <p class='title'>{{ name }}</p>
      <p class='paragraph'>{{ description | truncate(50) }}</p>
    </template>
    <template slot='actions'>
      <icon-button title='Open' icon='open_in_new'></icon-button>
      <template v-if='user.id'>
        <icon-button title='Store in vault' v-if='!inVault' icon='add' @click.stop='openDialog()'></icon-button>
        <icon-button title='Remove from vault' v-else icon='remove' @click.stop='removeKeepFromVault(id)'></icon-button>
        <icon-button title='Delete' v-if='user.id === userId && isPrivate' icon='delete' @click.stop='deleteKeep(id)'></icon-button>
      </template>
      <icon-button title='Share on twitter' :iconHTML='twitterIcon' @click.stop='share'></icon-button>
    </template>
    <transition name='fade'>
      <form v-if='dialogOpen' @click.stop class='dialog' ref='dialog' @submit.prevent='addKeepToVault({ vaultId, keep }); $refs.dialog.reset(); closeDialog()'>
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
    isPrivate: {
      type: Boolean,
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
    keeps: {
      type: Number,
      required: true
    },
    inVault: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogOpen: false,
      vaultId: '',
      twitterIcon: `
        <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300.00006 244.18703" height="244.18703" width="300.00006">
          <g transform="translate(-539.17946,-568.85777)">
            <path d="m 633.89823,812.04479 c 112.46038,0 173.95627,-93.16765 173.95627,-173.95625 0,-2.64628 -0.0539,-5.28062 -0.1726,-7.90305 11.93799,-8.63016 22.31446,-19.39999 30.49762,-31.65984 -10.95459,4.86937 -22.74358,8.14741 -35.11071,9.62551 12.62341,-7.56929 22.31446,-19.54304 26.88583,-33.81739 -11.81284,7.00307 -24.89517,12.09297 -38.82383,14.84055 -11.15723,-11.88436 -27.04079,-19.31655 -44.62892,-19.31655 -33.76374,0 -61.14426,27.38052 -61.14426,61.13233 0,4.79784 0.5364,9.46458 1.58538,13.94057 -50.81546,-2.55686 -95.87353,-26.88582 -126.02546,-63.87991 -5.25082,9.03545 -8.27852,19.53111 -8.27852,30.73006 0,21.21186 10.79366,39.93837 27.20766,50.89296 -10.03077,-0.30992 -19.45363,-3.06348 -27.69044,-7.64676 -0.009,0.25652 -0.009,0.50661 -0.009,0.78077 0,29.60957 21.07478,54.3319 49.0513,59.93435 -5.13757,1.40062 -10.54335,2.15158 -16.12196,2.15158 -3.93364,0 -7.76596,-0.38716 -11.49099,-1.1026 7.78383,24.2932 30.35457,41.97073 57.11525,42.46543 -20.92578,16.40207 -47.28712,26.17062 -75.93712,26.17062 -4.92898,0 -9.79834,-0.28036 -14.58427,-0.84634 27.05868,17.34379 59.18936,27.46396 93.72193,27.46396"/>
          </g>
        </svg>
      `
    };
  },
  methods: {
    ...mapActions('keeps', ['deleteKeep', 'shareKeep']),
    ...mapActions('vaults', [
      'getVaults',
      'addKeepToVault',
      'removeKeepFromVault'
    ]),
    openDialog(event) {
      document.body.click();
      this.dialogOpen = true;
    },
    closeDialog(event) {
      if (!event || event.target !== this.$refs.dialog) {
        this.dialogOpen = false;
        this.vaultId = '';
      }
    },
    async share() {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `${window.location.origin}/keep/${this.$props.id}`
        )}`
      );
      const shares = await this.shareKeep(this.$props.id);
      if (!shares) {
        return;
      }
      this.keep.shares = shares;
    }
  },
  computed: {
    ...mapState('vaults', ['vaults']),
    ...mapState('auth', ['user']),
    keep() {
      return {
        id: this.$props.id,
        name: this.$props.name,
        description: this.$props.description,
        userId: this.$props.userId,
        img: this.$props.img,
        isPrivate: this.$props.isPrivate,
        views: this.$props.views,
        shares: this.$props.shares,
        keeps: this.$props.keeps
      };
    }
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