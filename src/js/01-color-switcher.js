function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerID = null;
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');
buttonStop.disabled = true;

const onClickStart = () => {
  buttonStart.disabled = true;
  buttonStop.disabled = false;
  timerID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onClickStop = () => {
  clearInterval(timerID);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
};

buttonStart.addEventListener('click', onClickStart);
buttonStop.addEventListener('click', onClickStop);
