const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const goal = document.querySelector('.goal');

let isJumping = false;
let gravity = 0.9;
let velocity = 0;
let isGameRunning = true; // Flag to control the game loop
let isMovingLeft = false;
let isMovingRight = false;

function gameLoop() {
    if (!isGameRunning) {
        return; // Exit the game loop if the flag is false
    }

    // Move the player left or right based on input
    if (isMovingLeft) {
        console.log("l");
        moveLeft();
    } else if (isMovingRight) {
        console.log("r");
        moveRight();
    }

    // Apply gravity
    velocity += gravity;
    player.style.bottom = `${parseInt(player.style.bottom) - velocity}px`;

    // Check for collisions with platforms
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        if (
            player.getBoundingClientRect().bottom > platform.getBoundingClientRect().top &&
            player.getBoundingClientRect().top < platform.getBoundingClientRect().bottom &&
            player.getBoundingClientRect().right > platform.getBoundingClientRect().left &&
            player.getBoundingClientRect().left < platform.getBoundingClientRect().right
        ) {
            velocity = 0;
            player.style.bottom = `${platform.getBoundingClientRect().top - player.getBoundingClientRect().height}px`;
            isJumping = false;
        }
    });

    // Check for collisions with the goal
    if (
        player.getBoundingClientRect().bottom > goal.getBoundingClientRect().top &&
        player.getBoundingClientRect().top < goal.getBoundingClientRect().bottom &&
        player.getBoundingClientRect().right > goal.getBoundingClientRect().left &&
        player.getBoundingClientRect().left < goal.getBoundingClientRect().right
    ) {
        alert('You won!');
        resetGame();
    }

    // Check if player is falling below the game container
    if (parseInt(player.style.bottom) < 0) {
        resetGame();
    }

    // Continue the animation loop
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player.style.bottom = '0';
    player.style.left = '50px';
    velocity = 0;
    isJumping = false;
    isGameRunning = false; // Stop the game loop
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    } else if (event.code === 'ArrowLeft') {
        isMovingLeft = true;
    } else if (event.code === 'ArrowRight') {
        isMovingRight = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowLeft') {
        isMovingLeft = false;
    } else if (event.code === 'ArrowRight') {
        isMovingRight = false;
    }
});

function jump() {
    isJumping = true;
    velocity = 15; // Adjust this value to control jump height
    isGameRunning = true; // Resume the game loop if it was stopped
}

function moveLeft() {
    // Adjust the player's left position for left movement
    player.style.left = `${parseInt(player.style.left) - 5}px`;
}

function moveRight() {
    // Adjust the player's left position for right movement
    player.style.left = `${parseInt(player.style.left) + 5}px`;
}

// Start the game loop
gameLoop();
