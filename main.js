const NEW_YEAR = moment('20200101 00:00:00', 'YYYYMMDD h:mm:s')
const SONG_START = 24

const date = {
  limit: NEW_YEAR.valueOf(),
  get countdown() {
    return moment.duration(this.limit - moment().valueOf())
  },
  set countdown(limit) {
    this.limit = limit
  }
}

window.app = new Vue({
  el: '#app',
  data: {
    countdown: date.countdown,
    finished: date.countdown.valueOf() <= 1000,
    played: false
  },
  mounted() {
    this.interval = setInterval(() => {
      const miliseconds = date.countdown.valueOf()

      this.countdown = date.countdown
      this.finished = miliseconds <= 0

      if (miliseconds <= (SONG_START * 1000) + 1000 && !this.played) {
        this.$refs.audio.play()
        this.played = true
      }
    }, 1000)
  },
  computed: {
    formatedCountdown() {
      return `${this.countdown.days()} días ${this.countdown.hours()} horas ${this.countdown.minutes()} minutos ${this.countdown.seconds()} segundos`
    },
    stepImage() {
      const days = this.countdown.days()
      const hours = this.countdown.hours()
      const minutes = this.countdown.minutes()
      const seconds = this.countdown.seconds()

      if (days > 1) {
        return "./assets/one.png"
      } else if (hours <= 24 && hours > 12) {
        return "./assets/two.png"
      } else if (hours <= 12 && hours > 6) {
        return "./assets/three.png"
      } else if (hours <= 6 && minutes >= 0 && seconds > SONG_START) {
        return "./assets/four.png"
      } else if (seconds <= SONG_START && seconds > 0) {
        return "./assets/logo.jpg"
      } else {
        return "./assets/newyear.jpg"
      }
    }
  }
})
