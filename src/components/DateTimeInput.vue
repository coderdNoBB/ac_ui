<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Set Date and Time:</h2>
    <form @submit.prevent="submitForm">
      <div class="flex items-center mb-4">
        <label for="year" class="mr-2">Year:</label>
        <input
          v-model="userInput.year"
          type="number"
          id="year"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.year"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.year }}
        </p>
      </div>

      <div class="flex items-center mb-4">
        <label for="month" class="mr-2">Month:</label>
        <input
          v-model="userInput.month"
          type="number"
          id="month"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.month"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.month }}
        </p>
      </div>

      <div class="flex items-center mb-4">
        <label for="day" class="mr-2">Day:</label>
        <input
          v-model="userInput.day"
          type="number"
          id="day"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.day"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.day }}
        </p>
      </div>

      <div class="flex items-center mb-4">
        <label for="hour" class="mr-2">Hour:</label>
        <input
          v-model="userInput.hour"
          type="number"
          id="hour"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.hour"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.hour }}
        </p>
      </div>

      <div class="flex items-center mb-4">
        <label for="minute" class="mr-2">Minute:</label>
        <input
          v-model="userInput.minute"
          type="number"
          id="minute"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.minute"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.minute }}
        </p>
      </div>

      <div class="flex items-center mb-4">
        <label for="second" class="mr-2">Second:</label>
        <input
          v-model="userInput.second"
          type="number"
          id="second"
          required
          @input="validateDateTimes"
          class="w-16 border border-gray-300 p-1"
        />
        <p
          v-if="errors.second"
          class="text-red-500 mt-2 block whitespace-pre-line"
        >
          {{ errors.second }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="false"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { AlienClock } from "@/services/AlienClock.js";
export default {
  props: {
    userInput: Object,
    setDateAndTime: Function,
  },
  data() {
    return {
      errors: {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        second: "",
      },
    };
  },
  computed: {},
  methods: {
    validateDateTimes() {
      const yearValue = parseInt(this.userInput.year);
      const monthValue = parseInt(this.userInput.month);
      const dayValue = parseInt(this.userInput.day);
      const hourValue = parseInt(this.userInput.hour);
      const minValue = parseInt(this.userInput.minute);
      const secValue = parseInt(this.userInput.second);
      this.errors.year =
        !isNaN(yearValue) && yearValue >= 0
          ? ""
          : "Invalid year, must be greater or equal to 0";
      this.errors.minute =
        !isNaN(minValue) && minValue >= 0 && minValue <= 89
          ? ""
          : "Invalid minute, must be 0-89";
      this.errors.hour =
        !isNaN(hourValue) && hourValue >= 0 && hourValue <= 35
          ? ""
          : "Invalid hour, must be 0-35";
      this.errors.second =
        !isNaN(secValue) && secValue >= 0 && secValue <= 89
          ? ""
          : "Invalid second, must be 0-89";
      this.errors.month =
        !isNaN(monthValue) && monthValue >= 1 && monthValue <= 18
          ? ""
          : "Invalid month, must be 1-18";
      const onlyMonth = new AlienClock(0, monthValue, 0, 0, 0, 0);
      const days = onlyMonth.getDaysInMonth();
      this.errors.day =
        !isNaN(dayValue) && dayValue >= 1 && dayValue <= days
          ? ""
          : `Invalid day, must be 1-${days} `;

      return (
        !this.errors.year &&
        !this.errors.month &&
        !this.errors.day &&
        !this.errors.hour &&
        !this.errors.minute &&
        !this.errors.secod
      );
    },

    submitForm() {
      if (this.validateDateTimes()) {
        this.setDateAndTime();
      } else {
        console.log("Form is invalid. Please check your input.");
      }
    },
  },
};
</script>

<style scoped></style>
