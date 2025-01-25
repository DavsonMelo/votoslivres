const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const jump = () => {
    mario.classList.add("jump")

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500)
}
document.addEventListener("touchstart", jump)



const updateCollisionValues = () => {
    const screenWidth = window.innerWidth;
    const pipeThreshold = screenWidth <= 600 ? 90 : 120;
    const marioJumpHeight = screenWidth <= 600 ? 70 : 80;

    return { pipeThreshold, marioJumpHeight };

};const updateJumpHeight = () => {
    const screenWidth = window.innerWidth;

    const updatePipeSpeed = () => {
        const screenWidth = window.innerWidth;
    
        // Ajusta a duração da animação baseado no tamanho da tela
        if (screenWidth <= 600) {
            pipe.style.animationDuration = "1s"; // Mais lento em telas menores
        } else {
            pipe.style.animationDuration = "2s"; // Padrão para telas maiores
        }
    };
    
    // Chame ao carregar a página
    updatePipeSpeed();
    
    // Atualize ao redimensionar a tela
    window.addEventListener("resize", updatePipeSpeed);

    // Ajusta a altura do pulo dependendo da largura da tela
    if (screenWidth <= 600) {
        mario.style.setProperty("--jump-height", "200px"); // Maior para telas menores
    } else {
        mario.style.setProperty("--jump-height", "180px"); // Padrão
    }
};

// Chame ao carregar a página
updateJumpHeight();

const loop = setInterval(() => {
    const { pipeThreshold, marioJumpHeight } = updateCollisionValues();
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    if (pipePosition <= pipeThreshold && pipePosition > 0 && marioPosition < marioJumpHeight) {

        pipe.style.animation = "none";
        pipe.style.left =  `${pipePosition}px`;

        mario.style.animation = "none";
        mario.style.bottom = `${marioPosition}px`;

        mario.src = "./images/game-over.png";
        mario.style.width = "110px";
        mario.style.marginLeft = "10px";

        clearInterval(loop);
    }
    
}, 10);

window.addEventListener("resize", () => {
    const gameBoard = document.querySelector(".game-board");
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Ajuste dinâmico da altura do jogo com base na orientação
    if (screenWidth > screenHeight) {
        gameBoard.style.height = "300px"; // Modo paisagem
    } else {
        gameBoard.style.height = "500px"; // Modo retrato
    }
});

document.addEventListener("keydown", jump)

document.addEventListener("touchend", () => {
    mario.classList.remove("jump");
});