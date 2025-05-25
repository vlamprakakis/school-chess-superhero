document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const scaleContainer = document.getElementById('scale-container');
    const scoreboard = document.querySelector('.scoreboard');
    const avatarRow = document.getElementById('avatar-row');
    
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
    
    // Function to get unique color for each player
    function getPlayerColor(index) {
        const colors = ['#ff4444', '#44ff44', '#4444ff', '#ffff44', '#ff44ff', '#44ffff'];
        return colors[index % colors.length];
    }
    
    // Function to render avatars with progress bars
    function renderAvatars() {
        avatarRow.innerHTML = '';
        players.forEach((player, index) => {
            const avatarBlock = document.createElement('div');
            avatarBlock.classList.add('avatar-block');
            
            // Progress bar container (above avatar)
            const progressContainer = document.createElement('div');
            progressContainer.classList.add('progress-bar-container');
            
            const progressBar = document.createElement('div');
            progressBar.classList.add('progress-bar');
            progressBar.style.width = `${player.score}%`;
            progressBar.style.backgroundColor = getPlayerColor(index);
            progressContainer.appendChild(progressBar);
            
            avatarBlock.appendChild(progressContainer);
            
            // Avatar image
            const img = document.createElement('img');
            img.src = player.avatar;
            img.classList.add('avatar-img');
            avatarBlock.appendChild(img);
            
            // Player name with color indicator
            const nameContainer = document.createElement('div');
            nameContainer.classList.add('name-container');
            
            const colorIndicator = document.createElement('div');
            colorIndicator.classList.add('color-indicator');
            colorIndicator.style.backgroundColor = getPlayerColor(index);
            
            const name = document.createElement('span');
            name.textContent = player.name;
            
            nameContainer.appendChild(colorIndicator);
            nameContainer.appendChild(name);
            avatarBlock.appendChild(nameContainer);
            
            avatarRow.appendChild(avatarBlock);
        });
    }
    
    // Function to update progress bars when scores change
    function updateProgressBars() {
        const avatarBlocks = document.querySelectorAll('.avatar-block');
        avatarBlocks.forEach((block, index) => {
            const progressBar = block.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = `${players[index].score}%`;
                progressBar.style.backgroundColor = getPlayerColor(index);
            }
        });
    }
    
    // Render initial avatars
    renderAvatars();
    
    // Create interactive score scale
    function createScoreScale() {
        scaleContainer.innerHTML = '';
        const scaleLayer = document.createElement('div');
        scaleLayer.classList.add('score-scale');
        scaleContainer.appendChild(scaleLayer);
        
        // Create scale lines and numbers
        for (let i = 0; i <= 100; i += 20) {
            const scaleLine = document.createElement('div');
            scaleLine.classList.add('scale-line');
            scaleLine.style.left = `${i}%`;
            scaleLayer.appendChild(scaleLine);
            
            const scaleNumber = document.createElement('div');
            scaleNumber.classList.add('scale-number');
            scaleNumber.textContent = i;
            scaleNumber.style.left = `${i}%`;
            scaleLayer.appendChild(scaleNumber);
        }
        
        // Create interactive arrows for each player
        players.forEach((player, index) => {
            const arrow = document.createElement('div');
            arrow.classList.add('arrow');
            arrow.style.left = `${player.score}%`;
            arrow.style.backgroundColor = getPlayerColor(index);
            arrow.title = `${player.name}: ${player.score} points`;
            scaleLayer.appendChild(arrow);
        });
    }
    
    // Function to update arrows on the scale
    function updateScaleArrows() {
        const arrows = scaleContainer.querySelectorAll('.arrow');
        arrows.forEach((arrow, index) => {
            arrow.style.left = `${players[index].score}%`;
            arrow.style.backgroundColor = getPlayerColor(index);
            arrow.title = `${players[index].name}: ${players[index].score} points`;
        });
    }
    
    // Create initial scale
    createScoreScale();
    
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
        
        // Player name cell with color indicator
        const nameCell = row.insertCell();
        const nameContainer = document.createElement('div');
        nameContainer.style.display = 'flex';
        nameContainer.style.alignItems = 'center';
        nameContainer.style.gap = '8px';
        
        const colorIndicator = document.createElement('div');
        colorIndicator.style.width = '12px';
        colorIndicator.style.height = '12px';
        colorIndicator.style.backgroundColor = getPlayerColor(index);
        colorIndicator.style.borderRadius = '50%';
        colorIndicator.style.border = '1px solid #333';
        
        const nameSpan = document.createElement('span');
        nameSpan.textContent = player.name;
        
        nameContainer.appendChild(colorIndicator);
        nameContainer.appendChild(nameSpan);
        nameCell.appendChild(nameContainer);
        
        const scoreCell = row.insertCell();
        const scoreInput = document.createElement('input');
        scoreInput.type = 'number';
        scoreInput.value = player.score;
        scoreInput.min = 0;
        scoreInput.max = 100;
        scoreInput.setAttribute('data-index', index);
        scoreInput.addEventListener('input', (event) => {
            const i = parseInt(row.getAttribute('data-index'), 10);
            const newScore = Math.max(0, Math.min(100, parseInt(event.target.value, 10) || 0));
            players[i].score = newScore;
            event.target.value = newScore;
            updateProgressBars();
            updateScaleArrows();
        });
        scoreCell.appendChild(scoreInput);
        
        const buttonCell = row.insertCell();
        
        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.addEventListener('click', () => {
            const i = parseInt(row.getAttribute('data-index'), 10);
            if (players[i].score < 100) {
                players[i].score += 1;
                scoreInput.value = players[i].score;
                updateProgressBars();
                updateScaleArrows();
            }
        });
        
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.addEventListener('click', () => {
            const i = parseInt(row.getAttribute('data-index'), 10);
            if (players[i].score > 0) {
                players[i].score -= 1;
                scoreInput.value = players[i].score;
                updateProgressBars();
                updateScaleArrows();
            }
        });
        
        buttonCell.appendChild(addButton);
        buttonCell.appendChild(removeButton);
    });
    
    scoreboard.innerHTML = '';
    scoreboard.appendChild(ratingTable);
});
