<template>
  <div class='page keep'>
    <template v-if='keep.id'>
      <img :src='keep.img' />
      <template v-if='!editing'>
        <p>{{ keep.name }}</p>
        <p>{{ keep.description }}</p>
      </template>
      <template v-else>
        <base-input v-model='modifiedKeep.name' :value='modifiedKeep.name' />
        <base-input v-model='modifiedKeep.description' :value='modifiedKeep.description' />
      </template>
      <p>Views: {{ keep.views }}</p>
      <p>Shares: {{ keep.shares }}</p>
      <base-button @click='share'>Share</base-button>
      <template v-if='user.id'>
        <base-button key='edit' @click='editing = true' v-if='!editing'>Edit</base-button>
        <template v-else>
          <base-button key='save' @click='saveEdits'>Save</base-button>
          <base-button key='cancel' @click='cancelEdits'>Cancel</base-button>
        </template>
        <base-button key='delete' @click='deleteKeep(id)' v-if='$store.state.auth.user.id === keep.userId && !editing'>
          Delete
        </base-button>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import KeepCard from '@/components/KeepCard.vue';

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
      editing: false
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
      this.modifiedKeep = { ...this.keep };
      if (!this.keep.id) {
        this.$router.push({ name: 'home' });
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
  components: {
    KeepCard
  }
};
</script>

<style scoped lang='scss'>
.keep {
  width: 100%;
  height: 100%;
}
</style>