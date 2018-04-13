let Player;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.lastUpdate = Date.now();

    // This y postions will be chosen randomly
    this.y_positions = [50, 150, 220];

    this.speed = [9, 10, 11];
    this.current_speed = 9;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 510)
    {
        this.y = this.y_positions[Math.floor(Math.random()*3)];
        this.x = -100;
        this.current_speed = this.speed[Math.floor(Math.random()*3)];
    }
    let now = Date.now();
    dt = now - this.lastUpdate;
    this.lastUpdate = now;

    if ((player.getX() > this.x-50 && player.getX() < this.x+50) && (player.getY() === this.y))
    {
        player.resetPlayer();
    }
    this.x += dt - this.current_speed;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player = function() {
    this.sprite = 'images/char-boy.png';
    // Player start the game in this position
    this.x = 200;
    this.y = 400;

    // Player is not allowed to go with positions is not in this range
    this.max = 400;
    this.min = 0;

    // Adding this value for every move
    this.byMove = 100;
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch(key)
    {
        case 'left':
        if (this.inRange(this.x - this.byMove))
        {
            console.log('Go left');
            this.x -= this.byMove;
        } else {
            console.log('Not allowed');
        }
        break;
        case 'right':
        if (this.inRange(this.x + this.byMove))
        {
            this.x += this.byMove;
        }
        break;
        case 'up':
        if (this.inRange(this.y - this.byMove))
        {
            this.y -= this.byMove;
        }
        // This case when the player reach the water
        else {
            console.log('Win reset the position');
            this.x = 200;
            this.y = 400;
        }
        break;
        case 'down':
        if (this.inRange(this.y + this.byMove))
        {
            this.y += this.byMove;
        }
        break;
    }
};

// This function returns true if the position is in range of 0 to 400
// otherwise, returns false
Player.prototype.inRange = function(position) {
    if (position >= 0 && position <= 400)
        return true;

    return false;
};

Player.prototype.getX = function() {
    return this.x;
};

Player.prototype.getY = function() {
    // This to match enemy path
    switch(this.y)
    {
        case 0:
        return this.y+50;
        case 100:
        return this.y+50;
        case 200:
        return this.y+20;
        default:
        return this.y;
    }
};

Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 400;
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let first_enemy = new Enemy();
let second_enemy = new Enemy();
let third_enemy = new Enemy();

first_enemy.x = 0;
first_enemy.y = 50;

second_enemy.x = -20;
second_enemy.y = 150;

third_enemy.x = -100;
third_enemy.y = 220;

let allEnemies = [
    first_enemy,
    second_enemy,
    third_enemy
];

let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
