const picanha = document.querySelector('.picanha');
const cadeia = document.querySelector('.cadeia');
const dolares = document.querySelector('.dolares');
const mario = document.querySelector('.mario');
const restartButton = document.querySelector('.neon-btn');
const scoreElement = document.getElementById('score');

let score = 0;
let dollarCount = 0;
let endGame = false;

document.addEventListener('DOMContentLoaded', () => {
    restartButton.addEventListener('click', () => {
        location.reload();
    });
});

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        score++; // Incrementa a pontuação a cada salto
        updateScore();

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 700); // Duração da animação de pulo
    }
};

const updateScore = () => {
    scoreElement.textContent = `Pontos: ${score} | Dólares: ${dollarCount}`;
};

const checkCollision = (obstacle) => {
    const obstacleRect = obstacle.getBoundingClientRect();
    const marioRect = mario.getBoundingClientRect();

    if (
        obstacleRect.left < marioRect.right &&
        obstacleRect.right > marioRect.left &&
        obstacleRect.top < marioRect.bottom &&
        obstacleRect.bottom > marioRect.top
    ) {
        if (obstacle === dolares) {
            dollarCount += 100; // Incrementa a contagem de dólares
            updateScore();
        } else {
            endGame = true;
            stopGame();
        }
    }
};

const stopGame = () => {
    animations.forEach(({ element }) => {
        element.style.animation = 'none';
    });
    mario.style.animation = 'none';
    mario.src = 'images/choro.png';
};

const startAnimation = (element, animationName, duration) => {
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = `${animationName} ${duration} linear 1 forwards`;
};

const animations = [
    { element: picanha, animationName: 'picanha-animation', duration: '3s' },
    { element: cadeia, animationName: 'cadeia-animation', duration: '3s' },
    { element: dolares, animationName: 'dolares-animation', duration: '3s' }
];

let currentAnimationIndex = 0;

const runAnimations = () => {
    if (endGame) return;

    const { element, animationName, duration } = animations[currentAnimationIndex];
    startAnimation(element, animationName, duration);

    element.addEventListener('animationend', () => {
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        runAnimations();
    }, { once: true });
};

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

const initGame = () => {
    runAnimations();
    const loop = setInterval(() => {
        animations.forEach(({ element }) => checkCollision(element));
        if (endGame) clearInterval(loop);
    }, 10);
};

const resetGame = () => {
    score = 0;
    dollarCount = 0;
    endGame = false;
    currentAnimationIndex = 0;
    mario.src = 'images/lula.gif'; // Reinicia a imagem do Mario
    updateScore();
    initGame();
};

initGame();