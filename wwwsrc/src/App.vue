<template>
  <div id="app">
    <nav id='main-nav'>
      <div class='left'>
        <svg class='logo' height="80" viewBox="0 0 66.66600036621094 80">
          <g>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" viewBox="16.66699981689453 10 66.66600036621094 80" enable-background="new 0 0 100 100" xml:space="preserve" width="66.66600036621094" height="80">
              <path d="M16.667,43.33C16.667,69.104,37.559,90,63.333,90v-6.667c-22.093,0-40-17.91-40-40.003H16.667z"></path>
              <path d="M63.333,16.667c-14.729,0-26.666,11.94-26.666,26.664C36.667,58.06,48.604,70,63.333,70v6.667  C44.922,76.667,30,61.741,30,43.33C30,24.922,44.922,10,63.333,10V16.667z"></path>
              <path d="M76.667,43.333C76.667,35.97,70.7,30,63.333,30C55.967,30,50,35.97,50,43.333s5.967,13.334,13.333,13.334v6.666  c-11.048,0-20-8.955-20-20.003c0-11.045,8.952-19.997,20-19.997c11.049,0,20,8.952,20,19.997L76.667,43.333z"></path>
            </svg>
          </g>
        </svg>
        <p class='logo-name'>Keepr</p>
      </div>
      <div class='right'></div>
    </nav>
    <router-view />
  </div>
</template>

<style lang='scss'>
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
  padding-top: 3rem;

  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --theme-primary: #fccf5d;
  --theme-secondary: #0b107b;
}

.page {
  min-height: 100%;
}

#main-nav {
  width: calc(100% - 2rem);
  height: 2.5rem;
  padding: 0.25rem 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  .left {
    display: flex;
    align-items: center;

    .logo {
      fill: var(--theme-secondary);
      background-color: var(--theme-primary);
      border-radius: 50%;
      width: 1.25rem;
      height: 1.25rem;
      padding: 0.35rem;
      margin-right: 0.25rem;
    }
    .logo-name {
      margin: 0;
      font-weight: bolder;
      font-size: 1.15rem;
      color: var(--theme-secondary);
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
</style>