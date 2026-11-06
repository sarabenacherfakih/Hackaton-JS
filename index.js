// 1. Selección de elementos del DOM
const container = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

// 2. Variables de Estado
let playerX = 180;
const playerSpeed = 15;
let score = 0;
let gameOver = false;
let gameInterval;
let bugSpawnInterval;



// 3. Controles del Teclado
document.addEventListener('keydown', (e) => {
  if (gameOver) return;

  if ((e.key === 'ArrowLeft' || e.key === 'a') && playerX > 0) {
    playerX -= playerSpeed;
  }
  if ((e.key === 'ArrowRight' || e.key === 'd') && playerX < container.clientWidth - 40) {
    playerX += playerSpeed;
  }
  
  player.style.left = `${playerX}px`;
});

// 4. Función utilitaria para detectar colisión entre 2 elementos del DOM
function checkCollision(elem1, elem2) {
  const r1 = elem1.getBoundingClientRect();
  const r2 = elem2.getBoundingClientRect();

  return !(
    r1.top > r2.bottom ||
    r1.bottom < r2.top ||
    r1.right < r2.left ||
    r1.left > r2.right
  );
}

// 5. Hacer que el virus baje y comprobar colisión/puntuación
let objetoVirus = document.getElementById('virus');
let posicionY = 0;
let posicionX = 50;
const velocidadCaida = 3;
let puntuacion = document.getElementById("score");
let highScore = document.getElementById("high-score");
// Variables (ponlas antes de la función)
let vidas = 3;
let vidasElemento = document.getElementById("vidas");
let vidaObjeto = document.getElementById("vida");
function moverVirus() {
  // Hacer que baje
  posicionY += velocidadCaida;
  objetoVirus.style.top = posicionY + 'px';
  objetoVirus.style.left = posicionX + 'px';

  // Si choca con el jugador
  if (checkCollision(player, objetoVirus)) {
    vidas--;
    vidasElemento.textContent = vidas;

    // Volver a poner el virus arriba
    posicionY = 0;
    posicionX = Math.random() * 350;

    if (vidas == 0) {
      gameOver = true;
      clearInterval(gameInterval);
      gameOverScreen.classList.remove('hidden');
    }
  }
  // Si llega abajo sin chocar: esquivado
  else if (posicionY > container.clientHeight) {
    puntuacion++;
    scoreEl.textContent = puntuacion;

    if (puntuacion > highScore) {
      highScore = puntuacion;
      highScoreEl.textContent = highScore;
    }

    // Volver a poner el virus arriba
    posicionY = 0;
    posicionX = Math.random() * 350;
  }
}

gameInterval = setInterval(moverVirus, 15);


function moverVida() {
  // Hacer que baje
  posicionY += velocidadCaida;
  vidaObjeto.style.top = posicionY + 'px';
  vidaObjeto.style.left = posicionX + 'px';

  // Si choca con el jugador
  if (checkCollision(player, vidaObjeto)) {
    vidas++;
    vidasElemento.textContent = vidas;

    // Volver a poner el virus arriba
    posicionY = 0;
    posicionX = Math.random() * 350;

    

    // Volver a poner el virus arriba
    posicionY = 0;
    posicionX = Math.random() * 350;
  }
}