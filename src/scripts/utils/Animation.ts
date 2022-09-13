import App from "../App";

export default class Animation {
  app: App;

  constructor() {
    this.app = new App();
  }

  linearAnimation(amplitude: number, secs: number) {
    const deltaMs = this.app.time.delta;
    const deltaSecs = deltaMs / 1000;
    return (deltaSecs * amplitude) / secs;
  }

  sinusAnimation(totalSecs: number) {
    const secondsElapsed = this.app.time.secondsElapsed;
    return Math.sin((secondsElapsed * 2 * Math.PI) / totalSecs);
  }
}
