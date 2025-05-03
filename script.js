const chessboard = document.getElementById('chessboard');

// Define the kid + superhero images (assuming you placed them in /images)
const players = [
  { name: 'Φώντας', avatar: 'images/black_panther.png' },
  { name: 'Παύλος', avatar: 'images/ironman.png' },
  { name: 'Γιώργος', avatar: 'images/batman.png' },
  { name: 'Μαρίλια', avatar: 'images/raya.png' },
  { name: 'Δέσποινα', avatar: 'images/ghost_spider.png' },
  { name: 'Άλκηστη', avatar: 'images/mulan.png' }
];

for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');

    // Only row 0 (first row) and only first 6 columns (A to F)
    /* if (row === 0 && col < players.length) {
      const content = document.createElement('div');
      content.classList.add('square-content');

      const img = document.createElement('img');
      img.src = players[col].avatar;
      img.alt = players[col].name;
      img.classList.add('avatar');

      const label = document.createElement('div');
      label.textContent = players[col].name;

      content.appendChild(img);
      content.appendChild(label);
      square.appendChild(content);
    } */

    chessboard.appendChild(square);
  }
}
