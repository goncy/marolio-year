<template>
  <div class="container" :style="{backgroundImage: `url(${stepImage})`}">
    <div v-if="finished">Felíz año nuevo!1!!!</div>
    <div v-else>{{ formatedCountdown }}</div>
    <audio ref="audio" src="../assets/theme.mp3"></audio>
  </div>
</template>

<script>
import dayjs from 'dayjs'

const NEW_YEAR = dayjs('20190101 00:00:00').format('YYYYMMDD h:mm:s')
const SONG_START = 24

const date = {
  limit: dayjs(NEW_YEAR.valueOf()),
  get countdown() {
    const actualStamp = dayjs().valueOf()
    return this.limit.diff(actualStamp)
  },
  set countdown(limit) {
    this.limit = limit
  },
}

export default {
  name: 'app',
  data() {
    return {
      countdown: date.countdown,
      finished: date.countdown.valueOf() <= 1000,
      played: false,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      const miliseconds = date.countdown.valueOf()

      this.countdown = date.countdown
      this.finished = miliseconds <= 0

      if (miliseconds <= SONG_START * 1000 + 1000 && !this.played) {
        this.$refs.audio.play()
        this.played = true
      }
    }, 1000)
  },
  methods: {
    formatedCountdown() {
      return `${this.countdown.days()} días ${this.countdown.hours()} horas ${this.countdown.minutes()} minutos ${this.countdown.seconds()} segundos`
    },
    stepImage() {
      const days = this.countdown.days()
      const hours = this.countdown.hours()
      const minutes = this.countdown.minutes()
      const seconds = this.countdown.seconds()

      if (days > 1) {
        return '../assets/one.png'
      } else if (hours <= 24 && hours > 12) {
        return '../assets/two.png'
      } else if (hours <= 12 && hours > 6) {
        return '../assets/three.png'
      } else if (hours <= 6 && minutes >= 0 && seconds > SONG_START) {
        return '../assets/four.png'
      } else if (seconds <= SONG_START && seconds > 0) {
        return '../assets/logo.jpg'
      } else {
        return '../assets/newyear.jpg'
      }
    },
  },
}
</script>

<style lang="css">
.container {
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  font-size: 2rem;
  text-align: center;
  color: white;
  text-shadow: 0px 0px 2px black;
}
</style>
