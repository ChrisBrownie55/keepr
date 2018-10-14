<template>
  <div class='page keep-page'>
    <section class='keep' v-if='keep.id'>
      <header>
        <img :src='keep.img' />
        <div class='actions'>
          <icon-button title='Open' icon='open_in_new'></icon-button>
          <template v-if='user.id'>
            <icon-button title='Store in vault' v-if='!inVault' icon='add' @click.stop='openDialog()'></icon-button>
            <icon-button title='Remove from vault' v-else icon='remove' @click.stop='removeKeepFromVault(id)'></icon-button>
            <icon-button title='Delete' v-if='user.id === userId && isPrivate' icon='delete' @click.stop='deleteKeep(id)'></icon-button>
          </template>
          <icon-button title='Share on twitter' :iconHTML='twitterIcon' @click.stop='share'></icon-button>
        </div>
      </header>
      <main>
        <h2 class='name'>{{ keep.name }}</h2>
        <p class='description'>{{ keep.description }}</p>
        <!--
        <p>
          <base-icon>remove_red_eye</base-icon> {{ keep.views }}
        </p>
        <p>
          <base-icon>share</base-icon> {{ keep.shares }}
        </p>
        <p><span v-html='keepIcon'></span> {{ keep.keeps }}</p>
        -->
      </main>
    </section>
    <transition name='fade'>
      <form v-if='editing'>
        <base-input v-model='modifiedKeep.name' :value='modifiedKeep.name' />
        <base-input v-model='modifiedKeep.description' :value='modifiedKeep.description' />
        <toggle-input label='Private'></toggle-input>
      </form>
    </transition>
    <transition name='fade'>
      <floating-action-button v-if='user.id == keep.userId && !editing' icon='edit'>
      </floating-action-button>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ToggleInput from '@/components/ToggleInput.vue';
import FloatingActionButton from '@/components/FloatingActionButton.vue';
import IconButton from '@/components/IconButton.vue';

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
      `
    };
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('keeps', ['getKeep', 'shareKeep', 'deleteKeep', 'editKeep']),
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
        console.log(this.keep);
        this.modifiedKeep = { ...this.keep };
      }
    },
    async saveEdits() {
      this.editing = false;
      const success = await this.editKeep(this.modifiedKeep);
      if (!success) {
        // TODO: Notify user edit didn't work
      }
    },
    cancelEdits() {
      this.editing = false;
      this.modifiedKeep = { ...this.keep };
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    '$props.id': 'init'
  },
  components: {
    ToggleInput,
    FloatingActionButton,
    IconButton
  }
};
</script>

<style scoped lang='scss'>
.keep-page {
  width: 100%;
  height: 100%;
}

.keep {
  max-width: 100vw;
  width: 30rem;
  overflow: hidden;
}
</style>