<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang='scss'>
body,
#app {
  margin: 0;
  min-height: 100vh;
}

#app {
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page {
  min-height: 100vh;
}
</style>