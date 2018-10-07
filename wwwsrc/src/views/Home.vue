<template>
  <div class="page">
    <h1>Welcome Home</h1>
    <keep v-for='keep in keeps' :key='keep._id' :data='keep'>
    </keep>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Keep from '@/components/Keep';

export default {
  name: 'home',
  methods: {
    ...mapActions('keeps', ['getKeeps'])
  },
  computed: {
    ...mapState('keeps', ['keeps'])
  },
  mounted() {
    if (!this.$store.state.keeps.length) {
      this.getKeeps();
    }
  },
  components: {
    Keep
  }
};
</script>