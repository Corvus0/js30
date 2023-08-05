let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time");

const timer = (secs) => {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + secs * 1000;
  displayTimeLeft(secs);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secsLeft = Math.round((then - Date.now()) / 1000);
    if (secsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secsLeft);
  }, 1000);
};

const padNumber = (num) => {
  return String(num).padStart(2, "0");
};

const displayTimeLeft = (secs) => {
  let remainderSecs = secs;
  const hours = Math.floor(remainderSecs / 3600);
  remainderSecs %= 3600;
  const mins = Math.floor(remainderSecs / 60);
  remainderSecs %= 60;
  const display = `${hours === 0 ? "" : hours + ":"}${padNumber(
    mins
  )}:${padNumber(remainderSecs)}`;
  document.title = display;
  timerDisplay.textContent = display;
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  endTime.textContent = `Be Back At ${padNumber(hour)}:${padNumber(mins)}`;
};

const startTimer = (e) => {
  const seconds = parseInt(e.currentTarget.dataset.time);
  timer(seconds);
};

const handleCustomForm = (e) => {
  e.preventDefault();
  const target = e.currentTarget;
  const mins = target.minutes.value;
  target.reset();
  timer(mins * 60);
};

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", handleCustomForm);
