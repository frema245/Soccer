<template>
  <ul class="vuejs-countdown">
    <li v-if="days > 0">
      <p class="digit">{{ days | twoDigits }}</p>
      <p class="text">{{ days > 1 ? 'days' : 'day' }}</p>
    </li>
    <li>
      <p class="digit">{{ hours | twoDigits }}</p>
      <p class="text">{{ hours > 1 ? 'hours' : 'hour' }}</p>
    </li>
    <li>
      <p class="digit">{{ minutes | twoDigits }}</p>
      <p class="text">min</p>
    </li>
    <li>
      <p class="digit">{{ seconds | twoDigits }}</p>
      <p class="text">Sec</p>
    </li>
  </ul>
</template>

<script>
  let interval = null;
  export default {
    name: 'vuejsCountDown',
    props: {
      deadline: {
        type: String
      },
      end: {
        type: String
      },
      stop: {
        type: Boolean
      }
    },
    data() {
      return {
        now: Math.trunc((new Date()).getTime() / 1000),
        date: null,
        diff: 0
      }
    },
    created() {
      if (!this.deadline && !this.end) {
        throw new Error("Missing props 'deadline' or 'end'");
      }
      let endTime = this.deadline ? this.deadline : this.end;
      this.date = Math.trunc(Date.parse(endTime.replace(/-/g, "/")) / 1000);
      if (!this.date) {
        throw new Error("Invalid props value, correct the 'deadline' or 'end'");
      }
      interval = setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
      }, 1000);
    },
    computed: {
      seconds() {
        return Math.trunc(this.diff) % 60
      },
      minutes() {
        return Math.trunc(this.diff / 60) % 60
      },
      hours() {
        return Math.trunc(this.diff / 60 / 60) % 24
      },
      days() {
        return Math.trunc(this.diff / 60 / 60 / 24)
      }
    },
    watch: {
      now(value) {
        this.diff = this.date - this.now;
        if(this.diff <= 0 || this.stop){
          this.diff = 0;
          // Remove interval
          clearInterval(interval);
        }
      }
    },
    filters: {
      twoDigits(value) {
        if ( value.toString().length <= 1 ) {
          return '0'+value.toString()
        }
        return value.toString()
      }
    },
    destroyed() {
      clearInterval(interval);
    }
  }
</script>
<style scoped>

  p {
    color: rgba(255, 250, 252, 0.8);
  }

  li {
    color: rgba(255, 250, 252, 0.8);
  }

  .vuejs-countdown {
    padding: 0;
    margin: 0;
  }
  .vuejs-countdown li {
    display: inline-block;
    margin: 0 16px;
    text-align: center;
    position: relative;
  }
  .vuejs-countdown li p {
    margin: 0;
  }
  .vuejs-countdown li:after {
    content: ":";
    position: absolute;
    top: 0;
    right: -26px;
    font-size: 64px;
  }
  .vuejs-countdown li:first-of-type {
    margin-left: 0;
  }
  .vuejs-countdown li:last-of-type {
    margin-right: 0;
  }
  .vuejs-countdown li:last-of-type:after {
    content: "";
  }
  .vuejs-countdown .digit {
    font-size: 64px;
    font-weight: 1200;
    line-height: 1.4;
    margin-bottom: 0;
  }
  .vuejs-countdown .text {
    text-transform: uppercase;
    margin-bottom: 0;
    font-size: 20px;
  }

  @media screen and (max-width: 500px) {
    .vuejs-countdown li:after {
      font-size: 45px;
      right: -20px;
    }
    .vuejs-countdown .digit {
      font-size: 45px
    }
    .vuejs-countdown .text {
      font-size: 14px
    }
    .vuejs-countdown li {
      margin: 0 10px;
    }
  }
</style>