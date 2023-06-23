function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const timerID = null;

const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

const onClickStart = () => {
  button.disabled = true;
  timerID = setTimeout(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

const onClickStop = () => {
  clearTimeout(timerID);
  button.disabled = false;
};

buttonStart.addEventListener('click', onClickStart);
buttonStop.addEventListener('click', onClickStop);
