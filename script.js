const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const setBtn = document.getElementById("set-timer");
const allTimersDiv = document.getElementById("all-timers");
const timerHeading = document.getElementById("no-timers");
timerHeading.innerText = "You have no timers currently!";
const allTimers = [];

const convertToObj = (hoursValue, minutesValue, secondsValue) => {
  return {
    hoursValue: parseInt(hoursValue),
    minutesValue: parseInt(minutesValue),
    secondsValue: parseInt(secondsValue),
    intervalId: null,
    completed: false,
  };
};

const displayTimers = () => {
  allTimersDiv.innerHTML = "";
  allTimers.forEach((timer, index) => {
    const hours = String(timer.hoursValue).padStart(2, "0");
    const minutes = String(timer.minutesValue).padStart(2, "0");
    const seconds = String(timer.secondsValue).padStart(2, "0");

    let timeDisplay = timer.completed
      ? "Time is up!"
      : `${hours}:${minutes}:${seconds}`;
    let timeUpClass = timer.completed ? "timeUpColor" : "";
    let labelDisplay = timer.completed ? "" : "<p>Timer Left:</p>";

    let HTML = `
          <div class="timer ${timeUpClass}" id="${index}">
              ${labelDisplay}
              <p class="time">${timeDisplay}</p>
              <button class="delete-btn" onclick="removeTimer(${index})">Delete</button>
          </div>
        `;
    allTimersDiv.insertAdjacentHTML("beforeend", HTML);
  });

  timerHeading.innerText =
    allTimers.length === 0 ? "You have no timers currently!" : "";
};

const startTimer = (timer, index) => {
  timer.intervalId = setInterval(() => {
    if (timer.secondsValue > 0) {
      timer.secondsValue--;
    } else if (timer.minutesValue > 0) {
      timer.minutesValue--;
      timer.secondsValue = 59;
    } else if (timer.hoursValue > 0) {
      timer.hoursValue--;
      timer.minutesValue = 59;
      timer.secondsValue = 59;
    } else {
      clearInterval(timer.intervalId);
      timer.completed = true;
      displayTimers();
      return;
    }
    displayTimers();
  }, 1000);
};

const reset = () => {
  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";
};

const removeTimer = (index) => {
  clearInterval(allTimers[index].intervalId);
  allTimers.splice(index, 1);
  displayTimers();
};

setBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const hoursValue = hoursInput.value || "0";
  const minutesValue = minutesInput.value || "0";
  const secondsValue = secondsInput.value || "0";
  const timer = convertToObj(hoursValue, minutesValue, secondsValue);
  allTimers.push(timer);
  startTimer(timer, allTimers.length - 1);
  displayTimers();
  reset();
});

const restrictInput = (input) => {
  input.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
  });
};

restrictInput(hoursInput);
restrictInput(minutesInput);
restrictInput(secondsInput);
