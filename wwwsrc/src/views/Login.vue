<template>
  <div class="page login">
    <form class='login__form' @submit.prevent="loginForm ? loginUser($event) : register($event)">
      <transition name='max-height'>
        <base-input v-if='!loginForm' type='text' v-model='creds.name' label='Name' placeholder='Chris'></base-input>
      </transition>
      <base-input type='email' v-model='creds.email' label='Email' placeholder='example@example.com'></base-input>
      <base-input type='password' v-model='creds.password' label='Password' placeholder='**********'></base-input>
      <transition name='fade' mode='out-in'>
        <base-button v-if='loginForm' type="submit">Login</base-button>
        <base-button v-else type="submit">Create Account</base-button>
      </transition>
      <base-button type='button' v-text='loginForm ? "or Signup" : "or Login"' @click='loginForm = !loginForm'></base-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  mounted() {
    //checks for valid session
    this.$store.dispatch('authenticate');
  },
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
    register() {
      this.$store.dispatch('register', {
        email: this.creds.email,
        password: this.creds.password,
        name: this.creds.name
      });
    },
    loginUser() {
      this.$store.dispatch('login', {
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
  display: grid;
  place-items: center;
  @supports not (display: grid) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__form {
    margin: auto;
    max-width: 30rem;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
