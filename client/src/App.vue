<template>
  <div id="app">

    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <img src="./assets/inverted.png" style="
      height: 70px;
      margin: -18px 40px -18px -10px;
      ">

      <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse collapse" id="navbarColor01" style="">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{ active: isActivePlayers }">
            <a class="nav-link" @click="goToPath('/')">Players</a>
          </li>
          <li class="nav-item" :class="{ active: isActiveRegister }">
            <a class="nav-link" @click="goToPath('/register/init')">Register</a>
          </li>

          <!-- SOME PLAYER FOR NOW -->
          <li class="nav-item" :class="{ active: isActiveProfile }">
            <a class="nav-link" @click="viewPlayer('5b7311a158b8ae7ae8e23069')">Profile</a>
          </li>

          <!--
          <li class="nav-item">
            <a class="nav-link" href="#">Pricing</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About</a>
          </li>
          -->

        </ul>

        <!--
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
        </form>
        -->

      </div>
    </nav>

    <!-- Main component -->
    <transition name="component-fade" mode="out-in">
      <router-view
      style="padding-top: 50px"
      @viewPlayer="viewPlayer"
    >

    </router-view>
    </transition>

  </div>
</template>

<script>

  export default {
  name: 'app',
    data () {
      return {
        isActivePlayers: true,
        isActiveRegister: false,
        isActiveProfile: false
      }
    },
    methods: {
      goToPath (path) {
        this.$router.push(path)
      },
      viewPlayer (player_id) {
        this.$router.push({ name: 'viewplayer', params: { player_id: player_id }})
      }
    },
    watch: {
      '$route' (to) {
        console.log(to);
        this.isActivePlayers = (to.name === "players");
        this.isActiveRegister = (to.name === "register_init" || to.name === "register_player");
        this.isActiveProfile = (to.name === "viewplayer");
      }
    }
  }

</script>

<style>

  #app {
    font-family: 'HankenLight', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 0;
  }

  .active {
    text-decoration: underline;
  }

  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .15s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
