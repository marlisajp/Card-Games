//* Card Class *//
// Write a Card class with two properties: rank and suit.
class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }
}

//* Hand Class *//
// A Hand has one property: an array of cards.
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
//A Deck has an array of possible card ranks, an array of possible card suits, and an array of cards. 3 array parameters
class Deck {
  constructor(ranks, suits, allCards) {
    this.ranks = ranks;
    this.suits = suits;
    this.allCards = allCards;
  }

  generateCards() {
    // generateCards() will populate the deck with an initial array of cards.
    // deck will be 13 ranks with 4 suits each (52 cards)
    this.ranks = [
      "A",
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
    ];
    this.suits = ["spades", "hearts", "diamonds", "clubs"];
    // ALTERNATE WAY for (const suit of this.suits) {
    //   // goes through all suits
    //   for (const rank of this.ranks) {
    //     // goes through all ranks
    //     this.allCards.push(new Card(rank, suit)); //adds new card instance to array of allcards
    //   }
    // }

    for (let i = 0; i < this.suits.length; i++) {
      // i = index of suits array
      for (let j = 0; j < this.ranks.length; j++) {
        // j = index of ranks array
        this.allCards.push(new Card(this.ranks[j], this.suits[i]));
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
    let drawnCard = this.allCards[0];
    this.allCards.shift();
    return drawnCard;
  }

  deal(numHands, cardsPerHand) {
    // deal(numHands, cardsPerHand) will deal cardsPerHand cards to numHands hands.
    // for every person
    for (let num = 1; num <= numHands; num++) {
      // create instance of new hand
      let newHand = new Hand([]);

      // while the amount of cards is less than what is supposed to be dealt, draw card and add it to new hand
      for (let cardsInHand = 0; cardsInHand < cardsPerHand; cardsInHand++) {
        let topCard = this.draw();
        newHand.addCard(topCard);
      }
      console.log(newHand);
    }
  }
}

//***************** TESTING AREA ***********************//

// creates new card
// const firstCard = new Card("A", "spades");
// const secondCard = new Card("3", "hearts");
// const thirdCard = new Card("J", "clubs");
// const fourthCard = new Card("5", "diamonds");

// // adds new card to hand
// let hand = new Hand([]);

// hand.addCard(firstCard); //! WORKS
// hand.addCard(secondCard);
// hand.addCard(thirdCard);
// hand.addCard(fourthCard);
// console.log(hand);

// hand.playCard(thirdCard); //! WORKS
// console.log(hand);
//Hand cards: [Card { rank: 'A', suit: 'spades' },Card { rank: '3', suit: 'hearts' }]

const deck = new Deck([], [], []); //new instance of deck with 3 arrays

deck.generateCards(); //! WORKS
// console.log(deck.allCards);

deck.shuffleCards(); // shuffles deck //! WORKS
// console.log(deck.allCards);

// removes a card from the deck  //! WORKS
// console.log(deck.allCards);
// console.log(deck.draw());

deck.deal(4, 13);
// console.log(deck.allCards);
