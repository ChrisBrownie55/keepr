<template>
  <div class='snackbar' :class='{ [type]: true }'>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'snackbar',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      validator: value => ['info', 'error', 'warning'].includes(value),
      required: true
    }
  }
};
</script>

<style scoped lang='scss'>
.snackbar {
  position: relative;

  width: 15rem;
  padding: 0.5rem 1.25rem 0.5rem 1rem;

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;

  background-color: #222;
  color: white;

  animation: fade 1s, fade 1.5s 2s reverse forwards, flatten 0.2s;
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes flatten {
    to {
      height: 0;
      margin-top: 0;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
    }
  }

  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0.25rem;
  //   left: 0.25rem;

  //   width: 0.35rem;
  //   height: 0.35rem;

  //   border-radius: 50%;
  // }

  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  &.info {
    border-bottom: solid 2px #0094cd;
  }
  &.error {
    border-bottom: solid 2px #e94646;
  }
  &.warning {
    border-bottom: solid 2px #b8b322;
  }
}
</style>