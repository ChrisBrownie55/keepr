<template>
  <div class='page keep'>
    <div style='display: contents;' v-if='keep'>
      <img :src='keep.img' />
      <p>{{ keep.name }}</p>
      <p>{{ keep.description }}</p>
      <p>Views: {{ keep.views }}</p>
      <p>Shares: {{ keep.shares }}</p>
      <base-button @click='share'>Share</base-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import KeepCard from '@/components/KeepCard.vue';

export default {
  name: 'Keep',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      keep: undefined
    };
  },
  methods: {
    ...mapActions('keeps', ['getKeep', 'shareKeep']),
    share() {
      this.shareKeep(this.$props.id);
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          window.location.href
        )}`
      );
    }
  },
  async mounted() {
    this.keep = await this.getKeep(this.$props.id);
    if (!this.keep) {
      this.$router.push({ name: 'home' });
    }
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