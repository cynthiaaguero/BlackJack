
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden; //keep track of dealers hidden card
var deck;

var canHit = true; //allows the player to draw 

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
    // console.log(hidden);
    // console.log(dealerSum);
    while(dealerSum < 17){
        let cardImg = document.createElement("img"); //object
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"; //setting image to object based on card number pulled
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    for (let i = 0; i < 2; i++){
        let cardImg = document.createElement("img"); //object
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png"; //setting image to object based on card number pulled
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    document.getElementById("your-sum").innerText = yourSum; 
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img"); //object
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"; //setting image to object based on card number pulled
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){
        canHit = false;
        document.getElementById("your-sum").innerText = yourSum; 
        document.getElementById("dealer-sum").innerText = dealerSum; 
        document.getElementById("results").innerText = "You lose!"; 
    
    }
    document.getElementById("your-sum").innerText = yourSum; 
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21){
        message = "You lose!";
    }
    else if (dealerSum > 21){
        message = "You win!";
    }
    else if (yourSum == dealerSum){
        message = "Tie!";
    }
    else if (yourSum > dealerSum){
        message = "You win!";
    }
    else if (yourSum < dealerSum){
        message = "You lose!";


    }
    document.getElementById("your-sum").innerText = yourSum; 
    document.getElementById("dealer-sum").innerText = dealerSum; 
    document.getElementById("results").innerText = message; 
}

function reduceAce(sum, aceCount){
    while(sum > 21 && aceCount > 0){
        sum -= 10
        aceCount -= 1;
    }
    return sum;
}

function getValue(card){
    let data = [];
    for (let i = 0; i < card.length; i++) {
        if (card[i] === "-") {
          data.push(card.slice(0, i));
          data.push(card.slice(i + 1));
          break;
        }
      }    let value = data[0];

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