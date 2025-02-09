const picanha = document.querySelector('.picanha');
const cadeia = document.querySelector('.cadeia');
const dolares = document.querySelector('.dolares');
const mario = document.querySelector('.mario');
const restartButton = document.querySelector('.neon-btn');
const scoreElement = document.getElementById('score');
const supermario = document.getElementById('supermario')

const animations = [
    { element: picanha, animationName: 'picanha-animation' },
    { element: cadeia, animationName: 'cadeia-animation' },
    { element: dolares, animationName: 'dolares-animation' }
];

let animationSpeed = 3; // Tempo padrão em segundos
let score = 0;
let dollarCount = 0;
let endGame = false;
let isJumping = false;

const startAnimation = (element, animationName) => {
    element.style.animation = 'none';
    void element.offsetWidth; // Força um reflow para resetar a animação
    element.style.animation = `${animationName} ${animationSpeed}s linear 1`;
};

const runAnimations = () => {
    const randomIndex = Math.floor(Math.random() * animations.length);
    const { element, animationName } = animations[randomIndex];

    // startAnimation(element, animationName);

    element.addEventListener('animationend', () => {
        setTimeout(runAnimations, 500); // Pequeno intervalo entre animações
    }, { once: true });
};

// Função para mudar a velocidade da animação dinamicamente
const setAnimationSpeed = (speed) => {
    animationSpeed = speed;
    // Reinicia as animações com a nova velocidade
    animations.forEach(({ element, animationName }) => {
        startAnimation(element, animationName);
    });
};

const checkCollision = (element) => {
    const marioRect = mario.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    if (
        elementRect.left < marioRect.right &&
        elementRect.right > marioRect.left &&
        elementRect.top < marioRect.bottom &&
        elementRect.bottom > marioRect.top
    ) {
        if (element === picanha || element === cadeia) {
            endGame = true;
            stopGame(); 
        }else if (element === dolares && isJumping) {
            endGame = true;
            stopGame();
        }
    }
};

const updateScore = () => {
    scoreElement.textContent = `Pontos: ${score} | Dólares: ${dollarCount}`;
};

const stopGame = () => {
    animations.forEach(({ element }) => {
        element.style.animation = 'none';
    });
    mario.style.animation = 'none';
    mario.src = 'images/choro.png';
};

const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');
        isJumping = true;

        // Verifica se o Mário pulou sobre .picanha ou .cadeia no meio do pulo
        setTimeout(() => {
            const jumpedOverPicanha = checkJumpOver(picanha);
            const jumpedOverCadeia = checkJumpOver(cadeia);

            if (jumpedOverPicanha || jumpedOverCadeia) {
                score++; // Incrementa a pontuação
                updateScore();
            }
        }, 350); // Verifica no meio do pulo

        setTimeout(() => {
            mario.classList.remove('jump');
            isJumping = false;
        }, 700); // Duração da animação de pulo
    }
};


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

const loop = setInterval(() => {
    animations.forEach(({ element }) => checkCollision(element));
    checkPassedDolares(); // Chama a função de verificação

    if (endGame) clearInterval(loop);
}, 10);

const resetGame = () => {
    score = 0;
    dollarCount = 0;
    endGame = false;
    initGame();
};

document.addEventListener('DOMContentLoaded', () => {
    restartButton.addEventListener('click', () => {
        startAnimation(element, animationName);
    });
});

runAnimations();

const checkJumpOver = (element) => {
    const marioRect = mario.getBoundingClientRect(); // Obtém a posição do Mário
    const elementRect = element.getBoundingClientRect(); // Obtém a posição do elemento

    // Verifica se o Mário está acima do elemento e se o elemento está na área do pulo
    return (
        marioRect.bottom < elementRect.top && // Mário está acima do elemento
        marioRect.right > elementRect.left && // Mário está à direita do elemento
        marioRect.left < elementRect.right // Mário está à esquerda do elemento
    );
};

let dollarCollected = false; // Variável para evitar múltiplas contagens
let lastDollarLeft = false; // Variável para rastrear se o Dólares saiu da tela

const checkPassedDolares = () => {
    const marioRect = mario.getBoundingClientRect();
    const dolaresRect = dolares.getBoundingClientRect();

    // Verifica se Mario passou pelo Dólares sem pular
    if (
        !isJumping && // Mario não está pulando
        dolaresRect.right < marioRect.left &&// Mario já passou pelo Dólares
        !lastDollarLeft
    ) {
        dollarCount += 100; // Adiciona 100 dólares
        updateScore();
        lastDollarLeft = true; // Evita múltiplas contagens para o mesmo dólar
    }
    if (dolaresRect.right > window.innerWidth) {
        lastDollarLeft = false;
    }
};

const marcaPontos = () => {
    if (isJumping && !endGame) {
        const marioRect = mario.getBoundingClientRect();

        // Verifica se o Mário está no chão (altura original do Mário)
        const isOnGround = marioRect.bottom == 13;

        const jumpedOverPicanha = checkJumpOver(picanha);
        const jumpedOverCadeia = checkJumpOver(cadeia);

        if (isOnGround && (jumpedOverPicanha || jumpedOverCadeia)) {
            score++; // Incrementa a pontuação
            updateScore();
        }
    }
}
