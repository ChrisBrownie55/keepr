<template>
  <div id="app">
    <nav id='main-nav'>
      <icon>person</icon>
    </nav>
    <transition name='fade' mode='out-in'>
      <router-view />
    </transition>
  </div>
</template>

<style lang='scss'>
html {
  font-size: 20px;
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
  min-height: calc(100vh - 3rem);
  padding-bottom: 3rem;

  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --theme-primary: #fccf5d;

  --theme-secondary: #0b107b;
}

.page {
  min-height: calc(100vh - 3rem);
}

#main-nav {
  width: calc(100% - 2rem);
  height: 2.5rem;
  padding: 0.25rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 0;
  left: 0;

  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .left,
  .right {
    width: calc(calc(50% - 3rem) - calc(1.25rem / 2));
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    display: flex;
  }
  .left {
    justify-content: flex-end;
  }
  .right {
    justify-content: flex-start;
  }
  .logo {
    fill: var(--theme-secondary);
    background-color: var(--theme-primary);
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
    padding: 0.35rem;
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
</style>