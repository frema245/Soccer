<template>

  <div class="container-small mb-5">
    <h2>Register</h2>
    <form>
      <fieldset>
        <!-- email -->
        <div class="form-group col-auto mx-auto text-left">
          <label class="col-form-label" for="emailInput">Email</label>
          <input type="email" v-model=user.email class="form-control" placeholder="yourmail@something.com" id="emailInput"
                 v-bind:class="[
                   { 'is-valid': is_valid_email },
                   { 'is-invalid': !is_valid_email && is_touched_email}
                   ]"
          >
          <div v-show="is_valid_email" class="valid-feedback">
            Email adress is valid!
          </div>
          <div v-show="!is_valid_email && is_touched_email" class="invalid-feedback">
            Not a valid email adress.
          </div>
        </div>

        <!-- first name -->
        <div class="form-group col-auto mx-auto text-left">
          <label class="col-form-label" for="password">Password</label>
          <input type="password" v-model=user.password class="form-control" id="password"
                 v-bind:class="[
                   { 'is-valid': is_valid_password },
                   { 'is-invalid': !is_valid_password && is_touched_password}
                   ]"
          >
          <div v-show="is_valid_password" class="valid-feedback">
            Password is valid!
          </div>
          <div v-show="!is_valid_password && is_touched_password" class="invalid-feedback">
            Passwords requires at least 8 characters, including at least one lower case letter, one upper case letter, and one special character or number.
          </div>
        </div>

        <div class="form-group col-auto text-left mx-auto">

          <h6>Register as a:</h6>

          <div class="custom-control custom-radio">
            <input value="school" v-model=user.user_type type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
            <label class="custom-control-label" for="customRadio1">School</label>
          </div>
          <div class="custom-control custom-radio">
            <input value="player" v-model=user.user_type type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
            <label class="custom-control-label" for="customRadio2">Player</label>
          </div>

        </div>

        <div class="form-group col-auto mt-3 mx-auto">
          <button v-show="!register_success && all_forms_valid" type="button" @click="register" class="btn btn-secondary">Submit</button>
          <button v-show="register_success" type="button" @click="continueToNext" class="btn btn-primary">Continue</button>

          <transition name="fade">

            <div v-show="register_success" class="alert alert-success mt-3 fade-enter">
              <strong>Congratulations!</strong> You have successfully registered as a <strong>{{user_final.user_type}}</strong>. A confirmation email has been sent to <strong>{{user_final.email}}</strong>.
            </div>

          </transition>

          <transition name="fade">

            <div v-show="emailTaken" class="alert alert-danger mt-3 fade-enter">
              {{user_final.email}} is already registered.
            </div>

          </transition>

        </div>

      </fieldset>
    </form>

  </div>

</template>

<script>
  import RegisterService from '@/services/RegisterService'

  export default {
    name: 'register',
    data () {
      return {
        user: {
          email: '',
          password: '',
          user_type: ''
        },
        user_final: {
          email: '',
          password: '',
          user_type: ''
        },
        register_success: false,
        emailTaken: false,

        is_valid_password: false,
        is_touched_password: false,

        is_valid_email: false,
        is_touched_email: false
      }
    },
    components: {
    },
    methods: {

      async register () {
        console.log("register");

        this.user_final = JSON.parse(JSON.stringify(this.user));
        let self = this;


        RegisterService.add({
          user: this.user
        }).then(function (response) {
          console.log(response);
          console.log(response.data);
          if (!response.data.available) {
            self.emailTaken = true;
          } else {
            self.emailTaken = false;
            self.register_success = true;
          }

        })
          .catch(function (error) {
            console.log(error);
          });

      },

      continueToNext () {
        this.$router.push(`/register/${this.user.user_type}`);
      },
      charLength () {
        if( this.user.password.length >= 8 ) {
          return true;
        }
      },
      lowercase () {
        let regex = /^(?=.*[a-zåäö]).+$/;

        if( regex.test(this.user.password) ) {
          return true;
        }
      },
      uppercase () {
        let regex = /^(?=.*[A-ZÅÄÖ]).+$/;

        if( regex.test(this.user.password) ) {
          return true;
        }
      },
      special () {
        let regex = /^(?=.*[0-9_\W]).+$/;

        if( regex.test(this.user.password) ) {
          return true;
        }
      },
      validateEmail: function () {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.user.email);
      }
    },
    watch: {
      'user.password': function () {
        this.is_touched_password = (this.user.password.length > 0 );
        this.is_valid_password = (this.charLength() && this.lowercase() && this.uppercase() && this.special());
      },
      'user.email': function () {
        this.is_valid_email = (this.validateEmail())
        this.is_touched_email = (this.user.email.length > 0)
      }
    },
    computed: {
      all_forms_valid: function () {
        return (this.is_valid_email && this.is_valid_password && (this.user.user_type.length > 0) );
      }
    }
  }
</script>
<style scoped>

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>

