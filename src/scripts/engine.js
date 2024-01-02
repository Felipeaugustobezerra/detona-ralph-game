const state = {
    view: {
      time: document.getElementById('time'),
      score: document.getElementById('score'),
      life: document.getElementById('life'),
      squares: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      button: document.getElementById('btn-continuar')
    },
    values: {
        timeTotal:   5,
        scoreTotal:  0,
        hitPosition: 0,
        lifeTotal:   3,
    },
    action: {
        contadorId: setInterval(changeTime, 1000),
        enemy: setInterval(randomEnemy, 1000)
    }
  };
  

//   Function that restarts the game
function restartGame() {
    // Configures the new total time value
    state.values.timeTotal = 5;
    state.action.contadorId = setInterval(changeTime, 1000)
    state.action.enemy = setInterval(randomEnemy, 1000)
    changeLife()
 }
// Function that plays a sound when hitting an enemy in the game
 function playSound(audioName) {
   let audio = new Audio(`/src/audios/${audioName}.m4a`);
   audio.volume = 0.2;
   audio.play();
 }

//  Life-altering function in the game
function changeLife() {
   state.view.life.textContent = state.values.lifeTotal--
   let vida = state.view.life.textContent
   let pontos = state.view.score.textContent
   let contadorId = state.view.time.textContent
   let btn = state.view.button

   if (vida <= 0 && contadorId <= 0) {
      alert(`Você marcou ${pontos} pontos no total.\n Reinicie a página para tentar novamente`)

      // Remove o botão de continuar
      btn.classList.remove('ativo')

      // Mantém a vida zerada até reiniciar a página
      state.view.life.textContent = 0;

      // Para a execução do SetInterval quando o contadorId chega a Zero
      clearInterval(state.action.contadorId)
      clearInterval(state.action.enemy)
      
   }
}
// Function that changes time in the game
 function changeTime() {
   state.view.time.textContent = state.values.timeTotal--
   let contadorId = state.view.time.textContent
   let btn = state.view.button
   btn.classList.remove('ativo')

   // Verifica se o contadorId chegou a zero
   if (contadorId <= 0) {

      // Mostra o botão continuar
      btn.classList.add('ativo')

      // alert('Game Over')
      // Para a execução do SetInterval quando o contadorId chega a Zero
      clearInterval(state.action.contadorId)
      clearInterval(state.action.enemy)
   }
}
  
  // Função que cria o movimento do inimigo de forma aleatória
  function randomEnemy() {
   // remove a classe randomEnemy de dentro de todos os squares
   state.view.squares.forEach((values) => {
      values.classList.remove('enemy')
   })

   // Gera um número aleatório de 0 até 9
   let randomNumber = Math.floor((Math.random() * 9))

   // Pega o square aleatóriamente e adiciona a classe randomEnemy
   let enemy = state.view.squares[randomNumber]
   enemy.classList.add('enemy')

   // Armazena a posição que o inimigo aparece
   state.values.position = enemy.id
}

  
  // Function that marks points with the mouse click
  function addListenerHitBox() {

   state.view.squares.forEach((square) => {
      square.addEventListener('mousedown', () => {
         // verifica se o id do click é igual a posição que o inimigo se encontra na tela
         if (square.id == state.values.position) {

            // soma 1 ponto no total do score
            state.values.scoreTotal++

            // altera o valor do html com o valor total do score
            state.view.score.textContent = state.values.scoreTotal

            // reseta a posição do inimigo para que não tenha como ficar clicando e somando pontos no mesmo lugar
            state.values.position = null;

            playSound('hit')
         }
      })
   })

}
function restart(){
   location.reload();
 }
 
 function redirecionar(){
   open("https://github.com/Felipeaugustobezerra");
 }
  

  
  
// Self-executing main function
 function main() {
   alert('ACERTE O ALVO PARA MARCAR PONTOS')
   addListenerHitBox()
   changeLife()
}

main()


