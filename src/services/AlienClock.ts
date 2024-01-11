export class AlienClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;

  constructor(
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number
  ) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  increaseTime(): void {
    this.second++;
    if (this.second >= 90) {
      this.second = 0;
      this.minute++;
      if (this.minute >= 90) {
        this.minute = 0;
        this.hour++;
        if (this.hour >= 36) {
          this.hour = 0;
          this.day++;
          if (this.day >= this.getDaysInMonth()) {
            this.day = 1;
            this.month++;
            if (this.month > 18) {
              this.month = 1;
              this.year++;
            }
          }
        }
      }
    }
  }

  getCurrentTime(): AlienTime {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
    };
  }

  getDaysInMonth(): number {
    const daysInMonth = [
      44, 42, 48, 40, 48, 44, 40, 44, 42, 40, 40, 42, 44, 48, 42, 40, 44, 38,
    ];
    return daysInMonth[this.month - 1];
  }
}

interface AlienTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}
