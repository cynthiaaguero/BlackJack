
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden; //keep track of dealers hidden card
var deck;

var canHit; //allows the player to draw 

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck(){
    let values = ["A","2","3","4","5","6","7","8","9","10","J","Q","K",];
    let types = ["C", "D", "H", "S",];
    
    deck = [];

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]); //grabs cards by image
        }
    }
    console.log(deck);
}

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random()*deck.length); //(0-1) * 52 = (0-51.999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount+=checkAce(hidden);
    console.log(hidden);
    console.log(dealerSum);
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
        if (card[0] == "A"){
            return 1;
        }
        return 0;
}