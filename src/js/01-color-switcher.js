const startBtn = document.querySelector('button[data-start]');
const stopBtn =  document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
let color;


startBtn.addEventListener("click", colorChanger);
stopBtn.addEventListener("click", colorChangerStop);


function colorChanger() {
     timerId = setInterval(() => {
        color = getRandomHexColor();
         body.style.backgroundColor = color;
        
  }, 1000);
    startBtn.setAttribute("disabled", "disabled");
}

function colorChangerStop() {
    clearInterval(timerId);
    startBtn.removeAttribute("disabled");
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    
}
