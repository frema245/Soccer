<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 0;
}

#app::-webkit-scrollbar {
  display: none;
}

html, body {
  height:100%;
  overflow:hidden;
}

body {
  background: #000000 url("./assets/wallpaper2.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center fixed;
}

</style>
