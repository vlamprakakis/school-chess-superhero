document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const scaleContainer = document.getElementById('scale-container');
    const scoreboard = document.querySelector('.scoreboard');
    const avatarRow = document.querySelector('.avatar-row');
  
    function createChessboard() {
      chessboard.innerHTML = '';
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const square = document.createElement('div');
          square.classList.add('square', (row + col) % 2 === 0 ? 'light' : 'dark');
          chessboard.appendChild(square);
        }
      }
    }
  
    createChessboard();
  
    const players = [
      { name: 'Φώντας', avatar: 'images/black_panther.png', score: 80 },
      { name: 'Παύλος', avatar: 'images/ironman.png', score: 70 },
      { name: 'Γιώργος', avatar: 'images/batman.png', score: 50 },
      { name: 'Μαρίλια', avatar: 'images/raya.png', score: 60 },
      { name: 'Δέσποινα', avatar: 'images/ghost_spider.png', score: 90 },
      { name: 'Άλκηστη', avatar: 'images/mulan.png', score: 85 }
    ];
  
    // Render avatars
    avatarRow.innerHTML = '';
    players.forEach(player => {
      const avatarBlock = document.createElement('div');
      avatarBlock.classList.add('avatar-block');
  
      const img = document.createElement('img');
      img.src = player.avatar;
      img.classList.add('avatar-img');
      avatarBlock.appendChild(img);
  
      const name = document.createElement('div');
      name.textContent = player.name;
      avatarBlock.appendChild(name);
  
      avatarRow.appendChild(avatarBlock);
    });
  
    // Render score table
    const ratingTable = document.createElement('table');
    ratingTable.classList.add('rating-table');
  
    const header = ratingTable.createTHead();
    const headerRow = header.insertRow();
    headerRow.insertCell().textContent = 'Ονομα';
    headerRow.insertCell().textContent = 'Βαθμολογία';
    headerRow.insertCell().textContent = 'Ενέργειες';
  
    const tbody = ratingTable.createTBody();
  
    players.forEach((player, index) => {
      const row = tbody.insertRow();
      row.setAttribute('data-index', index);
  
      row.insertCell().textContent = player.name;
  
      const scoreCell = row.insertCell();
      const scoreInput = document.createElement('input');
      scoreInput.type = 'number';
      scoreInput.value = player.score;
      scoreInput.setAttribute('data-index', index);
      scoreInput.addEventListener('input', (event) => {
        const i = parseInt(row.getAttribute('data-index'), 10);
        players[i].score = parseInt(event.target.value, 10) || 0;
        updateArrows();
      });
      scoreCell.appendChild(scoreInput);
  
      const buttonCell = row.insertCell();
  
      const addButton = document.createElement('button');
      addButton.textContent = '+';
      addButton.addEventListener('click', () => {
        const i = parseInt(row.getAttribute('data-index'), 10);
        players[i].score += 1;
        scoreInput.value = players[i].score;
        updateArrows();
      });
  
      const removeButton = document.createElement('button');
      removeButton.textContent = '-';
      removeButton.addEventListener('click', () => {
        const i = parseInt(row.getAttribute('data-index'), 10);
        players[i].score -= 1;
        scoreInput.value = players[i].score;
        updateArrows();
      });
  
      buttonCell.appendChild(addButton);
      buttonCell.appendChild(removeButton);
    });
  
    scoreboard.innerHTML = '';
    scoreboard.appendChild(ratingTable);
  
    // Score scale
    scaleContainer.innerHTML = '';
    const scaleLayer = document.createElement('div');
    scaleLayer.classList.add('score-scale');
    scaleContainer.appendChild(scaleLayer);
  
    for (let i = 0; i <= 100; i += 20) {
      const scaleLine = document.createElement('div');
      scaleLine.classList.add('scale-line');
      scaleLayer.appendChild(scaleLine);
  
      const scaleNumber = document.createElement('div');
      scaleNumber.classList.add('scale-number');
      scaleNumber.textContent = i;
      scaleLayer.appendChild(scaleNumber);
    }
  
    // Arrows
    const arrowLayer = document.createElement('div');
    arrowLayer.classList.add('arrow-layer');
    chessboard.appendChild(arrowLayer);
  
    function updateArrows() {
      arrowLayer.innerHTML = '';
      players.forEach((player, index) => {
        const arrow = document.createElement('div');
        arrow.classList.add('arrow');
        const arrowHeight = (player.score / 100) * chessboard.offsetHeight;
        arrow.style.height = `${arrowHeight}px`;
        arrow.style.bottom = '0';
        arrow.style.left = `${80 * (index + 0.5)}px`;
        arrowLayer.appendChild(arrow);
      });
    }
  
    updateArrows();
  });
  