/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a two dice as many times as he whishes. Each result get added to his ROUND score
- BUT, The player looses his current score when one of the dice is a 1 but not both. After that, it's the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game .
- The players can Decide the winning score and 100 is default score .
*/

var scores,activePlayer,roundScores,dice,dice2;

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    
    //1)Random Number
    var dice = Math.floor(Math.random()*6) + 1;
    var dice2 = Math.floor(Math.random()*6) + 1;

    if((dice === 1 || dice2 === 1) && !(dice === 1 && dice2 === 1)){    //check whether the one of the dice is 1 
        nextPlayer();
    }else{
        prevDiceScore = dice;
        
        //2)Display the result;
        var diceDOM = document.querySelector('.dice');
        var diceDOM2 = document.querySelector('.dice2');
        
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice +'.png';
        diceDOM2.src = 'dice-' + dice2 +'.png';
        
        
        roundScores += dice + dice2 ;
        document.querySelector('#current-' + activePlayer).textContent = roundScores;
        
    }
        
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    
    //add current score to global score 
    var input = document.querySelector('.final-score').value;
    var winscore;
    scores[activePlayer] += roundScores ;
    document.querySelector('#score-' + activePlayer).textContent =   scores[activePlayer];

    //check if the player is won 
     if(input) {
            winscore = input;
        } else {
            winscore = 100;
        }
    
    if(scores[activePlayer] >= winscore){

        document.querySelector('#name-' + activePlayer).textContent ='WINNER!!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    }
    else{
             //update the UI
    nextPlayer();
    
    }
    
   
});

document.querySelector('.btn-new').addEventListener('click',init);


function nextPlayer(){

        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScores = 0;
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';


}


function init(){

    scores = [0,0];
    roundScores = 0;
    activePlayer = 0;
   
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent ='Player 1';
    document.querySelector('#name-1').textContent ='Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';  
    document.querySelector('.final-score').value = '';
    
}