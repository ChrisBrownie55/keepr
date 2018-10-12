<template>
  <div id="app">
    <nav id='main-nav'>
      <base-icon v-for='(tab, index) in tabs' :key='index' :class='{ active: tab.routes.includes($router.currentRoute.name) }' @click='$router.push({ name: $store.state.auth.user.id ? tab.routes[tab.routes.length - 1] : tab.routes[0] })'>
        {{ tab.icon }}
      </base-icon>
    </nav>
    <transition name='fade' mode='out-in'>
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { routes: ['login', 'account'], icon: 'person' },
        { routes: ['home'], icon: 'home' },
        { routes: ['dashboard'], icon: 'dashboard' }
      ]
    };
  }
};
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang='scss'>
html {
  font-size: 18px;
}
body {
  margin: 0;
  min-height: 100vh;
}

body::-webkit-scrollbar {
  width: 6px;
  border-left: 1px solid #e6ecf8;
}

body::-webkit-scrollbar-track {
  box-shadow: none;
}

body::-webkit-scrollbar-thumb {
  background-color: #293347;
  outline: 1px solid #7f7f7f;
}

#app {
  min-height: calc(100vh - 2.5rem);
  padding-bottom: 2.5rem;

  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --theme-primary: #fccf5d;
  --theme-secondary: #0b107b;
}

// Page stuff

.page {
  min-height: calc(100vh - 2.5rem);
  display: inline-block;
  max-width: 100%;
  width: 100vw;

  &__title {
    text-align: center;
    background-color: black;
    font-weight: normal;
    &:not(.skeleton) {
      width: fit-content;
      margin-top: 1rem;
      margin-left: auto;
      margin-right: auto;
      padding: 0 1rem;
      color: white;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    }
  }
  &__subtitle {
    text-align: center;
    &:not(.skeleton) {
      margin-top: 0.35rem;
    }
  }
}

// Nav bar stuff

#main-nav {
  z-index: 4;

  width: calc(100% - 1rem);
  height: 2rem;
  padding: 0rem 0.5rem 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 0;

  background-color: white;
  box-shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.15), 0 2px 3px 0 rgba(0, 0, 0, 0.25);

  & > .icon {
    cursor: pointer;
    margin: 3px 0.5rem 0;
    padding: calc(0.5rem - 3px) 0.85rem 0;
    transition: border-top-color 0.35s;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      height: 3px;
      width: 0;
      top: -3px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--theme-primary);
      transition: width 0.2s;
    }

    &.active {
      &::after {
        width: 100%;
      }
    }
  }
}

p,
h1,
h2,
h3,
h4,
h5,
h6,
blockquote,
dl,
figure,
hr,
menu,
ol,
pre,
ul {
  margin: 0;
}

// SKELETONS
h1.skeleton {
  height: 1.6rem;
  margin-bottom: 0.3rem;
  margin-top: 0.3rem;
  display: block;
}
h5.skeleton {
  height: 0.8rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  display: block;
}

// Page skeletons
.page {
  &__title.skeleton,
  &__subtitle.skeleton {
    margin-left: auto;
    margin-right: auto;
  }

  &__title.skeleton {
    width: 6rem;
  }
  &__subtitle.skeleton {
    width: 11rem;
  }
}

// Skeleton globals

.skeleton-color {
  $color: #e1e9f3;
  background-color: $color;
}
.skeleton {
  position: relative !important;
}
.skeleton::before {
  content: '';
  width: 0%;
  height: 100%;
  position: absolute;
  background-color: rgba(#3d70b2, 0.1);
  animation: skeleton 3s infinite ease-in-out;
}
@keyframes skeleton {
  0% {
    width: 0%;
    left: 0;
    right: auto;
    opacity: 0.3;
  }
  20% {
    width: 100%;
    left: 0;
    right: auto;
    opacity: 1;
  }
  28% {
    width: 100%;
    left: auto;
    right: 0;
  }
  51% {
    width: 0%;
    left: auto;
    right: 0;
  }
  58% {
    width: 0%;
    left: auto;
    right: 0;
  }
  82% {
    width: 100%;
    left: auto;
    right: 0;
  }
  83% {
    width: 100%;
    left: 0;
    right: auto;
  }
  96% {
    width: 0%;
    left: 0;
    right: auto;
  }
  100% {
    width: 0%;
    left: 0;
    right: auto;
    opacity: 0.3;
  }
}
</style>