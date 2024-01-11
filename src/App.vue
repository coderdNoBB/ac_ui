<template>
  <div>
    <div class="alien-clock p-4 border border-green-500 rounded mb-8">
      <h2 class="text-xl font-semibold mb-2">Current Alien Time:</h2>
      <p class="text-lg">
        {{ alienClock.year }}/{{ alienClock.month }}/{{ alienClock.day }}
        {{ alienClock.hour }}:{{ alienClock.minute }}:{{ alienClock.second }}
      </p>
    </div>
    <div class="alien-clock p-4 border border-green-500 rounded mb-8">
      <h2 class="text-xl font-semibold mb-2">Current Earth Time:</h2>
      <p class="text-lg">{{ earthDateTime }}</p>
    </div>
    <div class="user-input alien-clock p-4 border border-blue-500 rounded">
      <DateTimeInput :userInput="userInput" :setDateAndTime="setDateAndTime" />
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { AlienClock } from "@/services/AlienClock.js";
import DateTimeInput from "@/components/DateTimeInput.vue";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      alienClock: new AlienClock(2000, 10, 2, 0, 0, 0),
      userInput: {
        year: null,
        month: null,
        day: null,
        hour: null,
        minute: null,
        second: null,
      },
      earthDateTime: "",
    };
  },
  methods: {
    async fetchAlienClock() {
      try {
        const response = await axios.get(
          "http://localhost:8080/alien-clock/currentTime"
        );
        if (response)
          this.alienClock = new AlienClock(
            response.data.year,
            response.data.month,
            response.data.day,
            response.data.hour,
            response.data.minute,
            response.data.second
          );
        Object.assign(this.userInput, this.alienClock.getCurrentTime());
      } catch (error) {
        console.error("Error fetching Alien Clock data:", error);
      }
    },
    async fetchEarthClock() {
      const response = await axios.get(
        "http://localhost:8080/alien-clock/convertToEarthTime"
      );
      if (response) this.earthDateTime = response.data;
    },
    setDateAndTime() {
      axios
        .post(
          "http://localhost:8080/alien-clock/setDateAndTime",
          this.userInput
        )
        .then(() => {
          this.fetchAlienClock();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    startIncreaseTime() {
      setInterval(() => {
        this.alienClock.increaseTime();
        this.fetchEarthClock();
      }, 2000);
    },
  },
  mounted() {
    this.fetchAlienClock();
    this.startIncreaseTime();
  },
  components: {
    DateTimeInput,
  },
});
</script>

<style scoped></style>
