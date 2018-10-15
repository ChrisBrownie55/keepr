<template>
  <div class='page new-keep'>
    <h1 class='page__title'>Create Keep</h1>
    <h5 class='page__subtitle'>Share your ideas 🙂</h5>
    <form class='new-keep__form' @submit.prevent='submit' ref='form'>
      <h2 style='font-weight: 400; margin-bottom: 1rem' align='center'>New keep</h2>
      <base-input autocomplete='off' required type='text' v-model='keep.name' label='Name' placeholder='Like "Burger pizza recipe"'></base-input>
      <base-input autocomplete='off' required type='text' v-model='keep.description' label='Description' placeholder='A burger made of two pizzas and a ton of meat.'></base-input>
      <base-input autocomplete='off' required type='url' v-model='keep.img' label='Image URL' placeholder='https://example.com/example.jpg'></base-input>
      <toggle-input label='Private' v-model='keep.isPrivate' :checked='keep.isPrivate' hint='You cannot edit public keeps.'></toggle-input>
      <!-- TODO: Make a checkbox component -->
      <div class='actions'>
        <outline-button type='submit'>Create</outline-button>
        <flat-button type='reset' style='border: none; box-shadow: none !important;'>Reset</flat-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import OutlineButton from '@/components/OutlineButton.vue';
import FlatButton from '@/components/FlatButton.vue';
import ToggleInput from '@/components/ToggleInput.vue';

export default {
  name: 'New-keep',
  data() {
    return {
      keep: {
        name: '',
        description: '',
        img: '',
        isPrivate: true
      }
    };
  },
  methods: {
    ...mapActions('keeps', ['createKeep']),
    submit() {
      this.createKeep(this.keep);
      this.$refs.form.reset();
    }
  },
  components: {
    OutlineButton,
    FlatButton,
    ToggleInput
  }
};
</script>

<style scoped lang='scss'>
.new-keep {
  background-image: url(https://s.pinimg.com/webapp/style/images/bg_business_account_convert-974d766b.jpg);
  background-color: rgba(255, 255, 255, 0.65);
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
}
</style>