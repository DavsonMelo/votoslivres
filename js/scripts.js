document.addEventListener('DOMContentLoaded', () => { // Garante que o DOM está carregado
    const startButton = document.querySelector('.neon-btn'); // Seleciona o botão Start

    startButton.addEventListener('click', () => { // Adiciona o ouvinte de eventos
        startButton.disabled = true; // Desativa o botão
        startGame(); // Chama startGame() quando o botão é clicado
    });

    function startGame() {
        const policia = document.querySelector('.policia')
        const picanha = document.querySelector('.picanha');
        const cadeia = document.querySelector('.cadeia');
        const dolares = document.querySelector('.dolares');
        const mario = document.querySelector('.mario');
        const cidade = document.querySelector('.cidade')
        const cidade2 = document.querySelector('.cidade2')

        const restartButton = document.querySelector('.neon-btn'); // Seleciona o botão Restart
        
        const scoreElement = document.getElementById('score');

        const trilhasonora = document.getElementById('supermario');
        const sirene = document.getElementById('sirene')

        const animations = [
            { element: picanha, animationName: 'picanha-animation' },
            { element: cadeia, animationName: 'cadeia-animation' },
            { element: dolares, animationName: 'dolares-animation' },
        ];

        let animationSpeed = 3.2;
        let score = 0;
        let dollarCount = 0;
        let endGame = false;
        let isJumping = false;
        trilhasonora.volume = 0.5;
        sirene.volume = 0.06;

        animatePolicia();
        trilhasonora.play();

        function startAnimation(element, animationName) {
            element.style.animation = 'none';
            void element.offsetWidth;
            element.style.animation = `${animationName} ${animationSpeed}s linear 1`;
        }

        function runAnimations() {
            const randomIndex = Math.floor(Math.random() * animations.length);
            const { element, animationName } = animations[randomIndex];

            startAnimation(element, animationName);

            element.addEventListener('animationend', () => {
                setTimeout(runAnimations, 500);
            }, { once: true });
        }
        function animatePolicia() {
            policia.style.animation = 'none';
            void policia.offsetWidth;
            policia.style.animation = `policia-animation 5s linear 1`; // Ajuste o tempo (2s) conforme necessário
            sirene.play();
          
            policia.addEventListener('animationend', () => {
                sirene.pause();
                setTimeout(animatePolicia, 10000); // Espaçamento de 5 segundos (5000ms)
            }, { once: true });
          }

          let animacaoAtual = 1;
          
          function animateCidade() {
            cidade.style.animation = 'none';
            void cidade.offsetWidth;
            cidade.style.animation = 'cidade-animation 25s linear 1';

            cidade.addEventListener('animationend', () => {
                animacaoAtual = 2; // Próxima animação é a cidade2
                animateCidade2();
            }, { once: true });
          }
          function animateCidade2() {
            cidade2.style.animation = 'none';
            void cidade2.offsetWidth;
            cidade2.style.animation = 'cidade2-animation 25s linear 1';

            cidade2.addEventListener('animationend', () => {
                animacaoAtual = 1; // Próxima animação é a cidade
                animateCidade();
            }, { once: true });
          }
          animateCidade();

        runAnimations(); // Inicia as animações
    }
});