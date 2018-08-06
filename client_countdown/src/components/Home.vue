<template>
  <div>

    <div class="containouter">
      <div class="containinner">
        <img src=".././assets/ssrlogo3.png">
      </div>
    </div>

    <div>
      <Countdown end="September 30, 2018"></Countdown>
    </div>

    <div class="smalltext">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea yolo commodo yolo consequat.
      </p>
      <p>
        Coming soon.
      </p>
    </div>
  </div>
</template>

<script>
  import Countdown from './Countdown.vue'
  export default {
    name: 'hello',
    components: { Countdown },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.containouter {
  width: 100%;
}

.containinner {
  max-width: 500px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.containinner img {
  opacity: 0.8;
  width: 100%;
}

.smalltext {
  font-size: larger;
  max-width: 600px;
  display: inline-block;
  margin: 40px 16px;
  text-align: center;
  position: relative;
}

@media screen and (max-width: 500px) {
  .smalltext {
    font-size: medium;
  }
}

</style>
