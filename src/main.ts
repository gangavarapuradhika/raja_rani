import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

let score = 0;
let selectedGuess: string | null = null;
let cardImageVisible = false;
let cardImage = '';

const cardImages: Record<string, string> = {
  raja: 'https://tse4.mm.bing.net/th?id=OIP.2XyL89otYDJbsJb5soCZGwHaLq&pid=Api&P=0&h=220',
  rani: 'https://tse3.mm.bing.net/th?id=OIP.WE23gSlK9KsNi8oeD32HEwHaMM&pid=Api&P=0&h=220',
  donga: 'https://tse4.mm.bing.net/th?id=OIP.8c_FmkrLWERQuLhmTP5uSQHaFg&pid=Api&P=0&h=220',
  police: 'https://tse1.mm.bing.net/th?id=OIP.yWKIz54x2J4gFdCBxoo39wHaIv&pid=Api&P=0&h=220'
};

function render(message: string) {
  app.innerHTML = `
    <div class="container game-container text-center">
      <h1>Royalsnchase Game</h1>
      <p>${message}</p>
      <div class="btn-group mt-3" role="group">
        <button class="btn btn-success" data-guess="raja">Guess Raja</button>
        <button class="btn btn-warning" data-guess="rani">Guess Rani</button>
        <button class="btn btn-info" data-guess="donga">Guess Donga</button>
        <button class="btn btn-danger" data-guess="police">Guess Police</button>
      </div>
      <button class="btn btn-primary mt-3" id="drawBtn" ${!selectedGuess ? 'disabled' : ''}>Draw Card</button>
      ${cardImageVisible ? `<img src="${cardImage}" class="card-image mt-3" />` : ''}
      <p class="mt-3">Score: ${score}</p>
    </div>
  `;

  document.querySelectorAll<HTMLButtonElement>('[data-guess]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedGuess = btn.dataset.guess!;
      render('Card drawn! Click "Draw Card" to see the result.');
    });
  });

  const drawBtn = document.querySelector<HTMLButtonElement>('#drawBtn');
  if (drawBtn) {
    drawBtn.addEventListener('click', () => {
      if (!selectedGuess) return;
      const cards = ['raja', 'rani', 'donga', 'police'];
      const card = cards[Math.floor(Math.random() * cards.length)];
      cardImage = cardImages[card];
      cardImageVisible = true;

      if (selectedGuess === card) {
        score += 10;
        render(`Correct! It was ${card}.`);
      } else {
        score -= 5;
        render(`Wrong! The card was ${card}.`);
      }
      selectedGuess = null;
    });
  }
}

render('Guess which card you think will be drawn!');
