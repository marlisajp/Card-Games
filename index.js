//! PHASE ONE BASE CLASSES //
const rankPointValue = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};
//* Card Class *//
class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.rankValue = rankPointValue[rank];
  }
}
console.log(new Card("A", "spades"));
//* Hand Class *//
class Hand {
  constructor(cardsArr) {
    this.cardsArr = cardsArr;
  }

  // addCard(card) will add the given card to the hand.
  addCard(card) {
    this.cardsArr.push(card);
  }

  // playCard(card) will remove and return the specified card from the hand. It should return null if the card is not in the hand. // -1 is returned if the item is not found in the array
  playCard(card) {
    const index = this.cardsArr.indexOf(card);
    if (index !== -1) {
      this.cardsArr.splice(index, 1);
      return card;
    } else {
      return null;
    }
  }
}

//* Deck Class *//
class Deck {
  constructor(ranks, suits, allCards) {
    this.ranks = ranks;
    this.suits = suits;
    this.allCards = [];
  }

  generateCards() {
    // generateCards() will populate the deck with an initial array of cards.
    // deck will be 13 ranks with 4 suits each (52 cards)
    this.ranks = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
      "A",
    ];
    this.suits = ["spades", "hearts", "diamonds", "clubs"];

    for (let i = 0; i < this.suits.length; i++) {
      // i = index of suits array
      for (let j = 0; j < this.ranks.length; j++) {
        // j = index of ranks array
        this.allCards.push(new Card(this.ranks[j], this.suits[i]));
        // adds new card to deck for as many combinations there are for suits and ranks
      }
    }
  }

  shuffleCards() {
    // fisher yates shuffle// shuffleCards() will shuffle the cards in the deck. Search online for a shuffle function. You do not need to come up with this yourself.
    for (let i = this.allCards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.allCards[i], this.allCards[j]] = [
        // swapping two cards(two indexes) from the array every time the loop repeats. shuffle 2 cards 52 times
        this.allCards[j],
        this.allCards[i],
      ];
    }
  }

  draw() {
    // draw() will remove and return a card from the deck.
    if (this.allCards.length > 0) {
      // as long as there are cards in deck
      let drawnCard = this.allCards[0]; // first card in array assigned
      this.allCards.shift(); // removes first card in array
      return drawnCard; // returns that first card
    } else {
      return null; // returns null if there are no more cards
    }
  }

  deal(numHands, cardsPerHand) {
    // deal(numHands, cardsPerHand) will deal cardsPerHand cards to numHands hands.
    let allPlayers = []; // store all new hands in array
    // for every person
    for (let num = 1; num <= numHands; num++) {
      // create instance of new hand
      let newHand = new Hand([]);

      // while the amount of cards is less than what is supposed to be dealt, draw card and add it to new hand
      for (let cardsInHand = 0; cardsInHand < cardsPerHand; cardsInHand++) {
        let topCard = this.draw();
        newHand.addCard(topCard);
      }
      allPlayers.push(newHand); // assigns a player a new hand
    }
    return allPlayers;
  }
}

//! PHASE TWO GAME MECHANICS ////

class Player {
  constructor(newPlayer) {
    this.newPlayer = newPlayer;
  }
}

class Game {
  constructor(numPlayers, cardsPerPlayer) {
    this.numPlayers = numPlayers;
    this.cardsPerPlayer = cardsPerPlayer;
  }

  start() {
    // create and shuffle new deck of cards
    let newGameDeck = new Deck([], [], []);
    newGameDeck.generateCards();
    newGameDeck.shuffleCards();

    // 1. Deal cards -> assign hand to a player
    this.playerHands = newGameDeck.deal(this.numPlayers, this.cardsPerPlayer);
    // console.log(this.playerHands[0]); //displays first players hand
    return this.playerHands;
  }

  playerTurn() {
    let allCardsPlayed = []; // create array and store the cards that are played
    // 2. Every player will play the first card in their hand
    for (let i = 1; i <= this.numPlayers; i++) {
      let currentCard = this.playerHands[0];
      console.log(
        `Player ${i} played: ${currentCard.cardsArr[0].rank} of ${currentCard.cardsArr[0].suit}`
      );
      let cardPlayed = currentCard.playCard(currentCard.cardsArr[0]); //plays card and removes card from hand
      allCardsPlayed.push(cardPlayed);
    }
    console.log(allCardsPlayed);
    return allCardsPlayed; //return array of cards played
  }

  compareCards(allCardsPlayed) {
    let valueArr = [];
    // 3. Whichever player has the highest card (add values?) gains a point
    for (let i = 0; i < allCardsPlayed.length; i++) {
      let cardValue = Object.keys(allCardsPlayed[i].rankValue);
      valueArr.push(cardValue);
      console.log(cardValue);
    }
    console.log(valueArr);
  }
}

// 4. Keep playing until players have no cards left
// 5. Player with most points wins!

//* Start Game *//
let newGame = new Game(2, 26);
newGame.start();
newGame.playerTurn();
newGame.compareCards();
// console.log(newGame.start());

//***************** TESTING AREA ***********************//
