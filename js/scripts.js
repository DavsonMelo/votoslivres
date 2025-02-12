// import firebaseConfig from './firebase-config.js';

    // firebase.initializeApp(firebaseConfig);
    // const db = firebase.database();


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
            // IMAGENS
            picanha: document.querySelector('.picanha'), // Seleciona o elemento picanha
            cadeia: document.querySelector('.cadeia'), // Seleciona o elemento cadeia
            dolares: document.querySelector('.dolares'), // Seleciona o elemento dolares
            cervejinha: document.querySelector('.cervejinha'),
            cidade: document.querySelector('.cidade'), // Seleciona o elemento cidade
            cidade2: document.querySelector('.cidade2'), // Seleciona o elemento cidade2
            restartButton: document.querySelector('.neon-btn'), // Seleciona o botão Restart
            scoreElement: document.getElementById('score'), // Seleciona o elemento de pontuação
            inflacao: document.querySelector('.inflacao'), // Seleciona o elemento inflacao
            // GIFS
            policia: document.querySelector('.policia'), // Seleciona o elemento policia
            mario: document.querySelector('.mario'), // Seleciona o elemento mario
            // AUDIOS
            trilhasonora: document.getElementById('supermario'), // Seleciona o elemento de áudio
            sirene: document.getElementById('sirene'), // Seleciona o elemento de áudio da sirene
            porfavor: document.getElementById('porfavor'),
            umchurrasquinho: document.getElementById('um-churrasquinho'),
            cervejagelada: document.getElementById('cervejagelada'),
            audiocadeia: document.getElementById('audiocadeia'),
            granaprobolso: document.getElementById('granaprobolso'),
            tacaro: document.getElementById('tacaro'),
        };

        const animations = [
            { element: elements.picanha, animationName: 'picanha-animation' },
            { element: elements.cadeia, animationName: 'cadeia-animation' },
            { element: elements.dolares, animationName: 'dolares-animation' },
            { element: elements.cervejinha, animationName: 'cervejinha-animation' },
            { element: elements.inflacao, animationName: 'inflacao-animation' },
        ];

        let animationSpeed = 3; // Define a velocidade padrão das animações
        let score = 0; // Inicializa a pontuação
        let endGame = false; // Inicializa o estado do jogo como não terminado
        let isJumping = false; // Inicializa o estado de pulo como falso
        elements.trilhasonora.volume = 0.5; // Define o volume da trilha sonora
        elements.sirene.volume = 0.04; // Define o volume da sirene
        elements.porfavor.volume = 0.8;
        elements.umchurrasquinho.volume = 1;
        elements.cervejagelada.volume = 1;
        elements.audiocadeia.volume = 1;
        elements.granaprobolso.volume = 1;
        elements.tacaro.volume = 1;

        animatePolicia(); // Inicia a animação da polícia
        elements.trilhasonora.pause();   // Pausa qualquer áudio que esteja tocando
        elements.trilhasonora.currentTime = 0;
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
                    let jumpedElement = null;
                    
                    if(checkJumpOver(elements.picanha)) {
                        jumpedElement = "picanha";
                    }else if(checkJumpOver(elements.cadeia)) {
                        jumpedElement = "cadeia";
                    }else if(checkJumpOver(elements.dolares)) {
                        jumpedElement = "dolares";
                    }else if(checkJumpOver(elements.cervejinha)) {
                        jumpedElement = "cervejinha";
                    }else if(checkJumpOver(elements.inflacao)) {
                        jumpedElement = "inflacao";
                    }
                    if(jumpedElement) {
                        score++;
                        updateScore();

                        switch(jumpedElement) {
                            case "picanha":
                                elements.umchurrasquinho.play();
                                break;
                            case "cadeia":
                                elements.audiocadeia.play();
                                break;
                            case "dolares":
                                elements.granaprobolso.play();
                                break;
                            case "cervejinha":
                                elements.cervejagelada.play();
                                break;
                                case "inflacao":
                                    elements.tacaro.play();
                                    break;
                                    
                        }
                    }

                }, 350); // Verifica no meio do pulo

                setTimeout(() => {
                    elements.mario.classList.remove('jump');
                    isJumping = false;
                }, 700); // Duração da animação de pulo
            }
        }

        function checkJumpOver(element) {
            const marioRect = elements.mario.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
        
            return (
                marioRect.bottom < elementRect.top &&  // Mario passou acima do elemento
                elementRect.left < marioRect.right &&  // O elemento está à esquerda de Mario
                elementRect.right > marioRect.left     // O elemento está à direita de Mario
            );
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
                if (
                    element === elements.picanha || 
                    element === elements.cadeia || 
                    element === elements.dolares || 
                    element === elements.cervejinha ||
                    element === elements.inflacao
                ) {
                    endGame = true;
                    stopGame(); 
                }
            }
        }

        function updateScore() {
            elements.scoreElement.textContent = `Pontuação: ${score}`;
        }

        function stopGame() {
            animations.forEach(({ element }) => {
                element.style.animation = 'none';
            });
            elements.mario.style.animation = 'none';
            elements.mario.src = 'images/choro.png';
            elements.trilhasonora.pause(); // Pausa a trilha sonora
            elements.porfavor.play();
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
 
});
