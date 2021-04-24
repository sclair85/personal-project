const slime = document.getElementById('slime');
const score = document.getElementById('score');
const obstacle = document.getElementById('obstacle');
const ground = document.querySelector('.ground');
let timer = 0;
let pressed = true;

const bounceOn = function() {
  if(slime.classList === 'animate') {
    return;
  }
  slime.classList.add('bounce-effect');
  setTimeout(bounceOff, 500);
}

const bounceOff = function() {
  slime.classList.remove('bounce-effect');
}

const squash = function() {
  slime.style.background = `url('images/bounce-images/bounce10.png') 0px 0px`;
  slime.style.backgroundSize = `120px`;
  slime.style.width = `120px`;
  slime.style.height = `45px`;
  slime.style.top = `364px`;
  ground.style.top = '364px';
  obstacle.style.top = `140px`;
  bounceOff();
}

const squashOff = function() {
  slime.style.background = `url('images/bounce-images/bounce.png') 0px 0px`;
  slime.style.backgroundSize = `1500px`;
  slime.style.width = `149px`;
  slime.style.height = `149px`;
  slime.style.top = `260px`;
  ground.style.top = '260px';
  obstacle.style.top = `37px`;
}

const scoreTimer = function() {
  timer++;
  score.textContent = `Score: ${timer}`;
}

const keyTimer = function() {
  if (pressed === false) {
    setTimeout(downKeyPress, 1000);
    console.log('time');
  }
}

const downKeyPress = function(event) {
  if (event.keyCode == 32) {
    squash();
    keyTimer();
    pressed = true;
    console.log('keydown');
  }
}

const upKeyPress = function(event) {
  if (event.keyCode === 32) {
    bounceOn();
    squashOff();
    pressed = false;
    console.log('keyup');
  }
}

setInterval(scoreTimer, 100);

document.addEventListener('keydown', downKeyPress);
document.addEventListener('keyup', upKeyPress);

