const slime = document.getElementById('slime');
const obstacle = document.getElementById('obstacle');

const bounceOn = function() {
  slime.classList.add('bounce-effect');
  setTimeout(bounceOff, 500);
}

const bounceOff = function() {
  slime.classList.remove('bounce-effect');
}

document.addEventListener('keydown', function() {
  bounceOn();
})

