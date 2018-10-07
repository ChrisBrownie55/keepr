<template>
  <div class='card' v-bind='$attrs' v-on='$listeners'>
    <section class='image'>
      <slot name='image'></slot>
    </section>
    <section class='content'>
      <slot name='content'>
      </slot>
    </section>
    <section class='actions'>
      <slot name='action'></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'base-card'
};
</script>

<style scoped lang='scss'>
.card {
  width: 15rem;

  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  & > *:empty {
    display: none !important;
  }

  .image {
    width: 100%;
    height: 15rem;

    img[src] {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    width: 100%;
    padding: 0.25rem;

    & > :global(.title) {
      font-weight: bold;
      color: #222;
      text-transform: capitalize;
    }

    & > :global(.paragraph) {
      font-weight: normal;
      color: #444;
    }
  }

  .actions {
    display: flex;
    align-items: center;

    width: 100%;
    padding: 0.25rem;
  }
}
</style>