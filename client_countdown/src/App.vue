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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgba(255, 250, 252, 0.7);
  text-align: center;
  margin-top: 0;
}

body {
  background: #000000 url("./assets/background6.jpg");
  background-size: 100%;
  background-repeat:no-repeat;
}

@media screen and (max-width: 900px) {
  body {
    background-size: 150%;
  }
}

@media screen and (max-width: 600px) {
  body {
    background-size: 200%;
  }
}

</style>
