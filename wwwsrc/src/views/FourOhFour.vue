<template>
  <div class='page'>
    <h1 class='page__title'>We couldn't find that.</h1>
    <h1 class='four-oh-four'>404</h1>
  </div>
</template>

<script>
export default {
  name: '404'
};
</script>

<style scoped lang='scss'>
.four-oh-four {
  position: absolute;
  top: 50%;
  left: 50%;

  width: fit-content;

  font-size: 6rem;
  font-weight: lighter;

  transform-origin: top left;

  animation: fade-up 1.25s forwards ease-in-out;
  @keyframes fade-up {
    0%,
    20% {
      transform: translate(-50%, 8rem);
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