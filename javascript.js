'use-strict'

function computerPlay(){
    let randVal = Math.floor(Math.random()*3)
    if (randVal == 0){return 'Rock'}
    else if (randVal == 1){return 'Paper'}
    return 'Scissors'
}

const valid_choices = ['rock', 'paper', 'scissors']

function singleGame(playerSelection, computerSelection){
    let pS = playerSelection.toLowerCase()
    let cS = computerSelection.toLowerCase()

    if(pS == cS) {return {'dispMessage':`It\'s a draw! ${pS[0].toUpperCase() + pS.slice(1)} ties ${pS[0].toUpperCase() + pS.slice(1)}`, 'val':-1}}
    else if((pS == 'rock' && cS == 'paper') || (pS == 'paper' && cS == 'rock') || (pS == 'scissors' && cS == 'paper')){
        return {'dispMessage':`You Won the Round! ${pS[0].toUpperCase() + pS.slice(1)} beats ${cS[0].toUpperCase() + cS.slice(1)}`, 'val':1}
    }
    else{
        return {'dispMessage':`You Lost the Round! ${cS[0].toUpperCase() + cS.slice(1)} beats ${pS[0].toUpperCase() + pS.slice(1)}`, 'val': 0}
    }
}

let playerScore, computerScore
playerScore = computerScore = 0

let roundNum = 1

function changeScore(){
    gameResults = singleGame(playerSelection=this.dataset.sign, computerSelection=computerPlay())

    let resultMessage = document.querySelector('.result-message')
    resultMessage.textContent = gameResults['dispMessage']
    resultMessage.style.visibility = 'visible'

    if (gameResults['val'] > -1){
        let pScore = document.querySelector('.score.player')
        let cScore = document.querySelector('.score.computer')
    
        playerScore += gameResults['val']
        computerScore += 1 - gameResults['val']
    
        pScore.textContent = 'Player Score: ' + playerScore
        cScore.textContent = 'Computer Score: ' + computerScore
    }

    let roundHead = document.querySelector('.sign-container > h2')
    roundHead.textContent = 'Round ' + String(roundNum+1)
    roundNum ++

    checkGameEnd()
}

function endGameScreen(pScore){
    let resultMessage = document.querySelector('.result-message')
    if (pScore > 4){resultMessage.textContent = 'You Won! Congrats!'}
    else{resultMessage.textContent = 'You Lost! Better luck next time!'}

    let contentWrap = document.querySelector('.content-wrap')

    let playAgainBox = document.createElement('div')
    playAgainBox.classList.add('playButton-container')

    let playAgainMessage = document.createElement('h3')
    playAgainMessage.textContent = 'Play Again?'
    
    let playAgainConfirm = document.createElement('button')
    playAgainConfirm.id = 'playButton'
    playAgainConfirm.textContent = 'You Bet!'

    contentWrap.append(playAgainBox)
    playAgainBox.append(playAgainMessage)
    playAgainBox.append(playAgainConfirm)

    // let signChoices = document.querySelectorAll('.sign-choice')
    // signChoice.forEach(element => element.removeEventListener(changeScore)); this breaks it for some reason

    playAgainConfirm.onclick = function() {resetRPS(playAgainBox, playAgainMessage, playAgainConfirm)}
}

function resetRPS(box, message, confirm){
    confirm.remove()
    message.remove()
    box.remove()

    let pScoreElement, cScoreElement, roundHead, resultMessage, signChoices
    pScoreElement = document.querySelector('.score.player')
    pScoreElement.textContent = 'Player Score: 0'

    cScoreElement = document.querySelector('.score.computer')
    cScoreElement.textContent = 'Computer Score: 0'
    
    roundHead = document.querySelector('.sign-container > h2')
    roundHead.textContent = 'Round 1'

    resultMessage = document.querySelector('.result-message')
    resultMessage.style.visibility = 'hidden'

    // signChoices = document.querySelectorAll('.sign-choice')
    // signChoice.forEach(element => element.addEventListener('click', changeScore)); this breaks it for some reason
}

let signChoice = document.querySelectorAll('.sign-choice')
signChoice.forEach(element => element.addEventListener('click', changeScore))

function checkGameEnd(){
    if(playerScore > 4 || computerScore > 4){
        endGameScreen(playerScore)
        playerScore = computerScore = 0
    }
}
