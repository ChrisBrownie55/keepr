<template>
  <label class='input'>
    <span v-if='label' class='label'>{{ label }}</span>
    <input v-bind='$attrs' v-on='listeners' />
    <span v-if='hint' class='hint'>{{ hint }}</span>
  </label>
</template>

<script>
import { debounce } from 'debounce';

export default {
  name: 'base-input',
  inheritAttrs: false,
  props: {
    label: String,
    hint: String,
    value: [String, Number],
    debounce: {
      type: Number,
      default: 0
    }
  },
  computed: {
    listeners: function() {
      return {
        ...this.$listeners,
        input: debounce(
          event => this.$emit('input', event.target.value),
          this.$props.debounce
        )
      };
    },
    attrs: function() {
      let attrs = {
        ...this.$attrs
      };
      if (this.$props.value) {
        attrs[value] = this.$props.value;
      }
      return attrs;
    }
  }
};
</script>

<style scoped lang='scss'>
.input {
  display: inline-block;
  * {
    font-size: 1rem;
  }
  span,
  input {
    display: block;
  }
  input {
    width: calc(100% - 28px);
    padding: 8px;
    margin: 6px auto 2px;

    border: solid 1px #8e8e8e;
    border-radius: 4px;

    background-color: #ffffff;
    &::placeholder {
      color: #989898;
    }

    transition: box-shadow 0.2s;
    will-change: box-shadow;

    &:focus {
      box-shadow: 0px 0px 0px 3px #7fc1ff;
      outline: none;
    }
  }
  .label {
    margin-left: 6px;
    margin-right: auto;
  }
  .hint {
    margin-left: 8px;
    margin-right: auto;
    margin-bottom: 6px;

    font-size: 0.65rem;
  }
}
</style>