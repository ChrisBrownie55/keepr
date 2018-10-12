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
      <slot name='actions'></slot>
    </section>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'base-card'
};
</script>

<style scoped lang='scss'>
.card {
  border-radius: 8px;
  position: relative;

  transition: box-shadow 0.2s;

  @media (hover: hover) {
    &:hover {
      .image {
        filter: brightness(50%);
      }
      .content,
      .actions {
        opacity: 1 !important;
      }
    }
  }
  @media (hover: none) {
    .image {
      filter: brightness(70%);
    }
    .content,
    .actions {
      opacity: 1 !important;
    }
  }
  &:active {
    .image {
      filter: brightness(50%);
    }
    .content,
    .actions {
      opacity: 1 !important;
    }
  }

  & > *:empty {
    display: none !important;
  }

  .image {
    display: flex;
    width: 100%;
    transition: filter 0.2s;

    img[src],
    .img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .image:not(:empty) + .content:not(:empty) {
    pointer-events: none;
    display: flex;
    flex-direction: column;

    width: calc(100% - 1.5rem);
    padding: 0.75rem;

    position: absolute;
    bottom: 0;
    left: 0;

    opacity: 0;
    transition: opacity 0.2s;
    background: none;

    & > .title {
      width: fit-content;
      font-weight: bold;
      text-transform: capitalize;
      margin-bottom: 0.15rem;
      color: white;
    }

    & > .paragraph {
      font-size: 0.8rem;
      font-weight: normal;
      color: #f0f0f0;
    }
  }

  .actions {
    display: flex;
    flex-direction: row-reverse;

    width: calc(100% - 1.5rem);
    padding: 0.75rem;

    position: absolute;
    top: 0;
    right: 0;

    opacity: 0;
    transition: opacity 0.2s;
    background: none;
  }
}
</style>