// lib/Countdown.ts
export class Countdown {
  private duration: number;
  private timeLeft: number;
  private timer: NodeJS.Timeout | null = null;
  private onTick?: (time: number) => void;
  private onComplete?: () => void;

  constructor(duration: number, onTick?: (time: number) => void, onComplete?: () => void) {
    this.duration = duration;
    this.timeLeft = duration;
    this.onTick = onTick;
    this.onComplete = onComplete;
  }

  start() {
    if (this.timer) return; // already running

    this.timer = setInterval(() => {
      this.timeLeft -= 1;

      if (this.onTick) {
        this.onTick(this.timeLeft);
      }

      if (this.timeLeft <= 0) {
        this.stop();
        if (this.onComplete) {
          this.onComplete();
        }
      }
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset() {
    this.stop();
    this.timeLeft = this.duration;
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  formatTime() {
    const mins = Math.floor(this.timeLeft / 60);
    const secs = this.timeLeft % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }
}