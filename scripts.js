const pingo = document.querySelector('.pingo');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 50;

function handleKeyUp(event) {       //evento para usar as teclas do teclado
  const musicJump = new Audio('som/pulo.mp3');         //musica
  if (event.keyCode === 32) {       //se a tecla for a 32 (espaço)
    if (!isJumping) {
      jump();
      musicJump.play();
    }
  }
}

function jump() {                 //responsavel pelo pulo
  isJumping = true;

  let upInterval = setInterval(() => {            //cria a animação, cria repetição que movimenta pra cima o pingo
    if (position >= 200) {                        //sobe 150 px
      // Descendo
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 50) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          pingo.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      // Subindo
      position += 20;                                 //pega o valor da posição e add 20
      pingo.style.bottom = position + 'px';
    }
  }, 20);
}

function refreshPage() {        //para atualiza e reiniciar o jogo
  window.location.reload();
}



function createFocas() {
  const focas = document.createElement('div');
  const musicDie = new Audio('som/morte.mp3');          //musica
  let focasPosition = 1000;
  let randomTime = Math.random() * 6000;                //gerar número aleatorio (para liberar as focas)

  if (isGameOver) return;

  focas.classList.add('focas');
  background.appendChild(focas);
  focas.style.left = focasPosition + 'px';

  let leftTimer = setInterval(() => {
    if (focasPosition < -60) {                              //quando a foca sai
      // Saiu da tela
      clearInterval(leftTimer);
      background.removeChild(focas);                        //remove a foca quando sai da tela
    } else if (focasPosition > 0 && focasPosition < 60 && position < 60) {                  //regiao do pingo
      // Game over
      clearInterval(leftTimer);
      isGameOver = true;
      musicDie.play();
      document.body.innerHTML = '<h1 class="game-over">PINGO FALECEU</h1><button class="game-over2" type="submit" onClick="refreshPage()">PLAY AGAIN</button>';               //limpa a tela e apresenta o fim de jogo
    } else {
      focasPosition -= 10;                                                          //velocidade que a foca se move
      focas.style.left = focasPosition + 'px';
    }
  }, 20);

  setTimeout(createFocas, randomTime);              //loop das focas
}

createFocas();
document.addEventListener('keyup', handleKeyUp);
