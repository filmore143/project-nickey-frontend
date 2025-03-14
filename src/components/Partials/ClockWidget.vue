<template>
  <div id="clock">
    <div
      class="date text-weight-light"
      :class="`clock-date-${this.currentScreen}`"
    >
      {{ date }}
    </div>
    <div
      class="time text-weight-medium"
      :class="`clock-time-${this.currentScreen}`"
    >
      {{ time }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
  name: "ClockWidget",
  data() {
    return {
      time: "",
      date: "",
      week: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
      month: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
    };
  },
  created() {
    this.updateTime();
  },
  computed: {
    ...mapGetters({
      currentScreen: "helpers/currentScreen",
    }),
  },
  methods: {
    updateTime() {
      var cd = new Date();
      let hour = cd.getHours();
      let ampm = "AM";
      if (hour > 12) {
        hour -= 12;
        ampm = "PM";
      }
      this.time =
        this.zeroPadding(hour, 2) +
        ":" +
        this.zeroPadding(cd.getMinutes(), 2) +
        ":" +
        this.zeroPadding(cd.getSeconds(), 2) +
        " " +
        ampm;

      this.date =
        this.zeroPadding(cd.getFullYear(), 4) +
        " | " +
        this.month[cd.getMonth()] +
        " | " +
        this.zeroPadding(cd.getDate(), 2) +
        " | " +
        this.week[cd.getDay()];
      setTimeout(() => {
        this.updateTime();
      }, 1000);
    },
    zeroPadding(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
});
</script>

<style>
#clock {
  text-align: center;
  /* color: #daf6ff; */
  /* text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0); */
}

.time {
  letter-spacing: 0.05em;
}
.date {
  letter-spacing: 0.1em;
}
</style>
