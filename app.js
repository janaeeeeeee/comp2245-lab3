const fruits = [
  { name: "apple", symbol: "🍎" },
  { name: "banana", symbol: "🍌" },
  { name: "cherry", symbol: "🍒" },
  { name: "coconut", symbol: "🥥" },
  { name: "grapes", symbol: "🍇" },
  { name: "mango", symbol: "🥭" },
  { name: "pineapple", symbol: "🍍" },
  { name: "watermelon", symbol: "🍉" },
];


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const board = document.querySelector("#board");
let deck = [];
let turned = [];
const status = document.querySelector("#status");
const movesDisplay = document.querySelector("#moves");
let moves = 0;
let waiting = false;

function buildBoard() {
  deck = shuffle([...fruits, ...fruits]);

  deck.forEach((fruit, i) => {
    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("card");
    card.setAttribute("aria-label", `Card ${i + 1}, face down`);
    card.dataset.index = i;
    board.appendChild(card);
});
}

board.addEventListener("click", (event) => {
  const card = event.target;
  if (!card.classList.contains("card")) return;
  if (card.classList.contains("flipped")) return;
  if (waiting) return;
    const fruit = deck[card.dataset.index];
  card.textContent = fruit.symbol;
  card.classList.add("flipped");
  card.setAttribute("aria-label", `Card ${Number(card.dataset.index) + 1}, ${fruit.name}`);
  turned.push(card);

  if (turned.length === 2) {
    moves++;
    movesDisplay.textContent = moves;

    const [first, second] = turned;
    if (deck[first.dataset.index].name === deck[second.dataset.index].name) {
      first.classList.add("matched");
      second.classList.add("matched");
      first.disabled = true;
      second.disabled = true;
      status.textContent = "That's a pair!";
      turned = [];
    } else {
      status.textContent = "Not a pair. Try again.";
      waiting = true;
      setTimeout(() => {
        [first, second].forEach((c) => {
          c.textContent = "";
          c.classList.remove("flipped");
          c.setAttribute("aria-label", `Card ${Number(c.dataset.index) + 1}, face down`);
        });
        turned = [];
        waiting = false;
      }, 1000);
    }
  }
});

buildBoard();