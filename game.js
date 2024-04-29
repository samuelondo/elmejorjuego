document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const device = urlParams.get('device');

    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const mobileControls = document.getElementById('mobileControls');
    const scoreElement = document.getElementById('score');

    canvas.width = 500;
    canvas.height = 575;

    let score = 0;
    let playerImg = new Image();
    let bulletImg = new Image();
    let enemyImg = new Image();

    // Load images based on the game mode
    switch (mode) {
        case 'carlosJoss':
            playerImg.src = 'imgs/Carlos.PNG';
            bulletImg.src = 'imgs/peluche.png';
            enemyImg.src = 'imgs/Diosa.png';
            break;
        case 'miguelTorta':
            playerImg.src = 'imgs/Samu.png';
            bulletImg.src = 'imgs/Torta.png';
            enemyImg.src = 'imgs/Miguelucho.png';
            break;
        case 'jimenaYer':
            playerImg.src = 'imgs/Yer.png';
            bulletImg.src = 'imgs/corazón.png';
            enemyImg.src = 'imgs/Jimena.png';
            break;
    }

    let player = {
        x: canvas.width / 2 - 45,
        y: canvas.height - 100,
        width: 90,
        height: 90,
        speed: 5
    };

    let bullets = [];
    let enemies = [];
    let keys = { ArrowLeft: false, ArrowRight: false };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            keys[e.key] = true;
        } else if (e.key === ' ') {
            fireBullet();
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            keys[e.key] = false;
        }
    });

    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updatePlayerPosition();
        updateBullets();
        spawnEnemies();
        moveEnemies();
        checkCollisions();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function updatePlayerPosition() {
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < canvas.width - player.width) {
            player.x += player.speed;
        }
    }

    function fireBullet() {
        bullets.push({
            x: player.x + player.width / 2 - 25,
            y: player.y,
            width: 50,
            height: 50,
            img: bulletImg
        });
    }

    function updateBullets() {
        bullets = bullets.filter(bullet => {
            bullet.y -= 10;
            return bullet.y > 0;
        });
    }

    function spawnEnemies() {
        if (Math.random() < 0.03) { // Random spawn chance
            let x = Math.random() * (canvas.width - 90);
            enemies.push({
                x: x,
                y: -90,
                width: 90,
                height: 90,
                speed: 2, // Base speed of enemies
                img: enemyImg
            });
        }
    }

    function moveEnemies() {
        enemies.forEach(enemy => {
            enemy.y += enemy.speed;
        });
        enemies = enemies.filter(enemy => enemy.y < canvas.height + enemy.height);
    }

    function checkCollisions() {
        enemies.forEach((enemy, enemyIndex) => {
            bullets.forEach((bullet, bulletIndex) => {
                if (bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y) {
                    enemies.splice(enemyIndex, 1);
                    bullets.splice(bulletIndex, 1);
                    score += 10;
                    scoreElement.textContent = score;
                }
            });

            if (player.x < enemy.x + enemy.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y) {
                alert(`Game Over! Tu puntuación fue: ${score}`);
                window.location.href = 'index.html';
            }
        });
    }

    function draw() {
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
        bullets.forEach(bullet => {
            ctx.drawImage(bullet.img, bullet.x, bullet.y, bullet.width, bullet.height);
        });
        enemies.forEach(enemy => {
            ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
        });
    }

    // Setup mobile controls if on a mobile device
    if (device === 'mobile') {
        mobileControls.classList.remove('hidden');
        document.getElementById('leftBtn').addEventListener('touchstart', () => keys['ArrowLeft'] = true);
        document.getElementById('rightBtn').addEventListener('touchstart', () => keys['ArrowRight'] = true);
        document.getElementById('leftBtn').addEventListener('touchend', () => keys['ArrowLeft'] = false);
        document.getElementById('rightBtn').addEventListener('touchend', () => keys['ArrowRight'] = false);
        document.getElementById('fireBtn').addEventListener('touchstart', fireBullet);
    }

    gameLoop();
});
