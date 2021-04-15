const slime = document.getElementById('slime');
const score = document.getElementById('score');
const obstacle = document.getElementById('obstacle');
let timer = 0;

const bounceOn = function() {
  slime.classList.add('bounce-effect');
  setTimeout(bounceOff, 500);
}

const bounceOff = function() {
  slime.classList.remove('bounce-effect');
}


const scoreTimer = function() {
  timer++;
  score.textContent = `Score: ${timer}`;
}

setInterval(scoreTimer, 100);

document.addEventListener('keydown', bounceOn);

