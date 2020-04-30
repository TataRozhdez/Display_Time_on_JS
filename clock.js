const getRandomNumber = max => {
  return Math.floor(Math.random() * max);
};

const getRandomColor = () => {
  return `rgb(
    ${getRandomNumber(225)}, 
    ${getRandomNumber(225)}, 
    ${getRandomNumber(225)})
  `;
};

const normalizeTime = (time) => {
  return time < 10 ? `0${time}` : time;
}

const normalizeDay = value => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[value]; 
}

class Clock {
  constructor(mountPoint = document.querySelector('body')) {
    this.mountPoint = mountPoint;
    this.activeMode = 0;
  }

  init() {
    this.render();
    this.attachEvent();
    this.setColors();
    this.renderTime();
    this.startTime();
    this.startStageInterval()
  }

  render() {
    this.container = document.createElement('div');
    this.content = document.createElement('h1');
    
    this.container.classList.add('clock');
    this.content.classList.add('clock_content');

    this.container.appendChild(this.content);
    this.mountPoint.appendChild(this.container);
  }

  setColors() {
    const color = getRandomColor();
    this.container.style.background = color;
    this.content.style.color = color;
  }

  renderTime() {
    let content;
    switch (this.activeMode) {
      case 0:
        content = this.getFull();
        break;
      case 1:
        content = this.getShort();
        break;
      case 2:
        content = this.getDate();
        break;
      default:
        content = this.getFull();
    }
    this.content.textContent = content;
  }

  getFull() {
    const currentDate = new Date();

    const h = normalizeTime(currentDate.getHours());
    const m = normalizeTime(currentDate.getMinutes());
    const s = normalizeTime(currentDate.getSeconds());

    return `${h}:${m}:${s}`;
  }

  getShort() {
    const currentDate = new Date();

    const h = normalizeTime(currentDate.getHours());
    const m = normalizeTime(currentDate.getMinutes());

    return `${h}:${m}`;
  }

  getDate() {
    const currentDate = new Date();

    const date = normalizeTime(currentDate.getDate());
    const day = normalizeDay(currentDate.getDay());
    const year = normalizeTime(currentDate.getFullYear());

    return `${date}/${day}/${year}`;
  }

  startTime() {
    setInterval(() => this.renderTime(), 500);
  }

  startStageInterval() {
    clearInterval(this.timeIntervalId);
    this.timeIntervalId = setInterval(() => this.switchMode(), 5000);
  }

  attachEvent() {
    this.container.addEventListener('click', () => {
      this.switchMode()
    });
  }

  increasMode() {
    if (this.activeMode + 1 < 3) {
      this.activeMode++;
    } else {
      this.activeMode = 0;
    }
  }

  switchMode() {
    this.increasMode();
    this.renderTime();
    this.setColors();
  }
}