const picanha = document.querySelector('.picanha');
const cadeia = document.querySelector('.cadeia');
const dolares = document.querySelector('.dolares');
const mario = document.querySelector('.mario');

 /* 
 Aqui, estamos selecionando os elementos com as classes .picanha e .cadeia do HTML e armazenando-os em variáveis (picanha e cadeia).
 Isso nos permite manipular esses elementos depois.
  */

 const jump = () => {
    if (!mario.classList.contains('jump')) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump');
        }, 700); // Duração da animação de pulo
    }
};

// Adiciona o evento de teclado para detectar a tecla Space
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

const animations = [ // Array de animações
    { element: picanha, animationName: 'picanha-animation', duration: '3s' },
    { element: cadeia, animationName: 'cadeia-animation', duration: '3s' },
    { element: dolares, animationName: 'dolares-animation', duration: '3s' }
];
/*
Criamos um array chamado animations, que contém objetos.
Cada objeto tem:
element: O elemento HTML que será animado (picanha ou cadeia).
animationName: O nome da animação definida no CSS (picanha-animation ou cadeia-animation).
duration: O tempo que a animação dura (5s).
*/

let currentAnimationIndex = 0;
/*
Criamos uma variável chamada currentAnimationIndex, que guarda o índice da animação atual.
Como os índices dos arrays começam em 0, ele inicia com 0 (ou seja, a animação da picanha será a primeira).
*/

const startAnimation = (element, animationName, duration) => { // 
    // Reseta a animação para permitir reiniciar
    element.style.animation = 'none'; // Reseta a animação
    void element.offsetWidth; // Força um reflow para resetar a animação    
    element.style.animation = `${animationName} ${duration} linear 1 forwards`; // Inicia a animação
};
/*
O que essa função faz?
Parâmetros: Recebe um elemento (element), o nome da animação (animationName) e a duração (duration).
Reseta a animação: Define element.style.animation = 'none'; para remover qualquer animação anterior.
Força um "reflow" no navegador: void element.offsetWidth; faz com que o navegador recalcule o layout, garantindo que a animação possa reiniciar.
Aplica a animação: Define animation com os valores recebidos (animationName, duration, linear, etc.).
Isso impede que o navegador ignore animações repetidas!
*/

const runAnimations = () => { // Função para rodar as animações
    const { element, animationName, duration } = animations[currentAnimationIndex];
    /*
    Essa função pega a animação atual do array animations usando o índice currentAnimationIndex.
    */

    startAnimation(element, animationName, duration);
    /*
    Chama a função startAnimation() para iniciar a animação no elemento atual.
    */

    element.addEventListener('animationend', () => {
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        runAnimations();
    }, { once: true });
};
/*
O que acontece aqui?
Aguarda o fim da animação → Quando a animação termina, executamos um código.
Troca para a próxima animação:
Isso soma 1 ao índice (currentAnimationIndex + 1).
O operador % (módulo) faz com que, quando chegarmos na última animação, o índice volte para 0, criando um loop infinito.
Chama runAnimations() novamente → Faz com que a próxima animação comece.
A opção { once: true } no addEventListener garante que o evento seja chamado apenas uma vez, evitando múltiplas execuções.
*/

runAnimations();
/*
Aqui, chamamos runAnimations() pela primeira vez, dando início ao loop das animações.
*/