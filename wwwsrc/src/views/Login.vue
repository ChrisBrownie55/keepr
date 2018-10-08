<template>
  <div class="page login">
    <form class='login__form' @submit.prevent="loginForm ? loginUser($event) : registerUser($event)">
      <h2 style='font-weight: 400; margin-bottom: 1rem' align='center'>
        Welcome to <span style='font-weight: bold; color: var(--theme-primary); text-decoration: underline;'>Keepr</span>
      </h2>
      <transition name='max-height'>
        <base-input v-if='!loginForm' type='text' v-model='creds.name' label='Name' placeholder='Chris'></base-input>
      </transition>
      <base-input type='email' v-model='creds.email' label='Email' placeholder='example@example.com'></base-input>
      <base-input type='password' v-model='creds.password' label='Password' placeholder='**********'></base-input>
      <div class='actions'>
        <transition name='fade' mode='out-in'>
          <base-button v-if='loginForm' type="submit">Login</base-button>
          <base-button v-else type="submit">Signup</base-button>
        </transition>
        <base-button style='border: none; box-shadow: none !important;' type='button' v-text='loginForm ? "or Signup" : "or Login"' @click='loginForm = !loginForm'></base-button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
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
  }
};
</script>

<style lang="scss" scoped>
.max-height-enter-active,
.max-height-leave-active {
  transition: max-height 0.2s;
  overflow: hidden;
}
.max-height-enter,
.max-height-leave-to {
  max-height: 0;
}
.max-height-enter-to,
.max-height-leave {
  max-height: 3.5rem;
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
    background-color: white;
    border-radius: 4px;
    padding: 1rem 2rem;

    margin: auto;
    max-width: 20rem;
    width: calc(calc(100% - 4rem) - 2rem);
    display: flex;
    flex-direction: column;

    .base-input {
      margin-bottom: 0.125rem;
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
