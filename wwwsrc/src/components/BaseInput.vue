<template>
  <label>
    <span v-if='label'>{{ label }}</span>
    <input v-bind='$attrs' v-on='$listeners' />
  </label>
</template>

<script>
export default {
  name: 'base-input',
  props: {
    label: String
  }
};
</script>

<style scoped lang='scss'>
label {
  display: inline-block;
  span,
  input {
    display: block;
  }
  input {
    border: solid 1px #8e8e8e;
    border-radius: 4px;
    background-color: #ffffff;
    padding: 8px;
    &::placeholder {
      color: #989898;
    }
    transition: box-shadow 0.2s;
    will-change: box-shadow;
    &:focus {
      box-shadow: 0px 0px 0px 3px #7fc1ff;
      outline: none;
    }

    margin: 6px;
  }
}
</style>