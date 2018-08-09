<template>
  <div>

    <div class="containouter">
      <div class="containinner">
        <img src=".././assets/inverted.png">
      </div>
    </div>

    <div>
      <Countdown style="text-align: center" end="September 30, 2018"></Countdown>
    </div>

    <!-- Begin MailChimp Signup Form -->
    <form action="https://smartsportsrecruitment.us19.list-manage.com/subscribe/post?u=0b2dca43adbe5b3f6a900da86&amp;id=30c6eeec60" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>

    <div class="container-small" style="margin-top: 50px">

      <p>Get notified when we launch!</p>

        <div id="mc_embed_signup" class="row justify-content-center">

            <div class="col-sm col-10">
              <div id="mc_embed_signup_scroll">

                <input type="email" value="" name="EMAIL" class="email form-control" id="mce-EMAIL" placeholder="email address" required>
                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0b2dca43adbe5b3f6a900da86_30c6eeec60" tabindex="-1" value=""></div>

              </div>
            </div>
            <div class="col-sm-auto col-auto mt-2 mt-sm-0">
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="btn btn-primary align-self-center">
            </div>
        </div>
    </div>

  </form>


    <!--End mc_embed_signup-->
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

  p {
    font-family: 'HankenLight', sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: xx-large;
    color: rgba(255, 250, 252, 0.8);
    text-align: center;
  }

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
    padding: 30px 10px 30px 10px;
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

</style>
