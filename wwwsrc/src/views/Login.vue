<template>
  <div class="page login">
    <form class='login__form' @submit.prevent="loginForm ? loginUser($event) : registerUser($event)">
      <h2 style='font-weight: 400; margin-bottom: 1rem' align='center'>
        Welcome to <span style='font-weight: bold; color: var(--theme-primary); text-decoration: underline;'>Keepr</span>
      </h2>
      <transition name='max-height'>
        <base-input required v-if='!loginForm' type='text' v-model='creds.name' name='name' label='Name' hint='Maximum length is 20 characters' maxlength='20' placeholder='Chris'></base-input>
      </transition>
      <base-input required type='email' v-model='creds.email' name='email' label='Email' placeholder='example@example.com'></base-input>
      <base-input required type='password' v-model='creds.password' name='password' label='Password' minlength='8' hint='Minimum length is 8 characters' placeholder='**********'></base-input>
      <div class='actions'>
        <transition name='fade' mode='out-in'>
          <outline-button v-if='loginForm' type="submit">Login</outline-button>
          <outline-button v-else type="submit">Signup</outline-button>
        </transition>
        <flat-button type='button' v-text='loginForm ? "or signup" : "or login"' @click='loginForm = !loginForm'></flat-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FlatButton from '@/components/FlatButton.vue';
import OutlineButton from '@/components/OutlineButton.vue';

export default {
  name: 'Login',
  data() {
    return {
      loginForm: true,
      creds: {
        email: '',
        password: '',
        name: ''
      }
    };
  },
  methods: {
    ...mapActions('auth', ['login', 'register']),
    registerUser() {
      this.register({
        email: this.creds.email,
        password: this.creds.password,
        name: this.creds.name
      });
    },
    loginUser() {
      this.login({
        email: this.creds.email,
        password: this.creds.password
      });
    }
  },
  components: {
    FlatButton,
    OutlineButton
  }
};
</script>

<style lang="scss" scoped>
.max-height-enter-active,
.max-height-leave-active {
  transition: max-height 0.2s ease-in-out;
  overflow: hidden;
}
.max-height-enter,
.max-height-leave-to {
  max-height: 0;
}
.max-height-enter-to,
.max-height-leave {
  max-height: 5rem;
}

.login {
  background-image: url(https://s.pinimg.com/webapp/style/images/bg_multi_case_grid_no_text_white_55_percent-2000ab22.jpg);
  background-position: center;
  background-size: cover;

  display: grid;
  place-items: center;
  @supports not (display: grid) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    display: flex;
    flex-direction: column;

    width: calc(calc(100% - 4rem) - 2rem);
    max-width: 20rem;
    padding: 1rem 2rem;
    margin: auto;

    background-color: white;
    border-radius: 4px;

    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

    .input {
      margin-bottom: 0.25rem;
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
