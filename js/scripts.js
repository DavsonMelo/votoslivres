const mario = document.querySelector(".mario"); // Seleciona o elemento com a classe .mario
const pipe = document.querySelector(".pipe"); // Seleciona o elemento com a classe .pipe

// Função que faz o Mario pular
const jump = () => {
    mario.classList.add("jump");

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500);
};

document.addEventListener("touchstart", jump); // Evento de toque para fazer o Mario pular

document.addEventListener("keydown", jump); // Evento de teclado para fazer o Mario pular

document.addEventListener("touchend", () => {
    mario.classList.remove("jump");
});

// Função que atualiza os valores de colisão dinamicamente
const updateCollisionValues = () => {
    const screenWidth = window.innerWidth;
    const pipeThreshold = screenWidth <= 600 ? 90 : 120;
    const marioJumpHeight = screenWidth <= 600 ? 70 : 80;
    return { pipeThreshold, marioJumpHeight };
};

// Função que atualiza a velocidade do cano com base na largura da tela
const updatePipeSpeed = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        pipe.style.animationDuration = "1.5s"; // Mais lento em telas menores
    } else {
        pipe.style.animationDuration = "2s"; // Padrão para telas maiores
    }
};

// Função que atualiza a altura do pulo dinamicamente
const updateJumpHeight = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
        mario.style.setProperty("--jump-height", "250px"); // Maior para telas menores
    } else {
        mario.style.setProperty("--jump-height", "180px"); // Padrão para telas maiores
    }
};

// Ajusta a altura do game-board com base na orientação
const adjustGameBoardHeight = () => {
    const gameBoard = document.querySelector(".game-board");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    let newHeight;

    if (screenWidth > screenHeight) {
        newHeight = Math.max(300, screenHeight * 0.7); // 
    } else {
        newHeight = Math.max(500, screenHeight * 0.7); // 70% da altura da tela
    }
    gameBoard.style.height = `${newHeight}px`; // Ajusta a altura do game-board
};

// Loop principal para verificar colisões
const loop = setInterval(() => {
    const { pipeThreshold, marioJumpHeight } = updateCollisionValues();
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= pipeThreshold && pipePosition > 0 && marioPosition < marioJumpHeight) {
        pipe.style.animation = "none";
        pipe.style.left = `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./images/game-over.png";
        mario.style.width = "110px";
        mario.style.marginLeft = "10px";

        clearInterval(loop);
    }
}, 10);

// Inicializa funções ao carregar a página
updatePipeSpeed();
updateJumpHeight();
adjustGameBoardHeight();

// Atualiza ao redimensionar a tela
window.addEventListener("resize", () => {
    updatePipeSpeed();
    updateJumpHeight();
    adjustGameBoardHeight();
});
