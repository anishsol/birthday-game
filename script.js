const cardValues = [
    '🎂', '🎈', '🎁', '🍰', '🎉', '🥳', '🎊', '🧁', '🎇', '🎆', '🕯️', '🎮'
];

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let gameLocked = false;

// Get the game board element
const gameBoard = document.querySelector('.game-board');
const matchSound = document.getElementById('match-sound');
const winSound = document.getElementById('win-sound');

// Shuffle card values array
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

// Initialize game board with shuffled cards
function startGame() {
    moves = 0;
    gameLocked = true;
    cards = [];
    flippedCards = [];
    matchedCards = [];
    gameBoard.innerHTML = '';
    const shuffledValues = shuffle([...cardValues, ...cardValues]);

    for (let i = 0; i < shuffledValues.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = shuffledValues[i];
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    setTimeout(() => {
        cards.forEach(card => {
            card.innerText = '';
            card.classList.remove('flipped');
        });
        gameLocked = false;
    }, 2000);
}

// Function to flip a card
function flipCard() {
    if (gameLocked) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;

    if (flippedCards.length === 0) {
        flippedCards.push(this);
    } else if (flippedCards.length === 1) {
        flippedCards.push(this);
        checkMatch();
    }
}

// Function to check if two flipped cards match
function checkMatch() {
    let [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        card1.removeEventListener('click', flipCard);
        card2.removeEventListener('click', flipCard);
        flippedCards = [];
        matchSound.currentTime = 0;
        matchSound.play();

        if (matchedCards.length === cards.length) {
            setTimeout(() => {
                winSound.currentTime = 0;
                winSound.play();
                alert("Congratulations! You've matched all the cards.Hsppy birthday shashi 🎉");
            }, 500);
        }
    } else {
        gameLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.innerText = '';
            card2.innerText = '';
            flippedCards = [];
            gameLocked = false;
        }, 1000);
    }

    moves++;
}

// Initialize game on page load
startGame();
