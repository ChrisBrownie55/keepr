<template>
  <div class='toggle input'>
    <input type='checkbox' :id='id' v-bind='$attrs' v-on='listeners' />
    <label :for='id'></label>
    <p>{{ label }}</p>
  </div>
</template>

<script>
let idCount = 0;

export default {
  name: 'toggle-input',
  inheritAttrs: false,
  props: {
    label: String
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        change: event => this.$emit('input', event.target.checked)
      };
    },
    attrs() {
      const attrs = {
        ...this.$attrs
      };
      if (attrs.value) {
        attrs.checked = attrs.value;
      }
    }
  },
  created() {
    this.id = `toggle-input-${idCount++}`;
  }
};
</script>

<style scoped lang='scss'>
.toggle {
  display: flex;
  position: relative;
}
.toggle input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  display: none;
}
.toggle input[type='checkbox'] + label {
  cursor: pointer;
  position: relative;

  width: 3rem;
  height: 1.25rem;

  border-radius: 1.5rem;

  background: #ddd;
  box-shadow: inset 0px 0px 3px rgba(0, 0, 0, 0.2);
}
.toggle input[type='checkbox'] + label::before {
  content: ' ';
  position: absolute;
  left: -0.1rem;
  top: 50%;

  width: 1.5rem;
  height: 1.5rem;

  border-radius: 100%;

  background-color: #999;

  transform: translateY(-50%);

  transition: background-color 0.2s, left 0.2s;
  will-change: background-color, left;
}
.toggle input[type='checkbox'] + label + p {
  margin-left: 0.5rem;

  color: black;
  opacity: 0.3;

  font-family: Roboto;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25rem;

  transition: opacity 0.2s;
  will-change: opacity;
}
.toggle input[type='checkbox']:checked + label::before {
  background-color: #444;
  left: calc(100% - 1.4rem);
}
.toggle input[type='checkbox']:checked + label + p {
  opacity: 1;
}
</style>