<template>
  <div class='page'>
    <h1 class='page__title'>We couldn't find that.</h1>
    <outline-button class='home-button' :to='{ name: "home" }'>Go home</outline-button>
    <h1 class='four-oh-four'>404</h1>
  </div>
</template>

<script>
import OutlineButton from '@/components/OutlineButton.vue';

export default {
  name: 'four-oh-four',
  components: {
    OutlineButton
  }
};
</script>

<style scoped lang='scss'>
.page {
  display: flex;
  flex-direction: column;
}

.page__title {
  animation: fade 0.7s;
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

.home-button {
  margin: 1rem auto 0;
}

.four-oh-four {
  position: absolute;
  top: 50%;
  left: 50%;

  width: fit-content;

  font-size: 6rem;
  font-weight: lighter;

  transform-origin: top left;

  animation: fade-up 1.25s forwards ease;
  @keyframes fade-up {
    0%,
    20% {
      transform: translate(-50%, 5rem);
      opacity: 0;
    }
    100% {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
}

.page {
  background-color: white;
  animation: invert 0.3s 1.3s ease forwards;
  // @keyframes invert {
  // from {
  // filter: invert(0);
  // }
  // to {
  // filter: invert(1);
  // }
  // }
}
</style>