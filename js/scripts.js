document.addEventListener('DOMContentLoaded', () => { // Garante que o DOM está carregado
    const startButton = document.querySelector('.neon-btn'); // Seleciona o botão Start

    const urlParams = new URLSearchParams(window.location.search);
    const restart = urlParams.get('restart');

    if (restart === 'true') {
        window.history.replaceState({}, document.title, window.location.pathname);
        
        startButton.disabled = true;
        startGame();
    }

    startButton.addEventListener('click', () => { // Adiciona o ouvinte de eventos ao botão Start
        startButton.disabled = true; // Desativa o botão Start após ser clicado
        startGame(); // Chama a função startGame() quando o botão é clicado
    });

    function startGame() {
        // Agrupa as seleções de elementos em um único objeto
        const elements = {
            policia: document.querySelector('.policia'), // Seleciona o elemento policia
            picanha: document.querySelector('.picanha'), // Seleciona o elemento picanha
            cadeia: document.querySelector('.cadeia'), // Seleciona o elemento cadeia
            dolares: document.querySelector('.dolares'), // Seleciona o elemento dolares
            mario: document.querySelector('.mario'), // Seleciona o elemento mario
            cidade: document.querySelector('.cidade'), // Seleciona o elemento cidade
            cidade2: document.querySelector('.cidade2'), // Seleciona o elemento cidade2
            restartButton: document.querySelector('.neon-btn'), // Seleciona o botão Restart
            scoreElement: document.getElementById('score'), // Seleciona o elemento de pontuação
            trilhasonora: document.getElementById('supermario'), // Seleciona o elemento de áudio da trilha sonora
            sirene: document.getElementById('sirene') // Seleciona o elemento de áudio da sirene
        };

        const animations = [
            { element: elements.picanha, animationName: 'picanha-animation' }, // Define a animação para picanha
            { element: elements.cadeia, animationName: 'cadeia-animation' }, // Define a animação para cadeia
            { element: elements.dolares, animationName: 'dolares-animation' }, // Define a animação para dolares
        ];

        let animationSpeed = 3.2; // Define a velocidade padrão das animações
        let score = 0; // Inicializa a pontuação
        let dollarCount = 0; // Inicializa a contagem de dólares
        let endGame = false; // Inicializa o estado do jogo como não terminado
        let isJumping = false; // Inicializa o estado de pulo como falso
        elements.trilhasonora.volume = 0.5; // Define o volume da trilha sonora
        elements.sirene.volume = 0.06; // Define o volume da sirene

        animatePolicia(); // Inicia a animação da polícia
        elements.trilhasonora.play(); // Reproduz a trilha sonora

        function startAnimation(element, animationName) {
            element.style.animation = 'none'; // Remove qualquer animação existente
            void element.offsetWidth; // Força um reflow para resetar a animação
            element.style.animation = `${animationName} ${animationSpeed}s linear 1`; // Define a nova animação
        }

        function runAnimations() {
            const randomIndex = Math.floor(Math.random() * animations.length); // Seleciona uma animação aleatória
            const { element, animationName } = animations[randomIndex]; // Obtém o elemento e o nome da animação

            startAnimation(element, animationName); // Inicia a animação

            element.addEventListener('animationend', () => {
                setTimeout(runAnimations, 500); // Reinicia a animação após um intervalo de 500ms
            }, { once: true });
        }

        function animatePolicia() {
            elements.policia.style.animation = 'none'; // Remove qualquer animação existente
            void elements.policia.offsetWidth; // Força um reflow para resetar a animação
            elements.policia.style.animation = `policia-animation 5s linear 1`; // Define a animação da polícia
            elements.sirene.play(); // Reproduz a sirene
          
            elements.policia.addEventListener('animationend', () => {
                elements.sirene.pause(); // Pausa a sirene quando a animação termina
                setTimeout(animatePolicia, 10000); // Reinicia a animação da polícia após 10 segundos
            }, { once: true });
        }

        let animacaoAtual = 1; // Inicializa a variável de controle de animação
        function animateCidade() {
            elements.cidade.style.animation = 'none'; // Remove qualquer animação existente
            void elements.cidade.offsetWidth; // Força um reflow para resetar a animação
            elements.cidade.style.animation = 'cidade-animation 25s linear 1'; // Define a animação da cidade

            elements.cidade.addEventListener('animationend', () => {
                animacaoAtual = 2; // Define a próxima animação como cidade2
                animateCidade2(); // Inicia a animação da cidade2
            }, { once: true });
        }

        function animateCidade2() {
            elements.cidade2.style.animation = 'none'; // Remove qualquer animação existente
            void elements.cidade2.offsetWidth; // Força um reflow para resetar a animação
            elements.cidade2.style.animation = 'cidade2-animation 25s linear 1'; // Define a animação da cidade2

            elements.cidade2.addEventListener('animationend', () => {
                animacaoAtual = 1; // Define a próxima animação como cidade
                animateCidade(); // Inicia a animação da cidade
            }, { once: true });
        }

        animateCidade(); // Inicia a animação da cidade

        runAnimations(); // Inicia as animações dos elementos

        function jump() {
            if (!elements.mario.classList.contains('jump')) {
                elements.mario.classList.add('jump');
                isJumping = true;

                setTimeout(() => {
                    const jumpedOverPicanha = checkJumpOver(elements.picanha);
                    const jumpedOverCadeia = checkJumpOver(elements.cadeia);
        
                    if (jumpedOverPicanha || jumpedOverCadeia) {
                        score++; // Incrementa a pontuação
                        updateScore();
                    }
                }, 350); // Verifica no meio do pulo

                setTimeout(() => {
                    elements.mario.classList.remove('jump');
                    isJumping = false;
                }, 700); // Duração da animação de pulo
            }
        }
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                jump();
            }
        });

        function checkCollision(element) {
            const marioRect = elements.mario.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();

            if (
                elementRect.left < marioRect.right &&
                elementRect.right > marioRect.left &&
                elementRect.top < marioRect.bottom &&
                elementRect.bottom > marioRect.top
            ) {
                if (element === elements.picanha || element === elements.cadeia) {
                    endGame = true;
                    stopGame(); 
                }else if (element === elements.dolares && isJumping) {
                    endGame = true;
                    stopGame();
                }
            }
        }

        function stopGame() {
            animations.forEach(({ element }) => {
                element.style.animation = 'none';
            });
            elements.mario.style.animation = 'none';
            elements.mario.src = 'images/choro.png';
            elements.trilhasonora.pause(); // Pausa a trilha sonora
            elements.trilhasonora.currentTime = 0; // Reinicia a trilha sonora

            document.getElementById('gameOverModal').style.display = 'block';

        }

        const loop = setInterval(() => {
            animations.forEach(({ element }) => checkCollision(element));
            if (endGame) clearInterval(loop);
        }, 10);
    }

    function resetGame() {
        location.reload(); // Recarrega a página para reiniciar o jogo
    }
    document.getElementById('restartGame').addEventListener('click', () => {
        window.location.href = window.location.pathname + "?restart=true"; // Recarrega a página com o parâmetro

    });

    // Remova o ouvinte de eventos de resetGame
    // startButton.addEventListener('click', resetGame); 
});