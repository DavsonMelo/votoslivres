const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");

const jump = () => {
    mario.classList.add("jump")

    setTimeout(() => {
        mario.classList.remove("jump");
    }, 500)
}
document.addEventListener("touchstart", jump)

const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

    const screenWidth = window.innerWidth;
    const pipeThreshold = screenWidth <= 600 ? 60 : 120;
    const marioJumpHeight = screenWidth <= 600 ? 40 : 80;

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

document.addEventListener("keydown", jump)